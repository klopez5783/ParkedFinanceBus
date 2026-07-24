import BalancePill from "../components/BalancePill";
import TransactionHistory from "../components/TransactionHistory";
import type { Balances } from "../interfaces/Balances";
import type { Transaction } from "../interfaces/Transaction";

interface Props {
  balances: Balances;
  displaySavings: number;
  savingsIndicator: string | undefined;
  transactions: Transaction[];
  onNewTransaction: () => void;
  onDelete: (tx: Transaction) => void;
  onEdit: (tx: Transaction, updated: { description: string; category: string; amount: number }) => void;
}

export default function HomeScreen({
  balances,
  displaySavings,
  savingsIndicator,
  transactions,
  onNewTransaction,
  onDelete,
  onEdit,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-text text-center">Budget Tracker</h1>
      <div className="flex flex-col items-center gap-4">
        <BalancePill description="Savings 💰" amount={displaySavings} indicator={savingsIndicator} />
        <BalancePill description="Needs 📝" amount={balances.needs} />
        <BalancePill description="Wants 🛍️" amount={balances.wants} />
      </div>
      <button
        onClick={onNewTransaction}
        className="w-full py-3 rounded-xl border border-divider bg-surfaceLight text-white font-semibold text-xl active:opacity-80"
      >
        + New Transaction
      </button>
      <TransactionHistory transactions={transactions} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}
