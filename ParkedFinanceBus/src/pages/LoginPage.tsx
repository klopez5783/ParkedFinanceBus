import { useState } from "react";
import { signup, login } from "../services/userService";

export default function LoginPage({ onLogin }: { onLogin: (userId: number) => void }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (isSignup && !username)) {
      setError("Please fill in all fields.");
      return;
    }

    const request = isSignup
      ? signup(username, email, password)
      : login(email, password);

    request
      .then((data) => {
        onLogin(data.userId);
      })
      .catch((err) => {
        setError(err.message);
      });

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-surface rounded-2xl p-8 w-full max-w-sm shadow-xl">
        <h1 className="text-3xl font-bold text-text text-center mb-2">
          ParkedFinance
        </h1>
        <p className="text-subText text-sm text-center mb-6">
          {isSignup ? "Create your account" : "Welcome back"}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignup && (
            <div>
              <label className="text-subText text-xs uppercase tracking-widest mb-1 block">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your name"
                className="w-full bg-surfaceLight rounded-xl px-3 py-2 text-text outline-none text-base font-semibold placeholder:text-mutedText"
              />
            </div>
          )}

          <div>
            <label className="text-subText text-xs uppercase tracking-widest mb-1 block">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full bg-surfaceLight rounded-xl px-3 py-2 text-text outline-none text-base font-semibold placeholder:text-mutedText"
            />
          </div>

          <div>
            <label className="text-subText text-xs uppercase tracking-widest mb-1 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-surfaceLight rounded-xl px-3 py-2 text-text outline-none text-base font-semibold placeholder:text-mutedText"
            />
          </div>

          {error && (
            <p className="text-danger text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="mt-2 py-3 rounded-xl bg-primary text-white font-bold text-base active:opacity-80"
          >
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>

        <p className="text-mutedText text-sm text-center mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
            }}
            className="text-secondary cursor-pointer font-semibold"
          >
            {isSignup ? "Log In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}
