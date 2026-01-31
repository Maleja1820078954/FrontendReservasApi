// src/features/service/ServiceForm.jsx
import React, { useState, useEffect } from "react";
import { authHeader } from "../../utils/authHeader";

export default function ServiceForm({ onSuccess, editingService }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (editingService) {
      setName(editingService.name);
      setPrice(editingService.price);
    }
  }, [editingService]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) {
      setMessage("Todos los campos son obligatorios");
      return;
    }

    try {
      const url = editingService 
        ? `https://localhost:7250/api/services/${editingService.id}` 
        : "https://localhost:7250/api/services";
      const method = editingService ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify({ name, price: parseFloat(price) }),
      });

      if (!res.ok) throw new Error("Error al guardar el servicio");

      setMessage(editingService ? "Servicio actualizado!" : "Servicio creado!");
      setName(""); setPrice("");
      if (onSuccess) onSuccess();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      {message && <p className="muted">{message}</p>}
      <form onSubmit={handleSubmit} className="form card">
        <div className="field">
          <label className="form-label">Nombre del servicio</label>
          <input className="form-control" placeholder="Nombre del servicio" value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div className="field">
          <label className="form-label">Precio</label>
          <input className="form-control" placeholder="Precio" type="number" value={price} onChange={e => setPrice(e.target.value)} />
        </div>

        <div className="spaced">
          <button className="btn btn-primary" type="submit">{editingService ? "Actualizar" : "Agregar Servicio"}</button>
        </div>
      </form>
    </div>
  );
}
