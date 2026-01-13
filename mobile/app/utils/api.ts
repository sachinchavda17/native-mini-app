import Constants from "expo-constants";

const API_URL ="http://127.0.0.1:8000"


let authToken = "";

export function setAuthToken(token: string) {
  
  authToken = token;
}

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "API Error");
  }

  return res.json();
}

