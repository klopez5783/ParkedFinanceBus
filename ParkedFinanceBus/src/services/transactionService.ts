import API_BASE from "./api";
import type { Transaction } from "../interfaces/Transaction";

export function createTransaction(transaction: Omit<Transaction, "transactionId">) {
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

  export async function getTransactionsByCycle(cycleId: number) {
    const res = await fetch(`${API_BASE}/api/Transactions/cycle/${cycleId}`);
    console.log("getTransactionsByCycle response:", res);
    if (!res.ok) {
      throw new Error("Failed to fetch transactions");
    }
    return res.json();
    }