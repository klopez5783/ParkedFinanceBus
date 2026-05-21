import { useState } from "react";

const CATEGORIES = [
  { key: "savings" as const, label: "Savings 💰" },
  { key: "needs" as const, label: "Needs 📝" },
  { key: "wants" as const, label: "Wants 🛍️" },
];

type CategoryKey = "savings" | "needs" | "wants";

interface Props {
  onSubmit: (balances: Record<CategoryKey, number>) => void;
}

export default function PaycheckAllocationModal({ onSubmit }: Props) {
  const [paycheck, setPaycheck] = useState("");
  const [mode, setMode] = useState<"percent" | "dollar">("percent");
  const [values, setValues] = useState<Record<CategoryKey, string>>({
    savings: "",
    needs: "",
    wants: "",
  });

  const paycheckNum = parseFloat(paycheck) || 0;

  const total = CATEGORIES.reduce(
    (sum, c) => sum + (parseFloat(values[c.key]) || 0),
    0
  );

  const remaining =
    mode === "percent" ? 100 - total : paycheckNum - total;

  const fullyAllocated = Math.abs(remaining) < 0.01;
  const overAllocated = remaining < -0.01;

  function handleModeSwitch(next: "percent" | "dollar") {
    setMode(next);
    setValues({ savings: "", needs: "", wants: "" });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!paycheckNum) return;
    const balances = {} as Record<CategoryKey, number>;
    for (const c of CATEGORIES) {
      const val = parseFloat(values[c.key]) || 0;
      balances[c.key] =
        mode === "percent" ? (val / 100) * paycheckNum : val;
    }
    onSubmit(balances);
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <h2 className="text-2xl font-bold text-text mb-1">
          New Paycheck Allocation
        </h2>
        <p className="text-subText text-sm mb-5">
          Split your paycheck across categories
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-subText text-xs uppercase tracking-widest mb-1 block">
              Paycheck Amount
            </label>
            <div className="flex items-center bg-surfaceLight rounded-xl px-3 py-2 gap-1">
              <span className="text-mutedText font-semibold">$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={paycheck}
                onChange={(e) => setPaycheck(e.target.value)}
                className="bg-transparent text-text flex-1 outline-none text-lg font-semibold placeholder:text-mutedText"
              />
            </div>
          </div>

          <div className="flex bg-surfaceLight rounded-xl p-1">
            <button
              type="button"
              onClick={() => handleModeSwitch("percent")}
              className={`flex-1 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                mode === "percent"
                  ? "bg-primary text-white"
                  : "text-mutedText"
              }`}
            >
              % Percent
            </button>
            <button
              type="button"
              onClick={() => handleModeSwitch("dollar")}
              className={`flex-1 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                mode === "dollar"
                  ? "bg-primary text-white"
                  : "text-mutedText"
              }`}
            >
              $ Dollar
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {CATEGORIES.map((c) => (
              <div key={c.key}>
                <label className="text-subText text-xs uppercase tracking-widest mb-1 block">
                  {c.label}
                </label>
                <div className="flex items-center bg-surfaceLight rounded-xl px-3 py-2 gap-1">
                  {mode === "dollar" && (
                    <span className="text-mutedText font-semibold">$</span>
                  )}
                  <input
                    type="number"
                    min="0"
                    step={mode === "percent" ? "1" : "0.01"}
                    placeholder="0"
                    value={values[c.key]}
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        [c.key]: e.target.value,
                      }))
                    }
                    className="bg-transparent text-text flex-1 outline-none text-base font-semibold placeholder:text-mutedText"
                  />
                  {mode === "percent" && (
                    <span className="text-mutedText font-semibold">%</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {paycheckNum > 0 && (
            <div
              className={`text-sm font-semibold text-center ${
                fullyAllocated
                  ? "text-success"
                  : overAllocated
                  ? "text-danger"
                  : "text-warning"
              }`}
            >
              {fullyAllocated
                ? "Fully allocated"
                : overAllocated
                ? `Over by ${
                    mode === "percent"
                      ? `${Math.abs(remaining).toFixed(1)}%`
                      : `$${Math.abs(remaining).toFixed(2)}`
                  }`
                : `${
                    mode === "percent"
                      ? `${remaining.toFixed(1)}% remaining`
                      : `$${remaining.toFixed(2)} remaining`
                  }`}
            </div>
          )}

          <button
            type="submit"
            disabled={!paycheckNum}
            className="mt-1 py-3 rounded-xl bg-primary text-white font-bold text-base disabled:opacity-40 active:opacity-80"
          >
            Set Budget
          </button>
        </form>
      </div>
    </div>
  );
}
