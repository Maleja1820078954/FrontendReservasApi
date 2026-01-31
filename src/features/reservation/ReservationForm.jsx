// src/features/reservation/ReservationForm.jsx
import React, { useState, useEffect } from "react";
import { authHeader } from "../../utils/authHeader";

export default function ReservationForm({ onSuccess, editingReservation }) {
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [clientId, setClientId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://localhost:7250/api/client", { headers: authHeader() })
      .then(res => res.json())
      .then(setClients)
      .catch(console.error);

    fetch("https://localhost:7250/api/services", { headers: authHeader() })
      .then(res => res.json())
      .then(setServices)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (editingReservation) {
      setClientId(editingReservation.client.id);
      setServiceId(editingReservation.service.id);
      setDate(new Date(editingReservation.date).toISOString().slice(0,16));
    }
  }, [editingReservation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clientId || !serviceId || !date) {
      setMessage("Todos los campos son obligatorios");
      return;
    }

    try {
      const url = editingReservation 
        ? `https://localhost:7250/api/reservation/${editingReservation.id}`
        : "https://localhost:7250/api/reservation";
      const method = editingReservation ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify({
          clientId: parseInt(clientId),
          serviceId: parseInt(serviceId),
          date
        }),
      });

      if (!res.ok) throw new Error("Error al guardar la reserva");

      setMessage(editingReservation ? "Reserva actualizada!" : "Reserva creada!");
      setClientId(""); setServiceId(""); setDate("");
      if (onSuccess) onSuccess();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      {message && <p className="muted">{message}</p>}
      <form onSubmit={handleSubmit} className="form card">
        <div className="form-row">
          <div className="field">
            <label className="form-label">Cliente</label>
            <select className="form-control" value={clientId} onChange={e => setClientId(e.target.value)}>
              <option value="">Selecciona un cliente</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.fullName}</option>)}
            </select>
          </div>

          <div className="field">
            <label className="form-label">Servicio</label>
            <select className="form-control" value={serviceId} onChange={e => setServiceId(e.target.value)}>
              <option value="">Selecciona un servicio</option>
              {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
        </div>

        <div className="field">
          <label className="form-label">Fecha y hora</label>
          <input className="form-control" type="datetime-local" value={date} onChange={e => setDate(e.target.value)} />
        </div>

        <div className="spaced">
          <button className="btn btn-primary" type="submit">{editingReservation ? "Actualizar" : "Crear Reserva"}</button>
        </div>
      </form>
    </div>
  );
}
