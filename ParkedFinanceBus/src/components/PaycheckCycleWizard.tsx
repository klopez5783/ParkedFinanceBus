import { useState } from "react";

interface PaycheckCycleData {
  uid: number;
  paycheckAmount: number;
  savingsGoal: number;
  savings: number;
  needs: number;
  wants: number;
  startDate: string;
  endDate: string;
}

export default function PaycheckCycleWizard({
  userId,
  onComplete,
}: {
  userId: number;
  onComplete: (cycle: PaycheckCycleData) => void;
}) {
  const [step, setStep] = useState(1);
  const [paycheckAmount, setPaycheckAmount] = useState("");
  const [periodDays, setPeriodDays] = useState(14);
  const [mode, setMode] = useState<"percent" | "dollar">("dollar");
  const [savingsGoal, setSavingsGoal] = useState("");
  const [needs, setNeeds] = useState("");
  const [wants, setWants] = useState("");

  const paycheckNum = parseFloat(paycheckAmount) || 0;
  const rawSavings = parseFloat(savingsGoal) || 0;
  const rawNeeds = parseFloat(needs) || 0;
  const rawWants = parseFloat(wants) || 0;
  const total = rawSavings + rawNeeds + rawWants;
  const remaining = mode === "percent" ? 100 - total : paycheckNum - total;

  const savingsNum = mode === "percent" ? (rawSavings / 100) * paycheckNum : rawSavings;
  const needsNum = mode === "percent" ? (rawNeeds / 100) * paycheckNum : rawNeeds;
  const wantsNum = mode === "percent" ? (rawWants / 100) * paycheckNum : rawWants;

  function handleSubmit() {
    const today = new Date();
    const end = new Date(today);
    end.setDate(end.getDate() + periodDays);

    const cycle: PaycheckCycleData = {
      uid: userId,
      paycheckAmount: paycheckNum,
      savingsGoal: savingsNum,
      savings: 0,
      needs: needsNum,
      wants: wantsNum,
      startDate: today.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0],
    };

    onComplete(cycle);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-surface rounded-2xl p-8 w-full max-w-sm shadow-xl">
        <h1 className="text-2xl font-bold text-text text-center mb-2">
          Set Up Your Budget
        </h1>
        <p className="text-subText text-sm text-center mb-6">
          Step {step} of 3
        </p>

        {step === 1 && (
          <div className="flex flex-col gap-4">
            <label className="text-subText text-xs uppercase tracking-widest">
              Paycheck Amount
            </label>
            <div className="flex items-center bg-surfaceLight rounded-xl px-3 py-2 gap-1">
              <span className="text-mutedText font-semibold">$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={paycheckAmount}
                onChange={(e) => setPaycheckAmount(e.target.value)}
                className="bg-transparent text-text flex-1 outline-none text-lg font-semibold placeholder:text-mutedText"
              />
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!paycheckNum}
              className="mt-2 py-3 rounded-xl bg-primary text-white font-bold text-base disabled:opacity-40 active:opacity-80"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <label className="text-subText text-xs uppercase tracking-widest">
              How often do you get paid?
            </label>
            {[
              { days: 7, label: "Weekly" },
              { days: 14, label: "Every 2 Weeks" },
              { days: 30, label: "Monthly" },
            ].map((option) => (
              <button
                key={option.days}
                onClick={() => setPeriodDays(option.days)}
                className={`py-3 rounded-xl font-bold text-base border ${
                  periodDays === option.days
                    ? "bg-primary text-white border-primary"
                    : "bg-surfaceLight text-text border-divider"
                } active:opacity-80`}
              >
                {option.label}
              </button>
            ))}
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl border border-divider text-mutedText font-bold text-base active:opacity-80"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 rounded-xl bg-primary text-white font-bold text-base active:opacity-80"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4">
            <p className="text-subText text-sm text-center">
              Split ${paycheckNum.toFixed(2)} across categories
            </p>

            <div className="flex bg-surfaceLight rounded-xl p-1">
              <button
                type="button"
                onClick={() => { setMode("percent"); setSavingsGoal(""); setNeeds(""); setWants(""); }}
                className={`flex-1 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                  mode === "percent" ? "bg-primary text-white" : "text-mutedText"
                }`}
              >
                % Percent
              </button>
              <button
                type="button"
                onClick={() => { setMode("dollar"); setSavingsGoal(""); setNeeds(""); setWants(""); }}
                className={`flex-1 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                  mode === "dollar" ? "bg-primary text-white" : "text-mutedText"
                }`}
              >
                $ Dollar
              </button>
            </div>

            <div>
              <label className="text-subText text-xs uppercase tracking-widest mb-1 block">
                Savings Goal
              </label>
              <div className="flex items-center bg-surfaceLight rounded-xl px-3 py-2 gap-1">
                {mode === "dollar" && <span className="text-mutedText font-semibold">$</span>}
                <input
                  type="number"
                  min="0"
                  step={mode === "percent" ? "1" : "0.01"}
                  placeholder="0"
                  value={savingsGoal}
                  onChange={(e) => setSavingsGoal(e.target.value)}
                  className="bg-transparent text-text flex-1 outline-none text-base font-semibold placeholder:text-mutedText"
                />
                {mode === "percent" && <span className="text-mutedText font-semibold">%</span>}
              </div>
            </div>

            <div>
              <label className="text-subText text-xs uppercase tracking-widest mb-1 block">
                Needs
              </label>
              <div className="flex items-center bg-surfaceLight rounded-xl px-3 py-2 gap-1">
                {mode === "dollar" && <span className="text-mutedText font-semibold">$</span>}
                <input
                  type="number"
                  min="0"
                  step={mode === "percent" ? "1" : "0.01"}
                  placeholder="0"
                  value={needs}
                  onChange={(e) => setNeeds(e.target.value)}
                  className="bg-transparent text-text flex-1 outline-none text-base font-semibold placeholder:text-mutedText"
                />
                {mode === "percent" && <span className="text-mutedText font-semibold">%</span>}
              </div>
            </div>

            <div>
              <label className="text-subText text-xs uppercase tracking-widest mb-1 block">
                Wants
              </label>
              <div className="flex items-center bg-surfaceLight rounded-xl px-3 py-2 gap-1">
                {mode === "dollar" && <span className="text-mutedText font-semibold">$</span>}
                <input
                  type="number"
                  min="0"
                  step={mode === "percent" ? "1" : "0.01"}
                  placeholder="0"
                  value={wants}
                  onChange={(e) => setWants(e.target.value)}
                  className="bg-transparent text-text flex-1 outline-none text-base font-semibold placeholder:text-mutedText"
                />
                {mode === "percent" && <span className="text-mutedText font-semibold">%</span>}
              </div>
            </div>

            <p
              className={`text-sm font-semibold text-center ${
                Math.abs(remaining) < 0.01
                  ? "text-success"
                  : remaining < 0
                    ? "text-danger"
                    : "text-warning"
              }`}
            >
              {Math.abs(remaining) < 0.01
                ? "Fully allocated"
                : remaining < 0
                  ? `Over by ${mode === "percent" ? `${Math.abs(remaining).toFixed(1)}%` : `$${Math.abs(remaining).toFixed(2)}`}`
                  : `${mode === "percent" ? `${remaining.toFixed(1)}% remaining` : `$${remaining.toFixed(2)} remaining`}`}
            </p>

            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 rounded-xl border border-divider text-mutedText font-bold text-base active:opacity-80"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={Math.abs(remaining) > 0.01}
                className="flex-1 py-3 rounded-xl bg-primary text-white font-bold text-base disabled:opacity-40 active:opacity-80"
              >
                Start Budget
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
