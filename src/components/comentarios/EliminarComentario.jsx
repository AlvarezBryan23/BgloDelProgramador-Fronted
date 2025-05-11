import { Navbar } from "../navs/Navbar"
import { useState } from "react"
import { useEliminarComentario } from "../../hooks/useEliminarComentario"

export const EliminarComentario = () => {
  const [success, setSuccess] = useState(""); // Estado para el mensaje de éxito
  const {
    comentarioId,
    setComentarioId,
    deleted,
    error,
    loading,
    handleChange,
    handleDelete,
  } = useEliminarComentario();

  // Estilos del contenedor
  const containerStyle = {
    marginTop: "0px",
    padding: "2rem",
    minHeight: "calc(100vh - 75px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    background: "transparent",
    color: "#e0e0e0",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  // Estilos del formulario
  const formStyle = {
    width: "100%",
    maxWidth: "500px",
    background: "rgba(30, 30, 47, 0.95)",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(10px)",
  };

  // Estilos para la etiqueta
  const labelStyle = {
    fontWeight: "bold",
    color: "#ff5252",
    marginBottom: "0.5rem",
  };

  // Estilos del input
  const inputStyle = {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #444",
    backgroundColor: "#1e1e2f",
    color: "#fff",
    width: "100%",
  };

  // Estilos del botón
  const buttonStyle = {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#ff5252",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  // Estilos del botón deshabilitado
  const buttonDisabledStyle = {
    ...buttonStyle,
    backgroundColor: "#444",
    color: "#999",
    cursor: "not-allowed",
  };

  // Estilos para los mensajes
  const messageStyle = {
    textAlign: "center",
    marginTop: "1rem",
    fontWeight: "600",
  };

  return (
    <>
      <Navbar />
      <main style={containerStyle}>
        <form
          style={formStyle}
          onSubmit={(e) => {
            handleDelete(e);
            setSuccess(""); // Limpiar mensaje de éxito anterior
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "1.5rem",
              color: "#ff5252",
              textShadow: "0 0 6px #ff5252",
            }}
          >
            Eliminar Comentario
          </h2>

          {/* Campo para ingresar el ID del comentario */}
          <div style={{ marginBottom: "1.5rem", display: "flex", flexDirection: "column" }}>
            <label htmlFor="comentarioId" style={labelStyle}>
              ID del Comentario
            </label>
            <input
              id="comentarioId"
              name="comentarioId"
              type="text"
              value={comentarioId}
              onChange={handleChange}
              required
              placeholder="Ej: 1234abcd"
              style={inputStyle}
            />
          </div>

          {/* Botón de eliminar */}
          <button
            type="submit"
            disabled={loading}
            style={loading ? buttonDisabledStyle : buttonStyle}
          >
            {loading ? "Eliminando..." : "Eliminar Comentario"}
          </button>

          {/* Mensajes de éxito y error */}
          {deleted && (
            <p style={{ ...messageStyle, color: "#4caf50" }}>
              Comentario eliminado correctamente.
            </p>
          )}

          {error && (
            <p style={{ ...messageStyle, color: "#ff5252" }}>{error}</p>
          )}
        </form>
      </main>
    </>
  );
};
