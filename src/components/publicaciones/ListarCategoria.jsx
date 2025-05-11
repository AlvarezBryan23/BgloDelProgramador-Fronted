import { useState } from "react";
import { Navbar } from "../navs/Navbar";
import { useListarCategoria } from "../../hooks/useListarCategoria";

export const ListarCategoria = () => {
  const [categoria, setCategoria] = useState("");
  const { publicaciones, loading, error } = useListarCategoria(categoria);

  const categoriasDisponibles = ["tics", "tecnologia", "taller"];

  const containerStyle = {
    marginTop: "0px",
    padding: "2rem",
    minHeight: "calc(100vh - 75px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "transparent",
    color: "#e0e0e0",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const selectStyle = {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #444",
    backgroundColor: "#1e1e2f",
    color: "#fff",
    marginBottom: "1.5rem",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "600px",
    background: "rgba(30, 30, 47, 0.95)",
    padding: "1rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    marginBottom: "1rem",
  };

  const titleStyle = {
    color: "#61dafb",
    marginBottom: "0.5rem",
  };

  const categoryStyle = {
    color: "#bb86fc",
    fontStyle: "italic",
    marginBottom: "0.5rem",
  };

  const textStyle = {
    color: "#ddd",
  };

  return (
    <>
      <Navbar />
      <main style={containerStyle}>
        <h2 style={{ color: "#61dafb", marginBottom: "1rem" }}>
          Listar Publicaciones por Categoría
        </h2>

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          style={selectStyle}
        >
          <option value="">-- Selecciona una categoría --</option>
          {categoriasDisponibles.map((cat) => (
            <option key={cat} value={cat}>
              {cat.toUpperCase()}
            </option>
          ))}
        </select>

        {loading && <p>Cargando publicaciones...</p>}
        {error && <p style={{ color: "#ff5252" }}>{error}</p>}
        {!loading && publicaciones.length === 0 && categoria && (
          <p>No hay publicaciones en esta categoría.</p>
        )}

        {publicaciones.map((pub) => (
          <div key={pub._id} style={cardStyle}>
            <h3 style={titleStyle}>{pub.titulo}</h3>
            <p style={categoryStyle}>{pub.categoria}</p>
            <p style={textStyle}>{pub.textoPrincipal}</p>
            <small style={{ color: "#aaa" }}>
              Publicado por: {pub.usuario?? "Desconocido"}
            </small>
            <br />
            <small style={{ color: "#aaa" }}>
              Fecha: {pub.formattedEntryDate}
            </small>
          </div>
        ))}
      </main>
    </>
  );
};