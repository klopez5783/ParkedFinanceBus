import "./App.css";
import BalancePill from "./components/BalancePill";
import TransactionHistory from "./components/TransactionHistory";

function App() {
  return (
    <div className="min-h-screen p-2 bg-background w-full items-center justify-center gap-2">
      <div className="">
        <h1 className="text-3xl font-bold text-text mb-2 text-center">
          Budget Tracker
        </h1>
        <div className="w-full max-w-md flex flex-col items-center gap-4">
          <BalancePill label="Savings 💰" amount={300} />
          <BalancePill label="Needs 📝" amount={500} />
          <BalancePill label="Wants 🛍️" amount={200} />
        </div>
        <TransactionHistory />
      </div>
    </div>
  );
}

export default App;
