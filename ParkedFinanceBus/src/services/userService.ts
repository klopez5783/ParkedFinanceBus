import API_BASE from "./api";

export async function signup(username: string, email: string, password: string) {
  const res = await fetch(`${API_BASE}/api/Users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, passwordHash: password }),
  });

  console.log("Signup response:", res);

  if (!res.ok) {
    throw new Error("Signup failed");
  }

  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/api/Users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid email or password");
  }

  return res.json();
}
