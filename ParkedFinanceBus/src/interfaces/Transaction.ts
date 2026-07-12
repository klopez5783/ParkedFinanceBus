// Transaction.ts
export interface Transaction {
  id: number;
  uid: number;
  cycleId: number;
  description: string;
  category: "Needs" | "Wants" | "Savings";
  amount: number;
  date: string;
}
