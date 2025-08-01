"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ApiService from "@/utils/api";

interface User {
  name: string;
  email: string;
  stats: {
    ordersCompleted: number;
    rating: number;
    workExperience: string;
  };
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
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

  const handleLogout = () => {
    ApiService.logout();
    router.push("/login");
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#f5f5f7" }}
      >
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f5f7" }}>
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="max-w-md mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-gray-600">Choose an action below</p>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <Link href="/profile" className="block">
            <button className="w-full h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors">
              View My Profile
            </button>
          </Link>

          <Link href="/report-problem" className="block">
            <button className="w-full h-14 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors">
              Report Problem
            </button>
          </Link>

          <Link href="/problem-history" className="block">
            <button className="w-full h-14 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors">
              Problem History
            </button>
          </Link>
        </div>

        {/* Quick Stats */}
        {user && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Stats
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Orders:</span>
                <span className="font-medium">
                  {user.stats.ordersCompleted}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rating:</span>
                <span className="font-medium">{user.stats.rating}/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Experience:</span>
                <span className="font-medium">{user.stats.workExperience}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
