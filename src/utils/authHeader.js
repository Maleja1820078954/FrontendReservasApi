// utils/authHeader.js

// Esta función devuelve los headers con el token JWT
export function authHeader() {
  const token = localStorage.getItem("token"); // o sessionStorage
  if (token) return { Authorization: `Bearer ${token}` };
  return {};
}
