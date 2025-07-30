"use client";

const actions = ["App settings", "Tech support"];

export default function ActionButtons() {
  const handleAction = (action: string) => {
    alert(`${action} clicked!`);
  };

  return (
    <div className="px-4 py-4 space-y-3">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => handleAction(action)}
          className="w-full p-4 text-left bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span className="text-gray-700">{action}</span>
        </button>
      ))}
    </div>
  );
}
