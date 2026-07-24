import { useState } from "react";
import "./App.css";
import NewTransactionModal from "./Modals/NewTransactionModal";
import LoginPage from "./pages/LoginPage";
import PaycheckCycleWizard from "./components/PaycheckCycleWizard";
import BottomNav, { type Screen } from "./components/BottomNav";
import HomeScreen from "./screens/HomeScreen";
import PayCycleScreen from "./screens/PayCycleScreen";
import AccountScreen from "./screens/AccountScreen";
import { useBudget } from "./hooks/useBudget";

function App() {
  const [userId, setUserId] = useState<number | null>(() => {
    const stored = localStorage.getItem("userId");
    return stored ? Number(stored) : null;
  });
  const [activeScreen, setActiveScreen] = useState<Screen>("home");
  const [showNewTransaction, setShowNewTransaction] = useState(false);
  const [showNewCycleWizard, setShowNewCycleWizard] = useState(false);

  const {
    balances,
    transactions,
    cycle,
    displaySavings,
    savingsIndicator,
    handleCycleCreate,
    handleTransactionSubmit,
    handleTransactionDelete,
    handleTransactionEdit,
    handleLogout,
    isLoading,
  } = useBudget(userId);

  if (userId === null) {
    return (
      <LoginPage
        onLogin={(id) => {
          localStorage.setItem("userId", String(id));
          setUserId(id);
        }}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  if (!cycle || showNewCycleWizard) {
    console.log("Rendering PaycheckCycleWizard. Current cycle:", cycle);
    return (
      <PaycheckCycleWizard
        userId={userId}
        onComplete={(data) => {
          handleCycleCreate(data);
          setShowNewCycleWizard(false);
          setActiveScreen("home");
        }}
      />
    );
  }

  function handleLogoutFull() {
    localStorage.removeItem("userId");
    setUserId(null);
    setActiveScreen("home");
    handleLogout();
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {showNewTransaction && (
        <NewTransactionModal
          onClose={() => setShowNewTransaction(false)}
          onSubmit={(payload) => {
            handleTransactionSubmit(payload);
            setShowNewTransaction(false);
          }}
        />
      )}

      <div className="p-4 px-4">
        {activeScreen === "home" && (
          <HomeScreen
            balances={balances}
            displaySavings={displaySavings}
            savingsIndicator={savingsIndicator}
            transactions={transactions}
            onNewTransaction={() => setShowNewTransaction(true)}
            onDelete={handleTransactionDelete}
            onEdit={handleTransactionEdit}
          />
        )}

        {activeScreen === "paycycle" && (
          <PayCycleScreen
            cycle={cycle}
            onStartNewCycle={() => setShowNewCycleWizard(true)}
          />
        )}

        {activeScreen === "account" && (
          <AccountScreen userId={userId} onLogout={handleLogoutFull} />
        )}
      </div>

      <BottomNav active={activeScreen} onChange={setActiveScreen} />
    </div>
  );
}

export default App;
