import { create } from 'zustand';
import { supabase } from '../db/supabaseClient';

const useAuthStore = create((set) => ({
  user: null,
  profile: null,
  role: null,
  loading: true,

  fetchSessionAndProfile: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error(' Error fetching session:', error.message);
      set({ user: null, profile: null, role: null, loading: false });
      return;
    }

    const currentUser = session?.user ?? null;
    set({ user: currentUser });

    if (currentUser) {
      await useAuthStore.getState().getProfile(currentUser);
    }

    set({ loading: false });
  },

  getProfile: async (currentUser) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      if (error) {
        console.error(' Error fetching profile:', error.message);
        set({ profile: null });
      } else {
        set({ profile: data });
        await useAuthStore.getState().getUserRole(data.email);
      }
    } catch (err) {
      console.error(' Unexpected error loading profile:', err.message);
      set({ profile: null });
    }
  },

  getUserRole: async (email) => {
    try {
      const decodedEmail = decodeURIComponent(email);

      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('email', decodedEmail)
        .single();

      if (error) {
        console.warn(' Role fetch error:', error.message);
        set({ role: null });
        return;
      }

      if (data?.role) {
        console.log(' Role found:', data.role);
        set({ role: data.role });
      } else {
        console.warn(' No role returned for this email.');
        set({ role: null });
      }
    } catch (err) {
      console.error(' Unexpected error fetching role:', err.message);
      set({ role: null });
    }
  },

  initAuthListener: () => {
    const { subscription } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;
        set({ user: currentUser });

        if (currentUser) {
          await useAuthStore.getState().getProfile(currentUser);
        } else {
          set({ profile: null, role: null });
        }
      }
    );
    return subscription;
  },
}));

export default useAuthStore;
