"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ApiService from "@/utils/api";

const problemTypes = [
  "Client unavailable",
  "Damage during transport",
  "Access problem",
  "Other problem",
];

export default function ReportProblemPage() {
  const [selectedProblem, setSelectedProblem] = useState("");
  const [orderId] = useState("32845"); // Default order ID
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!selectedProblem) {
      setError("Please select a problem type");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await ApiService.submitProblem({
        orderId,
        problemType: selectedProblem,
        description: `Problem reported for order ${orderId}: ${selectedProblem}`,
      });

      setSuccess(true);

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error: any) {
      console.error("Failed to submit problem:", error);
      setError(error.message || "Failed to submit problem. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Success state
  if (success) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#f5f5f7" }}
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 mx-4 text-center max-w-sm w-full">
          <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Problem Reported!
          </h2>
          <p className="text-gray-600 mb-4">
            Your problem has been submitted successfully.
          </p>
          <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen top-12 mx-4 relative">
      <div
        className="px-8 py-6 flex items-center relative mx-4 rounded-3xl"
        style={{ backgroundColor: "#5B9BD5" }}
      >
        <button
          onClick={() => router.back()}
          className="flex items-center text-white"
          disabled={loading}
        >
          <div className="w-6 h-6 rounded-full bg-white bg-opacity-30 flex items-center justify-center mr-3 cursor-pointer">
            <ArrowLeft size={14} className="text-black" />
          </div>
          <span className="text-base font-medium">Report a problem</span>
        </button>
      </div>

      <div className="bg-white min-h-full rounded-[10px]">
        <div className="flex flex-col items-center pt-12 pb-8">
          <div
            className="w-20 h-20 rounded-full mb-6"
            style={{ backgroundColor: "#D55B5B" }}
          ></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Order #{orderId}
          </h2>
          <p className="text-gray-500 text-sm">Select problem type</p>
        </div>

        {error && (
          <div className="mx-6 mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="px-6 space-y-3 pb-8">
          {problemTypes.map((problem, index) => (
            <ProblemOption
              key={index}
              text={problem}
              isSelected={selectedProblem === problem}
              onClick={() => {
                setSelectedProblem(problem);
                setError("");
              }}
              disabled={loading}
            />
          ))}
        </div>

        <div className="px-6 pb-8">
          <button
            onClick={handleSubmit}
            disabled={loading || !selectedProblem}
            className="w-full py-4 text-white font-semibold text-base rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            style={{ backgroundColor: "#D55B5B" }}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                SUBMITTING...
              </div>
            ) : (
              "SEND AND CONNECT"
            )}
          </button>
        </div>

        {selectedProblem && !loading && (
          <div className="px-6 pb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Selected:</strong> {selectedProblem}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProblemOption({
  text,
  isSelected,
  onClick,
  disabled = false,
}: {
  text: string;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-4 text-left rounded-lg border transition-all duration-200 disabled:cursor-not-allowed ${
        isSelected
          ? "bg-blue-50 border-blue-500 text-blue-700 shadow-sm"
          : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200 hover:border-gray-300"
      } ${disabled ? "opacity-50" : ""}`}
    >
      <div className="flex items-center justify-between">
        <span>{text}</span>
        {isSelected && (
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
      </div>
    </button>
  );
}
