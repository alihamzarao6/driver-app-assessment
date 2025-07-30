interface ProfileCardProps {
  name: string;
  avatar?: string;
}

export default function ProfileCard({ name, avatar }: ProfileCardProps) {
  return (
    <div className="bg-blue-500 text-white px-6 py-8 rounded-t-2xl">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-white rounded-full mb-4 flex items-center justify-center">
          <span className="text-blue-500 text-2xl font-bold">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <h2 className="text-xl font-medium">{name}</h2>
      </div>
    </div>
  );
}
