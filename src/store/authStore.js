import { create } from 'zustand';
import { supabase } from '../db/supabaseClient';

const useAuthStore = create((set) => ({
  user: null,
  profile: null,
  role: null,
  loading: true,

  // Needed for login to work
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),

  fetchSessionAndProfile: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session?.user) {
        set({ user: null, profile: null, role: null, loading: false });
        return;
      }

      const user = session.user;
      set({ user });

      if (user) {
        await useAuthStore.getState().getProfile(user);
      }

      set({ loading: false });
    } catch (err) {
      console.error("fetchSessionAndProfile error:", err.message);
      set({ user: null, profile: null, role: null, loading: false });
    }
  },

  getProfile: async (currentUser) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      if (error) {
        console.error("getProfile error:", error.message);
        return;
      }

      set({ profile: data });

      await useAuthStore.getState().getUserRole(data.email);
    } catch (err) {
      console.error("Unexpected getProfile error:", err.message);
    }
  },

  getUserRole: async (email) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('email', decodeURIComponent(email))
        .single();

      if (error) {
        set({ role: null });
        return;
      }

      set({ role: data?.role || null });
    } catch (err) {
      console.error("getUserRole error:", err.message);
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
  }
}));

export default useAuthStore;
