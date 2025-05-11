import { Navbar } from '../navs/Navbar'
import { useActualizarPublicacion } from "../../hooks/useActualziarPublicacion"

export const EditarPublicacion = () => {
    const {
    form,
    handleChange,
    handleSubmit,
    loading,
    error,
    message,
  } = useActualizarPublicacion();

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

  const formStyle = {
    width: "100%",
    maxWidth: "600px",
    background: "rgba(30, 30, 47, 0.95)",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(10px)",
  };

  const formGroupStyle = {
    marginBottom: "1.5rem",
    display: "flex",
    flexDirection: "column",
  };

  const labelStyle = {
    fontWeight: "bold",
    color: "#bb86fc",
    marginBottom: "0.5rem",
  };

  const inputStyle = {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #444",
    backgroundColor: "#1e1e2f",
    color: "#fff",
  };

  const textareaStyle = {
    ...inputStyle,
    resize: "vertical",
    minHeight: "100px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#61dafb",
    color: "#121212",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonDisabledStyle = {
    ...buttonStyle,
    backgroundColor: "#444",
    color: "#999",
    cursor: "not-allowed",
  };

  const messageStyle = {
    textAlign: "center",
    marginTop: "1rem",
    fontWeight: "600",
  };

  return (
    <>
      <Navbar />
      <main style={containerStyle}>
        <form style={formStyle} onSubmit={handleSubmit}>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "1.5rem",
              color: "#61dafb",
              textShadow: "0 0 6px #61dafb",
            }}
          >
            Editar Publicación
          </h2>

          <div style={formGroupStyle}>
            <label htmlFor="id" style={labelStyle}>
              ID de la publicación
            </label>
            <input
              id="id"
              name="id"
              type="text"
              value={form.id}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="Ej: 681fa78991658736a7e42784"
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="titulo" style={labelStyle}>
              Título
            </label>
            <input
              id="titulo"
              name="titulo"
              type="text"
              value={form.titulo}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="Título actualizado"
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="textoPrincipal" style={labelStyle}>
              Texto Principal
            </label>
            <textarea
              id="textoPrincipal"
              name="textoPrincipal"
              value={form.textoPrincipal}
              onChange={handleChange}
              required
              style={textareaStyle}
              placeholder="Nuevo contenido de la publicación"
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="categoria" style={labelStyle}>
              Categoría
            </label>
            <input
              id="categoria"
              name="categoria"
              type="text"
              value={form.categoria}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="TECNOLOGIA, TALLER, TICS"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={loading ? buttonDisabledStyle : buttonStyle}
          >
            {loading ? "Actualizando..." : "Actualizar Publicación"}
          </button>

          {message && <p style={{ ...messageStyle, color: "#4caf50" }}>{message}</p>}
          {error && <p style={{ ...messageStyle, color: "#ff5252" }}>{error}</p>}
        </form>
      </main>
    </>
  );
};
