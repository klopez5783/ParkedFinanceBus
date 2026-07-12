import { useState } from "react";
import "./App.css";
import BalancePill from "./components/BalancePill";
import TransactionHistory from "./components/TransactionHistory";
import NewTransactionModal from "./Modals/NewTransactionModal";
import LoginPage from "./pages/LoginPage";
import PaycheckCycleWizard from "./components/PaycheckCycleWizard";
import { useBudget } from "./hooks/useBudget";

function App() {
  const [userId, setUserId] = useState<number | null>(null);
  const [showNewTransaction, setShowNewTransaction] = useState(false);

  const {
    balances,
    transactions,
    cycle,
    displaySavings,
    savingsIndicator,
    handleCycleCreate,
    handleTransactionSubmit,
    handleLogout,
  } = useBudget(userId);

  if (userId === null) {
    return <LoginPage onLogin={(id) => setUserId(id)} />;
  }

  if (!cycle) {
    return (
      <PaycheckCycleWizard
        userId={userId}
        onComplete={(data) => handleCycleCreate(data)}
      />
    );
  }

  return (
    <div className="min-h-screen p-2 bg-background gap-2 px-3">
      {showNewTransaction && (
        <NewTransactionModal
          onClose={() => setShowNewTransaction(false)}
          onSubmit={(payload) => {
            handleTransactionSubmit(payload);
            setShowNewTransaction(false);
          }}
        />
      )}
      <h1 className="text-3xl font-bold text-text mb-2 text-center">
        Budget Tracker
      </h1>
      <div className="justify justify-end flex">
        <button
          onClick={() => {
            setUserId(null);
            handleLogout();
          }}
          className="mt-4 p-3 rounded-xl border border-divider bg-surfaceLight text-white font-semibold text-xl shadow- active:opacity-80"
        >
          Logout
        </button>
      </div>
      <div className="flex flex-col items-center gap-4">
        <BalancePill
          description="Savings 💰"
          amount={displaySavings}
          indicator={savingsIndicator}
        />
        <BalancePill description="Needs 📝" amount={balances.needs} />
        <BalancePill description="Wants 🛍️" amount={balances.wants} />
      </div>
      <button
        onClick={() => setShowNewTransaction(true)}
        className="mt-4 w-full py-3 rounded-xl border border-divider bg-surfaceLight text-white font-semibold text-xl shadow- active:opacity-80"
      >
        + New Transaction
      </button>
      <TransactionHistory transactions={transactions} />
    </div>
  );
}

export default App;
