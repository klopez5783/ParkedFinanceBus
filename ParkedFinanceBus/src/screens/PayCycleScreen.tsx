import type { PaycheckCycleData } from "../interfaces/PaycheckCycle";
import {
  getAllUserPaycheckCycles,
  updatePaycheckCycle,
  deletePaycheckCycle,
  deleteTransactionsByCycleId
} from "../services/paycheckCycleService";
import { useEffect, useState } from "react";

interface Props {
  userId: number;
  cycle: PaycheckCycleData;
  onStartNewCycle: () => void;
  onSetActive: (cycle: PaycheckCycleData) => void;
}

export default function PayCycleScreen({ userId, cycle, onStartNewCycle, onSetActive }: Props) {
  const [allCycles, setAllCycles] = useState<PaycheckCycleData[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editAmount, setEditAmount] = useState(0);
  const [editGoal, setEditGoal] = useState(0);
  const [editStart, setEditStart] = useState("");
  const [editEnd, setEditEnd] = useState("");

  useEffect(() => {
    getAllUserPaycheckCycles(userId)
      .then(setAllCycles)
      .catch((error) => console.error("Error fetching all paycheck cycles:", error));
  }, [userId]);

  async function handleSetActive(c: PaycheckCycleData) {
  onSetActive(c);
  setAllCycles(prev => [c, ...prev.filter(x => x.cycleId !== c.cycleId)]);
  setExpandedId(null);
}


  const formatDate = (d: string) => new Date(d).toLocaleDateString();

  function startEdit(c: PaycheckCycleData) {
    setEditingId(c.cycleId!);
    setEditAmount(c.paycheckAmount);
    setEditGoal(c.savingsGoal);
    setEditStart(c.startDate);
    setEditEnd(c.endDate);
  }

  async function handleEdit(c: PaycheckCycleData) {
    const updated = await updatePaycheckCycle(c.cycleId!, {
      ...c,
      paycheckAmount: editAmount,
      savingsGoal: editGoal,
      startDate: editStart,
      endDate: editEnd,
    });
    setAllCycles((prev) => prev.map((x) => (x.cycleId === c.cycleId ? updated : x)));
    setEditingId(null);
  }

  async function handleDelete(c: PaycheckCycleData) {
    await deleteTransactionsByCycleId(c.cycleId!);
    await deletePaycheckCycle(c.cycleId!);
    setAllCycles((prev) => prev.filter((x) => x.cycleId !== c.cycleId));
    setExpandedId(null);
  }

  const pastCycles = allCycles.slice(1);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-text text-center">Pay Cycle</h1>

      {/* Current Cycle */}
      <div className="bg-surface rounded-2xl p-5 flex flex-col gap-3">
        <h2 className="text-subText text-xs uppercase tracking-widest font-semibold">Current Cycle</h2>
        <div className="flex justify-between items-center">
          <span className="text-mutedText text-sm">Period</span>
          <span className="text-text font-semibold text-sm">
            {formatDate(cycle.startDate)} → {formatDate(cycle.endDate)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-mutedText text-sm">Cycle ID:</span>
          <span className="text-text font-semibold text-sm">
            {cycle.cycleId}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-mutedText text-sm">Paycheck</span>
          <span className="text-text font-semibold">${cycle.paycheckAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-mutedText text-sm">Savings Goal</span>
          <span className="text-text font-semibold">${cycle.savingsGoal.toFixed(2)}</span>
        </div>
        <div className="h-px bg-divider my-1" />
        <div className="flex justify-between items-center">
          <span className="text-mutedText text-sm">Savings</span>
          <span className="text-text font-semibold">${cycle.savings.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-mutedText text-sm">Needs</span>
          <span className="text-text font-semibold">${cycle.needs.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-mutedText text-sm">Wants</span>
          <span className="text-text font-semibold">${cycle.wants.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onStartNewCycle}
        className="w-full py-3 rounded-xl bg-primary text-white font-bold text-lg active:opacity-80"
      >
        Start New Cycle
      </button>

      {/* Past Cycles */}
      {pastCycles.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-subText text-xs uppercase tracking-widest font-semibold px-1">
            Past Cycles
          </h2>

          {pastCycles.map((c) => (
            <div key={c.cycleId} className="bg-surface rounded-2xl overflow-hidden">

              {/* Header row — tap to expand */}
              <button
                onClick={() => setExpandedId(expandedId === c.cycleId ? null : c.cycleId!)}
                className="w-full flex justify-between items-center px-5 py-4"
              >
                <div className="flex flex-col items-start gap-0.5">
                  <span className="text-text font-semibold text-sm">
                    {formatDate(c.startDate)} → {formatDate(c.endDate)}
                  </span>
                  <span className="text-mutedText text-xs">Paycheck: ${c.paycheckAmount.toFixed(2)}</span>
                  <span className="text-mutedText text-xs">Cycle ID: {c.cycleId}</span>
                </div>
                <span className="text-mutedText text-lg">{expandedId === c.cycleId ? "▲" : "▼"}</span>
              </button>

              {/* Expanded details */}
              {expandedId === c.cycleId && (
                <div className="px-5 pb-5 flex flex-col gap-3 border-t border-divider pt-4">
                  {editingId === c.cycleId ? (
                    <>
                      <div className="flex flex-col gap-1">
                        <label className="text-subText text-xs uppercase tracking-widest">Paycheck Amount</label>
                        <input
                          type="number"
                          value={editAmount}
                          onChange={(e) => setEditAmount(Number(e.target.value))}
                          className="bg-surfaceLight text-text rounded-xl px-3 py-2 outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-subText text-xs uppercase tracking-widest">Savings Goal</label>
                        <input
                          type="number"
                          value={editGoal}
                          onChange={(e) => setEditGoal(Number(e.target.value))}
                          className="bg-surfaceLight text-text rounded-xl px-3 py-2 outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-subText text-xs uppercase tracking-widest">Start Date</label>
                        <input
                          type="date"
                          value={editStart}
                          onChange={(e) => setEditStart(e.target.value)}
                          className="bg-surfaceLight text-text rounded-xl px-3 py-2 outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-subText text-xs uppercase tracking-widest">End Date</label>
                        <input
                          type="date"
                          value={editEnd}
                          onChange={(e) => setEditEnd(e.target.value)}
                          className="bg-surfaceLight text-text rounded-xl px-3 py-2 outline-none"
                        />
                      </div>
                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={() => handleEdit(c)}
                          className="flex-1 py-2 rounded-xl bg-primary text-white font-semibold active:opacity-80"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex-1 py-2 rounded-xl bg-surfaceLight text-white font-semibold active:opacity-80"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* <div className="flex justify-between">
                        <span className="text-mutedText text-sm">Savings Goal</span>
                        <span className="text-text font-semibold">${c.savingsGoal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-mutedText text-sm">Savings</span>
                        <span className="text-text font-semibold">${c.savings.toFixed(2)}</span>
                      </div> */}
                      <div className="flex justify-between">
                        <span className="text-mutedText text-sm">Total Savings</span>
                        <span className="text-text font-semibold">${(c.savingsGoal + c.savings).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-mutedText text-sm">Needs</span>
                        <span className="text-text font-semibold">${c.needs.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-mutedText text-sm">Wants</span>
                        <span className="text-text font-semibold">${c.wants.toFixed(2)}</span>
                      </div>
                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={() => startEdit(c)}
                          className="flex-1 py-2 rounded-xl bg-surfaceLight text-white font-semibold active:opacity-80"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(c)}
                          className="flex-1 py-2 rounded-xl bg-danger text-white font-semibold active:opacity-80"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleSetActive(c)}
                          className="flex-1 py-2 rounded-xl bg-success text-white font-semibold active:opacity-80"
                        >
                          Set as Active
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
