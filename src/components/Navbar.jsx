import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirige al login
  };

  if (!token) return null; // No mostrar navbar si no hay token

  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li><Link to="/clients" style={styles.link}>Clientes</Link></li>
        <li><Link to="/services" style={styles.link}>Servicios</Link></li>
        <li><Link to="/reservations" style={styles.link}>Reservas</Link></li>
        <li><button onClick={handleLogout} style={styles.button}>Cerrar sesión</button></li>
      </ul>
    </nav>
  );
}

// Estilos simples inline (puedes reemplazar con CSS)
const styles = {
  nav: {
    backgroundColor: "#333",
    padding: "10px"
  },
  ul: {
    display: "flex",
    listStyle: "none",
    justifyContent: "space-around",
    margin: 0,
    padding: 0
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};
