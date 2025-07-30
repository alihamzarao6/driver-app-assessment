interface OrderSectionProps {
  orderNumber: string;
}

export default function OrderSection({ orderNumber }: OrderSectionProps) {
  return (
    <div className="flex flex-col items-center py-8">
      <div className="w-24 h-24 bg-red-500 rounded-full mb-4"></div>
      <h2 className="text-xl font-semibold text-gray-800">
        Order #{orderNumber}
      </h2>
      <p className="text-gray-500 mt-2">Select problem type</p>
    </div>
  );
}
