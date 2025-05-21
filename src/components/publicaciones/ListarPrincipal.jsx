import { useListarPrincipal } from '../../hooks/useListarPrincipal'
import { useListarCategoria } from '../../hooks/useListarCategoria'

export const ListarPrincipal = ({ categoria }) => {
  const usarPorCategoria = !!categoria;
  const hook = usarPorCategoria
    ? useListarCategoria(categoria)
    : useListarPrincipal();

  const { publicaciones, loading, error } = hook;

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

  if (loading) {
    return <main style={containerStyle}><p>Cargando publicaciones...</p></main>;
  }

  if (error) {
    return <main style={containerStyle}><p style={{ color: "#ff5252" }}>{error}</p></main>;
  }

  if (!publicaciones.length) {
    return null;
  }

  return (
    <main style={containerStyle}>
      <h2 style={{ color: "#61dafb", marginBottom: "1rem" }}>
        {usarPorCategoria ? `Publicaciones de ${categoria}` : 'Publicaciones recientes'}
      </h2>

      {publicaciones.map((publi) => (
        <div key={publi._id} style={cardStyle}>
          <h3 style={titleStyle}>{publi.titulo}</h3>
          <p style={categoryStyle}>Categoría: {publi.categoria || "Sin categoría"}</p>
          <p style={textStyle}>{publi.textoPrincipal || "Sin descripción disponible."}</p>
          <small style={{ color: "#aaa" }}>
            Publicado por: {publi.usuario ?? "Desconocido"}
          </small>
          <br />
          <small style={{ color: "#aaa" }}>
            Fecha: {publi.formattedEntryDate}
          </small>
        </div>
      ))}
    </main>
  );
};