import { Navbar } from "../navs/Navbar"
import { useState } from "react"
import { useAgregarComentario } from "../../hooks/useAgregarComentario"

export const AgregarComentario = () => {
   const [form, setForm] = useState({
    opiniones: "",
    informacion: "",
    titulo: "", // Título que funciona como ID
    username: "", // Nombre de usuario que también funciona como ID
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { agregarComentario, loading } = useAgregarComentario();

  // Maneja los cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Valida y maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validación básica de campos
    if (!form.opiniones || !form.informacion || !form.titulo || !form.username) {
      setError("Por favor completa todos los campos.");
      return;
    }

    // Llamada al servicio para agregar el comentario
    agregarComentario(
      form,
      (data) => {
        setSuccess("Comentario agregado correctamente.");
        setForm({ opiniones: "", informacion: "", titulo: "", username: "" });
      },
      (errMsg) => {
        setError(errMsg);
      }
    );
  };

  // Estilos del componente
  const styles = {
    container: {
      marginTop: "0px",
      padding: "2rem",
      minHeight: "calc(100vh - 75px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      background: "transparent",
      color: "#e0e0e0",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    form: {
      width: "100%",
      maxWidth: "600px",
      background: "rgba(30, 30, 47, 0.95)",
      padding: "2rem",
      borderRadius: "12px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
      backdropFilter: "blur(10px)",
    },
    formGroup: {
      marginBottom: "1.5rem",
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontWeight: "bold",
      color: "#bb86fc",
      marginBottom: "0.5rem",
    },
    input: {
      padding: "0.75rem",
      fontSize: "1rem",
      borderRadius: "6px",
      border: "1px solid #444",
      backgroundColor: "#1e1e2f",
      color: "#fff",
    },
    textarea: {
      padding: "0.75rem",
      fontSize: "1rem",
      borderRadius: "6px",
      border: "1px solid #444",
      backgroundColor: "#1e1e2f",
      color: "#fff",
      resize: "vertical",
      minHeight: "100px",
    },
    button: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: "#61dafb",
      color: "#121212",
      border: "none",
      borderRadius: "6px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonDisabled: {
      backgroundColor: "#444",
      color: "#999",
      cursor: "not-allowed",
    },
    message: {
      textAlign: "center",
      marginTop: "1rem",
      fontWeight: "600",
    },
  };

  return (
    <>
      <Navbar />
      <main style={styles.container}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "1.5rem",
              color: "#61dafb",
              textShadow: "0 0 6px #61dafb",
            }}
          >
            Agregar Comentario
          </h2>

          <div style={styles.formGroup}>
            <label htmlFor="opiniones" style={styles.label}>Opiniones</label>
            <textarea
              id="opiniones"
              name="opiniones"
              value={form.opiniones}
              onChange={handleChange}
              required
              style={styles.textarea}
              placeholder="Escribe tus opiniones sobre el producto"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="informacion" style={styles.label}>Información</label>
            <textarea
              id="informacion"
              name="informacion"
              value={form.informacion}
              onChange={handleChange}
              required
              style={styles.textarea}
              placeholder="Proporciona más información sobre el comentario"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="titulo" style={styles.label}>Título</label>
            <input
              id="titulo"
              name="titulo"
              type="text"
              value={form.titulo}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Ingresa el título de la publicación"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="username" style={styles.label}>Nombre de Usuario</label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Ingresa tu nombre de usuario"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={loading ? styles.buttonDisabled : styles.button}
          >
            {loading ? "Guardando..." : "Agregar Comentario"}
          </button>

          {success && <p style={{ ...styles.message, color: "#4caf50" }}>{success}</p>}
          {error && <p style={{ ...styles.message, color: "#ff5252" }}>{error}</p>}
        </form>
      </main>
    </>
  );
};
