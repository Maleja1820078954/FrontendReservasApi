import { authHeader } from "../utils/authHeader";

const BASE_URL = "https://localhost:7250/api/client";

export async function getClients() {
  const res = await fetch(BASE_URL, { headers: authHeader() });
  return res.json();
}

export async function addClient(client) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(client),
  });
  return res.json();
}

export async function updateClient(id, client) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(client),
  });
  return res.json();
}

export async function deleteClient(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });
}
