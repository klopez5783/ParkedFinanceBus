import API_BASE from "./api";
import type { Transaction } from "../interfaces/Transaction";

export async function createTransaction(transaction: Omit<Transaction, "transactionId">) {
  return await fetch(`${API_BASE}/api/Transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to create transaction");
    }
    return res.json();
  })};

export async function getTransactionsByCycle(cycleId: number) {
  const res = await fetch(`${API_BASE}/api/Transactions/cycle/${cycleId}`);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
}

export async function updateTransaction(id: number, data: { description: string; category: string; amount: number }) {
  const res = await fetch(`${API_BASE}/api/Transactions/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update transaction");
  return res.json();
}

export async function deleteTransaction(id: number) {
  const res = await fetch(`${API_BASE}/api/Transactions/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete transaction");
}