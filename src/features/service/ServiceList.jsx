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
    <div>
      <h1>Servicios</h1>
      <ServiceForm onSuccess={async () => {
        try {
          const res = await fetch("https://localhost:7250/api/services", { headers: authHeader() });
          const data = await res.json();
          setServices(data);
        } catch (err) {
          console.error(err);
        }
      }} />
      <ul>
        {services.map(s => (
          <li key={s.id}>
            {s.name} - ${s.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
