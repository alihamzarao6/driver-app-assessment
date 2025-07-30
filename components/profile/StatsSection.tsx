interface StatItem {
  label: string;
  value: string;
}

interface StatsSectionProps {
  stats: StatItem[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="bg-gray-100 px-6 py-4">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Statistics</h3>
      <div className="space-y-2">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-gray-600">{stat.label}:</span>
            <span className="text-gray-800 font-medium">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
