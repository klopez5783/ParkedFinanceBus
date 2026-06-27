import { useState, useEffect } from "react";
import "./App.css";
import BalancePill from "./components/BalancePill";
import TransactionHistory from "./components/TransactionHistory";
import PaycheckAllocationModal from "./components/PaycheckAllocationModal";
import NewTransactionModal from "./Modals/NewTransactionModal";

interface Balances {
  savings: number;
  needs: number;
  wants: number;
}

interface Transaction {
  id: number;
  label: string;
  category: "Needs" | "Wants" | "Savings";
  amount: number;
  date: string;
}

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showNewTransaction, setShowNewTransaction] = useState(false);
  const [balances, setBalances] = useState<Balances>(() => {
    const saved = localStorage.getItem("budgetapp-state");
    console.log("Loaded state from localStorage:", saved);
    return saved
      ? JSON.parse(saved).balances
      : { savings: 0, needs: 0, wants: 0 };
  });

  const [hasOpenedModal, setHasOpenedModal] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [savingsGoal, setSavingsGoal] = useState(0);
  useEffect(() => {
    console.log("Use Effect triggered: Saving state to localStorage", { balances, transactions, savingsGoal });
    localStorage.setItem(
      "budgetapp-state",
      JSON.stringify({
        balances,
        transactions,
        savingsGoal,
      }),
    );
  }, [balances, transactions, savingsGoal]);

  const displaySavings =
    balances.savings < 0 ? balances.savings : savingsGoal + balances.savings;

  function handleAllocation(newBalances: Balances) {
    setSavingsGoal(newBalances.savings); // 300 goes here
    setBalances({ ...newBalances, savings: 0 }); // balances.savings starts at 0
    setShowModal(false);
  }

  function handleTransactionSubmit(payload?: {
    savings: number;
    needs: number;
    wants: number;
    label: string;
    deposit: boolean;
  }) {
    if (!payload) return;
    console.log("Received transaction payload:", payload);
    console.log("Savings Goal : ", savingsGoal);
    const category = payload.savings
      ? "Savings"
      : payload.needs
        ? "Needs"
        : "Wants";
    const amount = payload.savings || payload.needs || payload.wants;
    const key = category.toLowerCase() as keyof Balances;

    setBalances((prev) => ({
      ...prev,
      [key]: prev[key] + amount,
    }));

    setTransactions((prev) => [
      ...prev,
      {
        id: Date.now(),
        amount,
        category,
        date: new Date().toLocaleDateString(),
        label: payload.label || "New Transaction",
        deposit: payload.deposit,
      },
    ]);
    setShowNewTransaction(false);
  }

  const net = balances.savings;
  const savingsIndicator =
    net < -savingsGoal ? "⚠" : net > 0 ? "✅" : undefined;

  return (
    <div className="min-h-screen p-2 bg-background gap-2 px-3">
      {showModal && (
        <PaycheckAllocationModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAllocation}
        />
      )}
      {showNewTransaction && (
        <NewTransactionModal
          onClose={() => setShowNewTransaction(false)}
          onSubmit={handleTransactionSubmit}
        />
      )}
      <h1 className="text-3xl font-bold text-text mb-2 text-center">
        Budget Tracker
      </h1>
      <div className="justify justify-end flex">
        <button
          onClick={() => {
            setShowModal(true);
            if (!hasOpenedModal) setHasOpenedModal(true);
          }}
          className="mt-4 p-3 rounded-xl border border-divider bg-surfaceLight text-white font-semibold text-xl shadow- active:opacity-80"
        >
          {hasOpenedModal
            ? "Edit Paycheck Allocation"
            : "New Paycheck Allocation"}
        </button>
      </div>
      <div className="flex flex-col items-center gap-4">
        <BalancePill
          label="Savings 💰"
          amount={displaySavings}
          indicator={savingsIndicator}
        />
        <BalancePill label="Needs 📝" amount={balances.needs} />
        <BalancePill label="Wants 🛍️" amount={balances.wants} />
      </div>
      <button
        onClick={() => {
          setShowNewTransaction(true);
        }}
        className="mt-4 w-full py-3 rounded-xl border border-divider bg-surfaceLight text-white font-semibold text-xl shadow- active:opacity-80"
      >
        + New Transaction
      </button>
      <TransactionHistory transactions={transactions} />
    </div>
  );
}

export default App;
