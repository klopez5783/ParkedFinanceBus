import { useState, useEffect } from "react";
import type { Balances } from "../interfaces/Balances";
import type { Transaction } from "../interfaces/Transaction";
import type { PaycheckCycleData } from "../interfaces/PaycheckCycle";
import {
  getPaycheckCycles,
  createPaycheckCycle,
} from "../services/paycheckCycleService";
import { createTransaction } from "../services/transactionService";

export function useBudget(userId: number | null) {
  const [balances, setBalances] = useState<Balances>({
    savings: 0,
    needs: 0,
    wants: 0,
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [cycle, setCycle] = useState<PaycheckCycleData | null>(null);

  // Fetch cycle on login
  useEffect(() => {
    if (userId === null) return;

    getPaycheckCycles(userId)
      .then((data) => {
        if (data) {
          setCycle(data);
          console.log("Fetched cycle data:", data);
          setBalances({
            savings: data.savings,
            needs: data.needs,
            wants: data.wants,
          });
          setSavingsGoal(data.savingsGoal);
        }
      })
      .catch((error) => {
        console.error("Error fetching paycheck cycles:", error);
      });
  }, [userId]);

  function handleCycleCreate(data: PaycheckCycleData) {
    return createPaycheckCycle(data).then((savedCycle) => {
      setCycle(savedCycle);
      setBalances({
        savings: savedCycle.savings,
        needs: savedCycle.needs,
        wants: savedCycle.wants,
      });
      setSavingsGoal(savedCycle.savingsGoal);
    });
  }

  function handleTransactionSubmit(payload?: {
    savings: number;
    needs: number;
    wants: number;
    description: string;
    deposit: boolean;
    cycleID: number;
  }) {
    if (!payload) return;

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

    createTransaction({
      uid: userId!,
      cycleId: cycle!.cycleId!,
      description: payload.description || "New Transaction",
      category,
      amount,
      date: new Date().toISOString(),
    })
      .then((savedTransaction) => {
        setTransactions((prev) => [...prev, savedTransaction]);
      })
      .catch((error) => {
        console.error("Error creating transaction:", error);
      });
  }

  function handleLogout() {
    setCycle(null);
    setBalances({ savings: 0, needs: 0, wants: 0 });
    setTransactions([]);
    setSavingsGoal(0);
  }

  const displaySavings =
    balances.savings < 0 ? balances.savings : savingsGoal + balances.savings;
  const savingsIndicator =
    balances.savings < -savingsGoal
      ? "⚠"
      : balances.savings > 0
        ? "✅"
        : undefined;

  return {
    balances,
    transactions,
    savingsGoal,
    cycle,
    displaySavings,
    savingsIndicator,
    handleCycleCreate,
    handleTransactionSubmit,
    handleLogout,
  };
}
