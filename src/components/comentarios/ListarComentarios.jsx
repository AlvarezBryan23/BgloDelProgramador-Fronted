import { Navbar } from "../navs/Navbar"
import { useListarComentarios } from "../../hooks/useListarComentarios"

export const ListarComentarios = () => {
  const { comentarios, loading, error } = useListarComentarios();

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

  const cardStyle = {
    width: "100%",
    maxWidth: "600px",
    background: "rgba(30, 30, 47, 0.95)",
    padding: "1rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    marginBottom: "1rem",
  };

  const userStyle = {
    color: "#61dafb",
    marginBottom: "0.5rem",
    fontWeight: "bold",
  };

  const titleStyle = {
    color: "#bb86fc",
    marginBottom: "0.5rem",
    fontStyle: "italic",
  };

  const textStyle = {
    color: "#ddd",
    marginBottom: "0.5rem",
  };

  const dateStyle = {
    color: "#aaa",
    fontSize: "0.85rem",
  };

  return (
    <>
      <Navbar />
      <main style={containerStyle}>
        <h2 style={{ color: "#61dafb", marginBottom: "1rem" }}>
          Comentarios Recientes
        </h2>

        {loading && <p>Cargando comentarios...</p>}
        {error && <p style={{ color: "#ff5252" }}>{error}</p>}
        {!loading && comentarios.length === 0 && (
          <p>No hay comentarios disponibles.</p>
        )}

        {comentarios.map((comentario) => (
          <div key={comentario._id} style={cardStyle}>
            <p style={userStyle}>Usuario: {comentario.usuario ?? "Anónimo"}</p>
            <p style={titleStyle}>
              En publicación: {comentario.publicacion ?? "Sin título"}
            </p>
            <p style={textStyle}>
              Opinión: {comentario.opiniones ?? "Sin comentario"}
            </p>
            <p style={textStyle}>
              Información: {comentario.informacion ?? "Sin detalles"}
            </p>
            <small style={dateStyle}>
              Fecha: {comentario.formattedEntryDate}
            </small>
          </div>
        ))}
      </main>
    </>
  );
};
