// src/features/client/ClientForm.jsx
import React, { useState, useLayoutEffect } from "react";
import { authHeader } from "../../utils/authHeader";

export default function ClientForm({ onSuccess, editingClient }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Usamos useLayoutEffect para inicializar el formulario cuando editingClient cambie
  useLayoutEffect(() => {
    if (editingClient) {
      setFullName(editingClient.fullName);
      setEmail(editingClient.email);
      setPhone(editingClient.phone);
    }
  }, [editingClient]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !phone) {
      setMessage("Todos los campos son obligatorios");
      return;
    }

    try {
      const url = editingClient 
        ? `https://localhost:7250/api/client/${editingClient.id}` 
        : "https://localhost:7250/api/client";
      const method = editingClient ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify({ fullName, email, phone }),
      });

      if (!res.ok) throw new Error("Error al guardar");

      setMessage(editingClient ? "Cliente actualizado!" : "Cliente creado!");
      setFullName(""); setEmail(""); setPhone("");
      if (onSuccess) onSuccess();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Nombre" 
          value={fullName} 
          onChange={e => setFullName(e.target.value)} 
        />
        <input 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        />
        <input 
          placeholder="Teléfono" 
          value={phone} 
          onChange={e => setPhone(e.target.value)} 
        />
        <button type="submit">{editingClient ? "Actualizar" : "Agregar Cliente"}</button>
      </form>
    </div>
  );
}
