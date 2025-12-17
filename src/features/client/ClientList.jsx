// src/features/client/ClientList.jsx
import React, { useState, useEffect } from "react";
import ClientForm from "./ClientForm";
import { authHeader } from "../../utils/authHeader";

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [editingClient, setEditingClient] = useState(null);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const res = await fetch("https://localhost:7250/api/client", { headers: authHeader() });
        const data = await res.json();
        setClients(data); // aquí es seguro
      } catch (err) {
        console.error(err);
      }
    };

    loadClients();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este cliente?")) return;

    try {
      const res = await fetch(`https://localhost:7250/api/client/${id}`, {
        method: "DELETE",
        headers: authHeader(),
      });
      if (!res.ok) throw new Error("Error al eliminar");
      // recargar la lista
      const resUpdated = await fetch("https://localhost:7250/api/client", { headers: authHeader() });
      const dataUpdated = await resUpdated.json();
      setClients(dataUpdated);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (client) => setEditingClient(client);

  return (
    <div>
      <h1>Clientes</h1>
      <ClientForm 
        onSuccess={() => { setEditingClient(null); }} 
        editingClient={editingClient} 
      />
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(c => (
            <tr key={c.id}>
              <td>{c.fullName}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Editar</button>
                <button onClick={() => handleDelete(c.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
