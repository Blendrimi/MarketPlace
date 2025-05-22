import { useState } from 'react';
import { supabase } from '../db/supabaseClient';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('BUYER');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);
  const getProfile = useAuthStore((state) => state.getProfile);

  const handleRegister = async () => {
    setErrorMsg('');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role }, // ✅ Save role to metadata
      },
    });

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    if (data?.user?.id) {
      alert('✅ Registration successful! Please confirm your email, then log in.');
      setUser(data.user);
      await getProfile(data.user);
      navigate('/login');
    }
  };

  const handleGoogleRegister = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>

      {errorMsg && <div className="text-red-500 text-sm mb-3">{errorMsg}</div>}

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border mb-3"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border mb-3"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <select
        className="w-full p-2 border mb-3"
        onChange={(e) => setRole(e.target.value)}
        value={role}
      >
        <option value="BUYER">Buyer</option>
        <option value="SELLER">Seller</option>
      </select>

      <button
        onClick={handleRegister}
        className="w-full bg-purple-700 text-white p-2 rounded hover:bg-purple-800 mb-3"
      >
        Register
      </button>

      <div className="text-center text-sm text-gray-500 mb-2">or</div>

      <button
        onClick={handleGoogleRegister}
        className="w-full border text-gray-700 py-2 rounded hover:bg-gray-100"
      >
        Continue with Google
      </button>
    </div>
  );
}
