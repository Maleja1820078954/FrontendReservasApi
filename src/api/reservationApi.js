import { authHeader } from "../utils/authHeader";

const BASE_URL = "https://localhost:7250/api/Reservation";

export async function getReservations() {
  const res = await fetch(BASE_URL, { headers: authHeader() });
  return res.json();
}

export async function addReservation(reservation) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(reservation),
  });
  return res.json();
}

export async function updateReservation(id, reservation) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(reservation),
  });
  return res.json();
}

export async function deleteReservation(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });
}
