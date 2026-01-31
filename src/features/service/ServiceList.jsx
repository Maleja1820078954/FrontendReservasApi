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
      <div className="card">
        <ServiceForm onSuccess={async () => {
          try {
            const res = await fetch("https://localhost:7250/api/services", { headers: authHeader() });
            const data = await res.json();
            setServices(data);
          } catch (err) {
            console.error(err);
          }
        }} />
      </div>

      <div className="card">
        <ul>
          {services.map(s => (
            <li key={s.id} className="form-row" style={{justifyContent:'space-between'}}>
              <span>{s.name}</span>
              <strong>${s.price.toFixed(2)}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
