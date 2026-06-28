export default function BalancePill({
  label,
  amount,
  indicator,
}: {
  label: string;
  amount: number;
  indicator?: string;
}) {
  return (
    <div className="flex mt-3 justify-between gap-1 bg-white rounded-full px-4 py-3 shadow-lg w-full">
      <span className="text-surfaceLight font-semibold uppercase tracking-widest text-gray-400 text-lg">
        {label}
      </span>

      <span
        className={`text-2xl font-bold text-gray-800 ${amount >= 0 ? "text-green-500" : "text-red-400"}`}
      >
        {indicator && (
          <span className="relative group cursor-help inline-block animate-bounce duration-75">
            {indicator}
            {indicator === "⚠" && (
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Spent more than initial weekly deposit
              </span>
            )}
          </span>
        )}
        ${amount.toFixed(2)}
      </span>
    </div>
  );
}
