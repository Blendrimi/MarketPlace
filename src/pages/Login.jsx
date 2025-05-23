import { useState } from 'react';
import { supabase } from '../db/supabaseClient';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const setUser = useAuthStore((state) => state.setUser);
  const fetchSessionAndProfile = useAuthStore((state) => state.fetchSessionAndProfile);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMsg('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    if (data?.user) {
      await fetchSessionAndProfile(); // this handles user + profile + role
      navigate('/');
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      {errorMsg && <div className="text-red-500 text-sm mb-3">{errorMsg}</div>}

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border mb-3"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border mb-3"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />

      <button
        onClick={handleLogin}
        className="w-full bg-purple-700 text-white p-2 rounded hover:bg-purple-800 mb-3"
      >
        Login
      </button>

      <div className="text-center text-sm text-gray-500 mb-2">or</div>

      <button
        onClick={handleGoogleLogin}
        className="w-full border text-gray-700 py-2 rounded hover:bg-gray-100"
      >
        Continue with Google
      </button>
    </div>
  );
}
