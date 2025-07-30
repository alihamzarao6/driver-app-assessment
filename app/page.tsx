import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold text-center mb-12 text-gray-800">
          Driver App Assessment
        </h1>

        <Link href="/report-problem" className="block">
          <button
            className="w-full h-14 text-lg text-white rounded-xl font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: "#5B9BD5" }}
          >
            Report Problem Screen
          </button>
        </Link>

        <Link href="/profile" className="block">
          <button
            className="w-full h-14 text-lg text-white rounded-xl font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: "#5B9BD5" }}
          >
            Driver Profile Screen
          </button>
        </Link>
      </div>
    </div>
  );
}
