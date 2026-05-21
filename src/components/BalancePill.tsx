export default function BalancePill({
  label,
  amount,
}: {
  label: string;
  amount: number;
}) {
  return (
    <div className="flex mt-4 justify-between items-center gap-1 bg-white rounded-full px-4 py-3 shadow-lg w-9/10">
      <span className="text-surfaceLight font-semibold uppercase tracking-widest text-gray-400 text-lg">
        {label}
      </span>
      <span className="text-2xl font-bold text-gray-800">
        ${amount.toFixed(2)}
      </span>
    </div>
  );
}
