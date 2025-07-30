"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ReportProblemPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen top-12 mx-4 relative">
      <div
        className="px-8 py-6 flex items-center relative mx-4 rounded-3xl"
        style={{ backgroundColor: "#5B9BD5" }}
      >
        <button
          onClick={() => router.back()}
          className="flex items-center text-white"
        >
          <div className="w-6 h-6 rounded-full bg-white bg-opacity-30 flex items-center justify-center mr-3">
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
            Order #32845
          </h2>
          <p className="text-gray-500 text-sm">Select problem type</p>
        </div>

        <div className="px-6 space-y-3 pb-8">
          <ProblemOption text="Client unavailable" />
          <ProblemOption text="Damage during transport" />
          <ProblemOption text="Access problem" />
          <ProblemOption text="Other problem" />
        </div>

        <div className="px-6 pb-8">
          <button
            className="w-full py-4 text-white font-semibold text-base rounded-lg"
            style={{ backgroundColor: "#D55B5B" }}
          >
            SEND AND CONNECT
          </button>
        </div>
      </div>
    </div>
  );
}

function ProblemOption({ text }: { text: string }) {
  return (
    <button className="w-full p-4 text-left bg-gray-100 text-gray-700 rounded-lg border-0 hover:bg-gray-200 transition-colors">
      {text}
    </button>
  );
}
