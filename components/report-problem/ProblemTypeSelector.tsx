"use client";
import { useState } from "react";

const problemTypes = [
  "Client unavailable",
  "Damage during transport",
  "Access problem",
  "Other problem",
];

export default function ProblemTypeSelector() {
  const [selectedProblem, setSelectedProblem] = useState<string>("");

  return (
    <div className="px-4 space-y-3">
      {problemTypes.map((problem, index) => (
        <button
          key={index}
          onClick={() => setSelectedProblem(problem)}
          className={`w-full p-4 text-left rounded-lg border transition-colors ${
            selectedProblem === problem
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 bg-white"
          }`}
        >
          <span className="text-gray-700">{problem}</span>
        </button>
      ))}
    </div>
  );
}
