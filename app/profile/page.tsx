"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";
import ApiService from "@/utils/api";
import EditProfileModal from "@/components/profile/EditProfileModal";

interface User {
  name: string;
  email: string;
  stats: {
    ordersCompleted: number;
    rating: number;
    workExperience: string;
  };
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userData = await ApiService.getProfile();
      setUser(userData);
    } catch (error) {
      console.error("Failed to load profile:", error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (updatedData: Partial<User>) => {
    setUpdateLoading(true);
    try {
      const response = await ApiService.updateProfile(updatedData);
      setUser(response.user);
      console.log("Profile updated successfully");
    } catch (error: any) {
      throw new Error(error.message || "Failed to update profile");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      ApiService.logout();
      router.push("/login");
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#f5f5f7" }}
      >
        <div className="text-lg">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#f5f5f7" }}
      >
        <div className="text-lg">Failed to load profile</div>
      </div>
    );
  }

  return (
    <>
      <div
        className="min-h-screen relative top-12 mx-4"
        style={{ backgroundColor: "#5B9BD5" }}
      >
        <div className="h-8"></div>

        <div className="mx-4 mb-6">
          <div
            className="px-6 py-6 rounded-2xl relative"
            style={{ backgroundColor: "#5B9BD5" }}
          >
            <div className="flex justify-between items-start mb-6">
              <button
                onClick={() => router.back()}
                className="flex items-center text-white mb-6"
              >
                <div className="w-6 h-6 rounded-full bg-white bg-opacity-30 flex items-center justify-center mr-3 cursor-pointer">
                  <ArrowLeft size={16} className="text-black" />
                </div>
                <span className="text-base font-medium">My profile</span>
              </button>

              <button
                onClick={() => setIsEditModalOpen(true)}
                className="w-8 h-8 rounded-full bg-white bg-opacity-30 flex items-center justify-center text-black hover:bg-opacity-40 transition-colors"
              >
                <Edit2 size={14} />
              </button>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full mb-3 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-600">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </span>
              </div>
              <h2 className="text-lg font-medium text-white">{user.name}</h2>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 mx-4 px-4 py-4 mb-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3">
            Statistics
          </h3>
          <div className="space-y-1">
            <StatRow
              label="Orders completed"
              value={user.stats.ordersCompleted.toString()}
            />
            <StatRow label="Rating" value={`${user.stats.rating}/5`} />
            <StatRow
              label="Work experience"
              value={user.stats.workExperience}
            />
          </div>
        </div>

        <div className="px-4 space-y-3 mb-4">
          <ActionButton
            text="App settings"
            onClick={() => alert("App settings clicked!")}
          />
          <ActionButton
            text="Tech support"
            onClick={() => alert("Tech support clicked!")}
          />
        </div>

        <div className="px-4">
          <button
            onClick={handleLogout}
            className="w-full p-4 text-red-500 border border-red-500 rounded-lg bg-white hover:bg-red-50 transition-colors cursor-pointer"
          >
            Exit system
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        user={user}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateProfile}
      />
    </>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-600 text-sm">{label}:</span>
      <span className="text-gray-900 font-medium text-sm">{value}</span>
    </div>
  );
}

function ActionButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 text-left bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
    >
      {text}
    </button>
  );
}
