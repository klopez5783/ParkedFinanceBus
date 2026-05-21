import { useState } from "react";

export default function NewTransactionModal({
  onSubmit,
}: {
  onSubmit: () => void;
}) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("savings");

  const handleSubmit = () => {
    // Handle transaction submission logic here
    onSubmit();
  };

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <h2 className="text-xl text-white font-bold mb-4">New Transaction</h2>
        <label className="block text-lg font-medium text-white mb-1">
          Amount
        </label>
        <div className="items-center bg-surfaceLight rounded-xl px-3 py-2 gap-1">
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount((e.target.value))}
            className="bg-transparent text-text flex-1 outline-none text-lg font-semibold placeholder:text-mutedText"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="savings">Savings 💰</option>
            <option value="needs">Needs 📝</option>
            <option value="wants">Wants 🛍️</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-1 py-3 rounded-xl bg-primary text-white font-bold text-base disabled:opacity-40 active:opacity-80"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
