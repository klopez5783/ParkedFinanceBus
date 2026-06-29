export interface Transaction {
  id: number;
  label: string;
  category: "Needs" | "Wants" | "Savings";
  amount: number;
  date: string;
}