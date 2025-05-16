import { useState } from "react";
import { supabase } from "../db/supabaseClient";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const fetchProfile = useAuthStore((state) => state.fetchProfile);

  const handleLogin = async () => {
    setErrorMsg("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    setUser(data.user);
    await fetchProfile(data.user.id);
    console.log("Login successful, user:", data.user);
    navigate("/");
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      setErrorMsg("Google login failed: " + error.message);
    }
  };

  return (
    <div className="flex justify-center mt-12">
      <div className="w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        {errorMsg && (
          <div className="text-red-500 text-sm mb-4 text-center">{errorMsg}</div>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border mb-3 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-3 rounded"
          required
        />
        <button
          onClick={handleLogin}
          className="w-full bg-purple-700 text-white p-2 rounded hover:bg-purple-800 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="mt-4 text-center">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-600 text-white p-2 mt-3 rounded hover:bg-red-700"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
