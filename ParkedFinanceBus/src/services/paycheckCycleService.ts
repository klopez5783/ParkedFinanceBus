import API_BASE from "./api";
import type { PaycheckCycleData }  from "../interfaces/PaycheckCycle";

export async function getPaycheckCycles(userId: number) {
  console.log("Fetching paycheck cycles for userId:", userId);
  const res = await fetch(`${API_BASE}/api/PaycheckCycles/user/${userId}`);
  console.log("Response from paycheck cycles fetch:", res);

  if (res.status === 204) {
    return null;  // no cycle exists
  }

  if (!res.ok) {
    throw new Error("Failed to fetch paycheck cycles");
  }

  return res.json();
}


export async function signup(
  username: string,
  email: string,
  password: string,
) {
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

export async function createPaycheckCycle(data: PaycheckCycleData) {
  const res = await fetch(`${API_BASE}/api/PaycheckCycles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create paycheck cycle");
  }

  return res.json();
}

export async function updatePaycheckCycle(id: number, data: PaycheckCycleData) {
  const res = await fetch(`${API_BASE}/api/PaycheckCycles/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update paycheck cycle");
  }

  console.log("Update response:", res);

  return res.json();
}


