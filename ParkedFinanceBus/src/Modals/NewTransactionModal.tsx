import { useState } from "react";

export default function NewTransactionModal({
  onSubmit,
  onClose
}: {
  onSubmit: (payload?: {
    savings: number;
    needs: number;
    wants: number;
    label: string;
    deposit: boolean;
  }) => void;
  onClose: ()=> void;
}) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("savings");
  const [deposit, setDeposit] = useState(false);
  const [label, setLabel] = useState("");

  const handleSubmit = () => {
    console.log("Submitting transaction:", { amount, category, label });
    const amountNum = parseFloat(amount) || 0;
    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      alert("Please enter a valid amount greater than 0.");
      return;
    }
    const signedAmount = deposit ? amountNum : -amountNum;
    onSubmit({
      savings: category === "savings" ? signedAmount : 0,
      needs: category === "needs" ? signedAmount : 0,
      wants: category === "wants" ? signedAmount : 0,
      label: label || "Untitled Transaction",
      deposit: deposit,
    });
  };


  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <span
          className="text-text font-bold text-xl cursor-pointer block text-right"
          onClick={onClose}
        >
          ✖
        </span>
        <h2 className="text-xl text-white font-bold mb-4">New Transaction</h2>
        <label className="block text-lg font-medium text-white mb-1">
          Title
        </label>
        <div className="items-center bg-surfaceLight rounded-xl px-3 py-2 gap-1">
          <input
            type="text"
            placeholder="Enter transaction title"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="bg-transparent text-text flex-1 outline-none text-lg font-semibold placeholder:text-mutedText"
          />
        </div>
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
            onChange={(e) => setAmount(e.target.value)}
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
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={deposit}
            className="mr-2"
            onChange={(e) => setDeposit(e.target.checked)}
          />
          <label className="text-white">Deposit</label>
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
