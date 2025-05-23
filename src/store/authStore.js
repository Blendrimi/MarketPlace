import { create } from 'zustand';
import { supabase } from '../db/supabaseClient';

const useAuthStore = create((set) => ({
  user: null,
  profile: null,
  role: null,
  loading: true,

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
        await useAuthStore.getState().getOrCreateProfile(user);
      }

      set({ loading: false });
    } catch (err) {
      console.error("fetchSessionAndProfile error:", err.message);
      set({ user: null, profile: null, role: null, loading: false });
    }
  },

  getOrCreateProfile: async (currentUser) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();
  
      if (error && error.code === 'PGRST116') {
        // Role from metadata or fallback to BUYER
        const roleFromMetadata = currentUser.user_metadata?.role || 'BUYER';
  
        const { error: insertError } = await supabase.from('profiles').insert([
          {
            id: currentUser.id,
            email: currentUser.email,
            role: roleFromMetadata,
          },
        ]);
  
        if (insertError) {
          console.error("Insert profile error:", insertError.message);
        }
      }
  
      // Re-fetch to ensure role is read
      const { data: profileData, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();
  
      if (fetchError) {
        console.error("Fetch profile error:", fetchError.message);
        return;
      }
  
      set({ profile: profileData });
  
      if (profileData?.role) {
        set({ role: profileData.role });
      } else {
        console.warn("No role found in profile.");
        set({ role: null });
      }
    } catch (err) {
      console.error("Unexpected getOrCreateProfile error:", err.message);
    }
  },
   

  initAuthListener: () => {
    const { subscription } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;
        set({ user: currentUser });

        if (currentUser) {
          await useAuthStore.getState().getOrCreateProfile(currentUser);
        } else {
          set({ profile: null, role: null });
        }
      }
    );
    return subscription;
  },
}));

export default useAuthStore;
