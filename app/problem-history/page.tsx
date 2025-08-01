"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProblemHistory } from "@/hooks/useProblemHistory";
import ProblemCard from "@/components/problem-history/ProblemCard";
import EmptyState from "@/components/problem-history/EmptyState";
import StatsHeader from "@/components/problem-history/StatsHeader";

export default function ProblemHistoryPage() {
  const router = useRouter();
  const { problems, loading, error, refreshProblems, getStats } =
    useProblemHistory();

  const handleReportProblem = () => {
    router.push("/report-problem");
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#f5f5f7" }}
      >
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-lg text-gray-600">Loading problems...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#f5f5f7" }}
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 mx-4 text-center max-w-sm">
          <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.963-.833-2.732 0L4.08 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Error Loading Problems
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={refreshProblems}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f5f7" }}>
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center"
        style={{ backgroundColor: "#5B9BD5" }}
      >
        <button
          onClick={() => router.back()}
          className="flex items-center text-white"
        >
          <div className="w-6 h-6 rounded-full bg-white bg-opacity-30 flex items-center justify-center mr-3">
            <ArrowLeft size={14} className="text-black" />
          </div>
          <span className="text-base font-medium">Problem History</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {problems.length === 0 ? (
          <EmptyState onReportProblem={handleReportProblem} />
        ) : (
          <>
            <StatsHeader
              stats={getStats()}
              onRefresh={refreshProblems}
              loading={loading}
            />

            <div className="space-y-4">
              {problems.map((problem) => (
                <ProblemCard key={problem._id} problem={problem} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
