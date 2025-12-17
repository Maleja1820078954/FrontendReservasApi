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
    <div>
      <h1>Reservas</h1>
      <ReservationForm 
        onSuccess={() => setEditingReservation(null)} 
        editingReservation={editingReservation} 
      />
      <table border="1" cellPadding="8">
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
              <td>{r.status}</td>
              <td>
                <button onClick={() => setEditingReservation(r)}>Editar</button>
                <button onClick={() => handleDelete(r.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
