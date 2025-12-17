import { authHeader } from "../utils/authHeader";

const BASE_URL = "https://localhost:7250/api/Services";

export async function getServices() {
  const res = await fetch(BASE_URL, { headers: authHeader() });
  return res.json();
}

export async function addService(service) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(service),
  });
  return res.json();
}

export async function updateService(id, service) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(service),
  });
  return res.json();
}

export async function deleteService(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });
}
