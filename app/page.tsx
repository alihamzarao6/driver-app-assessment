"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ApiService from "@/utils/api";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      await ApiService.getProfile();
      setIsAuthenticated(true);
      router.push("/dashboard");
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
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
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
    >
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Driver App</h1>
          <p className="text-gray-600">
            Welcome to the Driver Management System
          </p>
        </div>

        {!isAuthenticated ? (
          <>
            <Link href="/login" className="block">
              <button
                className="w-full h-14 text-lg text-white rounded-xl font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: "#5B9BD5" }}
              >
                Login
              </button>
            </Link>

            <Link href="/register" className="block">
              <button
                className="w-full h-14 text-lg text-white rounded-xl font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: "#34C759" }}
              >
                Register
              </button>
            </Link>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">
                Or try the demo screens:
              </p>
              <div className="space-y-3">
                <Link href="/profile" className="block">
                  <button className="w-full h-12 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                    View Profile Demo
                  </button>
                </Link>

                <Link href="/report-problem" className="block">
                  <button className="w-full h-12 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Report Problem Demo
                  </button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <Link href="/dashboard" className="block">
            <button
              className="w-full h-14 text-lg text-white rounded-xl font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: "#5B9BD5" }}
            >
              Go to Dashboard
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
