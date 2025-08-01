interface Stats {
  total: number;
  pending: number;
  resolved: number;
  escalated: number;
}

interface StatsHeaderProps {
  stats: Stats;
  onRefresh: () => void;
  loading?: boolean;
}

export default function StatsHeader({
  stats,
  onRefresh,
  loading,
}: StatsHeaderProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Problem Summary</h2>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
        >
          <svg
            className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>

        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-800">
            {stats.pending}
          </div>
          <div className="text-sm text-yellow-600">Pending</div>
        </div>

        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-800">
            {stats.resolved}
          </div>
          <div className="text-sm text-green-600">Resolved</div>
        </div>

        <div className="text-center p-3 bg-red-50 rounded-lg">
          <div className="text-2xl font-bold text-red-800">
            {stats.escalated}
          </div>
          <div className="text-sm text-red-600">Escalated</div>
        </div>
      </div>
    </div>
  );
}
