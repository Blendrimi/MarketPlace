import { useEffect, useState } from "react";
import { supabase } from "../db/supabaseClient";
import useAuthStore from "../store/authStore";

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (!error) setProfile(data);
    };

    if (user) fetchProfile();
  }, [user]);

  if (!profile)
    return <div className="text-center mt-10">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-3">
          Personal Info
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value="Blendrim"
              disabled
              className="w-full border border-gray-300 rounded p-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Surname
            </label>
            <input
              type="text"
              value="Selmani"
              disabled
              className="w-full border border-gray-300 rounded p-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full border border-gray-300 rounded p-2 bg-gray-100"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  checked
                  readOnly
                  className="form-radio"
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  disabled
                  className="form-radio"
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 bg-red-100 text-red-600 border border-red-300 rounded hover:bg-red-200">
            SAVE
          </button>
        </div>
      </div>

      <div className="mt-10 max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <h2 className="text-xl font-semibold mb-6 border-b pb-3">
          Account Data
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
          <div>
            <span className="font-semibold block mb-1">Email:</span>
            <p className="bg-gray-100 p-2 rounded">{profile.email}</p>
          </div>

          <div>
            <span className="font-semibold block mb-1">Role:</span>
            <p className="bg-gray-100 p-2 rounded capitalize">
              {profile.role}
            </p>
          </div>

          <div className="md:col-span-2">
            <span className="font-semibold block mb-1">User ID:</span>
            <p className="bg-gray-100 p-2 rounded">{profile.id}</p>
          </div>

          <div className="md:col-span-2">
            <span className="font-semibold block mb-1">Creation Date:</span>
            <p className="bg-gray-100 p-2 rounded">
              {new Date(profile.created_at).toLocaleString("sq-AL")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
