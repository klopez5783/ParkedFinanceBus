import type { PaycheckCycleData } from "../interfaces/PaycheckCycle";

interface Props {
  cycle: PaycheckCycleData;
  onStartNewCycle: () => void;
}

export default function PayCycleScreen({ cycle, onStartNewCycle }: Props) {
  const formatDate = (d: string) => new Date(d).toLocaleDateString();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-text text-center">Pay Cycle</h1>

      <div className="bg-surface rounded-2xl p-5 flex flex-col gap-3">
        <h2 className="text-subText text-xs uppercase tracking-widest font-semibold">Current Cycle</h2>

        <div className="flex justify-between items-center">
          <span className="text-mutedText text-sm">Period</span>
          <span className="text-text font-semibold text-sm">
            {formatDate(cycle.startDate)} → {formatDate(cycle.endDate)}
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
    </div>
  );
}
