import { useState } from "react"
import { getEditarComentario } from "../services/api"

export const useEditarComentarios = () => {
  const [form, setForm] = useState({
    id: "", // Campo para el ID del comentario
    opiniones: "",
    informacion: "",
    publicacion: "", // El título de la publicación, usado como identificador
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Maneja los cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validación básica del formulario
  const validateForm = () => {
    const { opiniones, informacion, publicacion, id } = form;

    // Validación de los campos
    if (!opiniones.trim()) {
      setError("Las opiniones son obligatorias.");
      return false;
    }

    if (!informacion.trim()) {
      setError("La información es obligatoria.");
      return false;
    }

    if (!publicacion.trim()) {
      setError("El título de la publicación es obligatorio.");
      return false;
    }

    if (!id.trim()) {
      setError("El ID del comentario es obligatorio.");
      return false;
    }

    return true;
  };

  // Enviar los datos del comentario actualizado
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await getEditarComentario(form.id, {
        opiniones: form.opiniones.trim(),
        informacion: form.informacion.trim(),
        publicacion: form.publicacion.trim(),
      });

      if (response?.error) {
        setError("No se pudo editar el comentario.");
      } else {
        setMessage("Comentario actualizado correctamente.");
      }
    } catch (err) {
      console.error("Error al editar el comentario:", err);
      setError("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    handleChange,
    handleSubmit,
    loading,
    error,
    message,
  };
};
