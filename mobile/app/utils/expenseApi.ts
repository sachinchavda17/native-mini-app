import { apiFetch } from "./api";

export async function syncExpense(expense: any) {
  return apiFetch("/expenses", {
    method: "POST",
    body: JSON.stringify(expense),
  });
}

export async function pullExpenses(since?: string) {
  const query = since ? `?since=${encodeURIComponent(since)}` : "";
  return apiFetch(`/expenses${query}`);
}

export async function deleteExpense(localId: string) {
  return apiFetch(`/expenses/${localId}`, {
    method: "DELETE",
  });
}
