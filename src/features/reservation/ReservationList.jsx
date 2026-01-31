// src/features/reservation/ReservationList.jsx
import React, { useState, useEffect } from "react";
import ReservationForm from "./ReservationForm";
import { authHeader } from "../../utils/authHeader";

export default function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [editingReservation, setEditingReservation] = useState(null);

  useEffect(() => {
    const loadReservations = async () => {
      try {
        const res = await fetch("https://localhost:7250/api/reservation", { headers: authHeader() });
        const data = await res.json();
        setReservations(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadReservations();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta reserva?")) return;

    try {
      const res = await fetch(`https://localhost:7250/api/reservation/${id}`, {
        method: "DELETE",
        headers: authHeader(),
      });
      if (!res.ok) throw new Error("Error al eliminar");

      const resUpdated = await fetch("https://localhost:7250/api/reservation", { headers: authHeader() });
      const dataUpdated = await resUpdated.json();
      setReservations(dataUpdated);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1 className="center">Reservas</h1>

      <ReservationForm 
        onSuccess={() => setEditingReservation(null)} 
        editingReservation={editingReservation} 
      />

      <div className="card table-wrapper">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Servicio</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map(r => (
                <tr key={r.id}>
                  <td>{r.client.fullName}</td>
                  <td>{r.service.name}</td>
                  <td>{new Date(r.date).toLocaleString()}</td>
                  <td className="muted">{r.status}</td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-outline btn-sm" onClick={() => setEditingReservation(r)}>Editar</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(r.id)}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
