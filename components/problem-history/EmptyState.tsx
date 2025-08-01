interface EmptyStateProps {
  onReportProblem?: () => void;
}

export default function EmptyState({ onReportProblem }: EmptyStateProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
        <svg
          className="w-10 h-10 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-3">
        No Problems Reported
      </h3>
      <p className="text-gray-600 mb-6 max-w-sm mx-auto">
        You haven't reported any problems yet. When you encounter issues with
        orders, you can report them here for quick resolution.
      </p>

      {onReportProblem && (
        <button
          onClick={onReportProblem}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
        >
          Report Your First Problem
        </button>
      )}
    </div>
  );
}
