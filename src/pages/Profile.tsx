import React from "react";
import { useAuth } from "../contexts/AuthContext";
const Profile: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">个人资料</h1>
      {user && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={user.avatar || "/default-avatar.png"}
              alt="头像"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.phone}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;
