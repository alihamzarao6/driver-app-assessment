interface Problem {
  _id: string;
  orderId: string;
  problemType: string;
  description: string;
  status: string;
  createdAt: string;
}

interface ProblemCardProps {
  problem: Problem;
}

export default function ProblemCard({ problem }: ProblemCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "escalated":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        );
      case "escalated":
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11M12,9A1,1 0 0,1 11,8A1,1 0 0,1 12,7A1,1 0 0,1 13,8A1,1 0 0,1 12,9Z" />
          </svg>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return `Today at ${date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (diffDays === 2) {
      return `Yesterday at ${date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (diffDays <= 7) {
      return `${diffDays - 1} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  const getPriorityColor = (problemType: string) => {
    switch (problemType) {
      case "Damage during transport":
        return "border-l-red-500";
      case "Client unavailable":
        return "border-l-yellow-500";
      case "Access problem":
        return "border-l-blue-500";
      default:
        return "border-l-gray-500";
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm p-6 border-l-4 ${getPriorityColor(
        problem.problemType
      )} hover:shadow-md transition-shadow`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Order #{problem.orderId}
          </h3>
          <p className="text-sm text-gray-500">
            {formatDate(problem.createdAt)}
          </p>
        </div>

        <div
          className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(
            problem.status
          )}`}
        >
          {getStatusIcon(problem.status)}
          {problem.status.charAt(0).toUpperCase() + problem.status.slice(1)}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div>
          <span className="text-sm font-medium text-gray-600 block mb-1">
            Problem Type:
          </span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <p className="text-gray-800 font-medium">{problem.problemType}</p>
          </div>
        </div>

        {problem.description && (
          <div>
            <span className="text-sm font-medium text-gray-600 block mb-1">
              Description:
            </span>
            <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">
              {problem.description}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Problem ID: {problem._id.slice(-8)}
          </span>

          {problem.status === "pending" && (
            <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
              Follow up
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
