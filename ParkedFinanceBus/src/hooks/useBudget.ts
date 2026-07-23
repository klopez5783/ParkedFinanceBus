import { useState, useEffect } from "react";
import type { Balances } from "../interfaces/Balances";
import type { Transaction } from "../interfaces/Transaction";
import type { PaycheckCycleData } from "../interfaces/PaycheckCycle";
import {
  getPaycheckCycles,
  createPaycheckCycle,
  updatePaycheckCycle,
} from "../services/paycheckCycleService";
import {
  createTransaction,
  getTransactionsByCycle,
  updateTransaction,
  deleteTransaction,
} from "../services/transactionService";

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
          // Fetch transactions for the cycle
          getTransactionsByCycle(data.cycleId!)
            .then((transactionsData) => {
              setTransactions(transactionsData);
            })
            .catch((error) => {
              console.error("Error fetching transactions:", error);
            });
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

  async function handleTransactionSubmit(payload?: {
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

    const newBalances = {
      ...balances,
      [key]: balances[key] + amount,
    };

    try {
      const savedTransaction = await createTransaction({
        uid: userId!,
        cycleId: cycle!.cycleId!,
        description: payload.description || "New Transaction",
        category,
        amount,
        date: new Date().toISOString(),
      });

      setTransactions((prev) => [...prev, savedTransaction]);

      const updatedCycle = await updatePaycheckCycle(cycle!.cycleId!, {
        ...cycle!,
        savings: newBalances.savings,
        needs: newBalances.needs,
        wants: newBalances.wants,
      });

      setCycle(updatedCycle);
      setBalances(newBalances);
    } catch (error) {
      console.error("Transaction or cycle update failed:", error);
    }

  }

  async function handleTransactionDelete(tx: Transaction) {
    const key = tx.category.toLowerCase() as keyof Balances;
    const newBalances = { ...balances, [key]: balances[key] - tx.amount };

    try {
      await deleteTransaction(tx.transactionId);
      setTransactions((prev) => prev.filter((t) => t.transactionId !== tx.transactionId));

      const updatedCycle = await updatePaycheckCycle(cycle!.cycleId!, {
        ...cycle!,
        savings: newBalances.savings,
        needs: newBalances.needs,
        wants: newBalances.wants,
      });

      setCycle(updatedCycle);
      setBalances(newBalances);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }

  async function handleTransactionEdit(
    tx: Transaction,
    updated: { description: string; category: string; amount: number }
  ) {
    console.log("Editing transaction:", tx);
    console.log("type of tx.category:", typeof tx.category, "value:", tx.category);
    const oldKey = tx.category.toLowerCase() as keyof Balances;
    const newKey = updated.category.toLowerCase() as keyof Balances;

    const newBalances = { ...balances };
    newBalances[oldKey] = newBalances[oldKey] - tx.amount;
    newBalances[newKey] = newBalances[newKey] + updated.amount;

    try {
      const savedTransaction = await updateTransaction(tx.transactionId, updated);
      setTransactions((prev) =>
        prev.map((t) => (t.transactionId === tx.transactionId ? savedTransaction : t))
      );

      const updatedCycle = await updatePaycheckCycle(cycle!.cycleId!, {
        ...cycle!,
        savings: newBalances.savings,
        needs: newBalances.needs,
        wants: newBalances.wants,
      });

      setCycle(updatedCycle);
      setBalances(newBalances);
    } catch (error) {
      console.error("Edit failed:", error);
    }
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
    handleTransactionDelete,
    handleTransactionEdit,
    handleLogout,
  };
}
