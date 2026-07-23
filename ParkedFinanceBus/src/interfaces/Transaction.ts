// Transaction.ts
export interface Transaction {
  transactionId: number;
  uid: number;
  cycleId: number;
  description: string;
  category: "Needs" | "Wants" | "Savings";
  amount: number;
  createdAt: string;
}
