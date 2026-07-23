import { useState } from "react";
import type { Transaction } from "../interfaces/Transaction";

interface Props {
  transactions: Transaction[];
  onDelete: (tx: Transaction) => void;
  onEdit: (tx: Transaction, updated: { description: string; category: string; amount: number }) => void;
}

export default function TransactionHistory({ transactions, onDelete, onEdit }: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDescription, setEditDescription] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editAmount, setEditAmount] = useState(0);

  function startEdit(tx: Transaction) {
    setEditingId(tx.transactionId);
    setEditDescription(tx.description);
    setEditCategory(tx.category);
    setEditAmount(Math.abs(tx.amount));
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function submitEdit(tx: Transaction) {
    const signed = tx.amount < 0 ? -Math.abs(editAmount) : Math.abs(editAmount);
    onEdit(tx, { description: editDescription, category: editCategory, amount: signed });
    setEditingId(null);
  }

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold text-text mb-3 px-1">Transaction History</h2>
      <div className="flex flex-col max-h-85 overflow-y-auto rounded-xl w-full">
        {transactions.toReversed().map((tx) =>
          editingId === tx.transactionId ? (
            <div key={tx.transactionId} className="flex flex-col gap-2 bg-white px-4 py-3 shadow-sm">
              <input
                className="border rounded px-2 py-1 text-sm text-gray-800"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description"
              />
              <select
                className="border rounded px-2 py-1 text-sm text-gray-800"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
              >
                <option value="Savings">Savings</option>
                <option value="Needs">Needs</option>
                <option value="Wants">Wants</option>
              </select>
              <input
                type="number"
                className="border rounded px-2 py-1 text-sm text-gray-800"
                value={editAmount}
                onChange={(e) => setEditAmount(Number(e.target.value))}
                placeholder="Amount"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => submitEdit(tx)}
                  className="flex-1 py-1 rounded-lg bg-primary text-white text-sm font-semibold active:opacity-80"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="flex-1 py-1 rounded-lg bg-surfaceLight text-white text-sm font-semibold active:opacity-80"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div
              key={tx.transactionId}
              className="flex items-center justify-between bg-white px-4 py-3 shadow-sm"
            >
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">{tx.description}</span>
                <span className="text-xs text-gray-400">
                  {tx.category} · {tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : ""}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-base font-bold ${tx.amount >= 0 ? "text-green-500" : "text-red-400"}`}>
                  {tx.amount >= 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                </span>
                <button
                  onClick={() => startEdit(tx)}
                  className="text-xs text-blue-400 hover:text-blue-600 font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(tx)}
                  className="text-xs text-red-400 hover:text-red-600 font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
