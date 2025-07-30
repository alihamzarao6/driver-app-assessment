"use client";

export default function SubmitButton() {
  const handleSubmit = () => {
    alert("Problem reported successfully!");
  };

  return (
    <div className="px-4 pb-6">
      <button
        onClick={handleSubmit}
        className="w-full bg-red-500 text-white py-4 rounded-lg text-lg font-medium hover:bg-red-600 transition-colors"
      >
        SEND AND CONNECT
      </button>
    </div>
  );
}
