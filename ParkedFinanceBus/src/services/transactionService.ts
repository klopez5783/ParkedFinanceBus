import API_BASE from "./api";
import type { Transaction } from "../interfaces/Transaction";

export function createTransaction(transaction: Omit<Transaction, "id">) {
  return fetch(`${API_BASE}/api/Transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to create transaction");
    }
    return res.json();
  })};