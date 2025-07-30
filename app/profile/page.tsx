"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative top-12 mx-4">
      <div className="h-8"></div>

      <div className="mx-4 mb-6">
        <div
          className="px-6 py-6 rounded-2xl relative"
          style={{ backgroundColor: "#5B9BD5" }}
        >
          <button
            onClick={() => router.back()}
            className="flex items-center text-white mb-6"
          >
            <div className="w-6 h-6 rounded-full bg-white bg-opacity-30 flex items-center justify-center mr-3 cursor-pointer">
              <ArrowLeft size={16} className="text-black" />
            </div>
            <span className="text-base font-medium">My profile</span>
          </button>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-full mb-3 flex items-center justify-center">
              <span className="text-xl font-bold text-gray-600">IP</span>
            </div>
            <h2 className="text-lg font-medium text-white">Ivan Petrov</h2>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 mx-4 px-4 py-4 mb-4">
        <h3 className="text-base font-semibold text-gray-900 mb-3">
          Statistics
        </h3>
        <div className="space-y-1">
          <StatRow label="Orders completed" value="458" />
          <StatRow label="Rating" value="4.92/5" />
          <StatRow label="Work experience" value="3 years 2 months" />
        </div>
      </div>

      <div className="px-4 space-y-3 mb-4">
        <ActionButton text="App settings" />
        <ActionButton text="Tech support" />
      </div>

      <div className="px-4">
        <button className="w-full p-4 text-red-500 border border-red-500 rounded-lg bg-white hover:bg-red-50 transition-colors cursor-pointer">
          Exit system
        </button>
      </div>
    </div>
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

function ActionButton({ text }: { text: string }) {
  return (
    <button className="cursor-pointer w-full p-4 text-left bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
      {text}
    </button>
  );
}
