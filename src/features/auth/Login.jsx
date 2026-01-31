import React, { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://localhost:7250/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        alert("Usuario o contraseña incorrectos");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      alert("Login exitoso");
    } catch (error) {
      console.error(error);
      alert("No se pudo conectar con la API");
    }
  };

  return (
    <div className="container center">
      <div className="card" style={{maxWidth: 600, margin: '0 auto'}}>
        <h2 style={{marginBottom: '0.5rem'}}>Login</h2>
        <p className="muted">Ingresa tus credenciales para continuar</p>

        <form onSubmit={handleLogin} className="form spaced">
          <div className="field">
            <label className="form-label">Usuario</label>
            <input
              className="form-control"
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label className="form-label">Contraseña</label>
            <input
              className="form-control"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="spaced">
            <button className="btn btn-primary" type="submit">Ingresar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
