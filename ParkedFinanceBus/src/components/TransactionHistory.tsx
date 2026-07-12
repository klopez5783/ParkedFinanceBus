import type { Transaction } from "../interfaces/Transaction";

export default function TransactionHistory({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold text-text mb-3 px-1">
        Transaction History
      </h2>
      <div className="flex flex-col max-h-85 overflow-y-auto rounded-xl w-full">
        {transactions.map((tx) => (
          <div
            key={tx.transactionId}
            className="flex items-center justify-between bg-white px-4 py-3 shadow-sm"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">{tx.description}</span>
              <span className="text-xs text-gray-400">
                {tx.category} · {tx.date}
              </span>
            </div>
            <span
              className={`text-base font-bold ${tx.amount >= 0 ? "text-green-500" : "text-red-400"}`}
            >
              {tx.amount >= 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
