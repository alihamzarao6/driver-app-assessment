"use client";

export default function LogoutButton() {
  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      alert("Logged out successfully!");
    }
  };

  return (
    <div className="px-4 pb-6">
      <button
        onClick={handleLogout}
        className="w-full p-4 text-red-500 border border-red-500 rounded-lg hover:bg-red-50 transition-colors"
      >
        Exit system
      </button>
    </div>
  );
}
