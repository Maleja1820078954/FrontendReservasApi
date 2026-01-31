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
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/clients" className="nav-link">Clientes</Link></li>
        <li><Link to="/services" className="nav-link">Servicios</Link></li>
        <li><Link to="/reservations" className="nav-link">Reservas</Link></li>
        <li><button onClick={handleLogout} className="btn btn-danger">Cerrar sesión</button></li>
      </ul>
    </nav>
  );
}

