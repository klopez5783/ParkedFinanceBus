const transactions = [
  {
    id: 1,
    label: "Grocery Store",
    category: "Needs",
    amount: -54.32,
    date: "May 19",
  },
  {
    id: 2,
    label: "Paycheck",
    category: "Income",
    amount: 1200.0,
    date: "May 18",
  },
  {
    id: 3,
    label: "Netflix",
    category: "Wants",
    amount: -15.99,
    date: "May 17",
  },
  {
    id: 4,
    label: "Electric Bill",
    category: "Needs",
    amount: -88.5,
    date: "May 16",
  },
  {
    id: 5,
    label: "Coffee Shop",
    category: "Wants",
    amount: -6.75,
    date: "May 15",
  },
  {
    id: 6,
    label: "Freelance Payment",
    category: "Income",
    amount: 350.0,
    date: "May 14",
  },
  {
    id: 7,
    label: "Gas Station",
    category: "Needs",
    amount: -42.0,
    date: "May 13",
  },
  {
    id: 8,
    label: "Concert Tickets",
    category: "Wants",
    amount: -120.0,
    date: "May 12",
  },
];

export default function TransactionHistory() {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold text-text mb-3 px-1">
        Transaction History
      </h2>
      <div className="flex flex-col max-h-85 overflow-y-auto rounded-xl w-full">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between bg-white px-4 py-3 shadow-sm"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">{tx.label}</span>
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
