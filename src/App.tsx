import "./App.css";
import BalancePill from "./components/BalancePill";
import TransactionHistory from "./components/TransactionHistory";

function App() {
  return (
    <div className="min-h-screen p-2 bg-background gap-2 px-3">
        <h1 className="text-3xl font-bold text-text mb-2 text-center">
          Budget Tracker
        </h1>
        <div className="flex flex-col items-center gap-4">
          <BalancePill label="Savings 💰" amount={300} />
          <BalancePill label="Needs 📝" amount={500} />
          <BalancePill label="Wants 🛍️" amount={200} />
        </div>
        <button className="mt-4 w-full py-3 rounded-xl border border-divider bg-surfaceLight text-white font-semibold text-base text-xl shadow- active:opacity-80">
          + New Transaction
        </button>
        <TransactionHistory />
    </div>
  );
}

export default App;
