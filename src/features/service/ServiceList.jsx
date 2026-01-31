// src/features/service/ServiceList.jsx
import React, { useState, useEffect } from "react";
import ServiceForm from "./ServiceForm";
import { authHeader } from "../../utils/authHeader";

export default function ServiceList() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await fetch("https://localhost:7250/api/services", { headers: authHeader() });
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadServices();
  }, []);

  return (
    <div className="container">
      <h1 className="center">Servicios</h1>

      <ServiceForm onSuccess={async () => {
        try {
          const res = await fetch("https://localhost:7250/api/services", { headers: authHeader() });
          const data = await res.json();
          setServices(data);
        } catch (err) {
          console.error(err);
        }
      }} />

      <div className="card table-wrapper">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Servicio</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {services.map(s => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>${s.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
