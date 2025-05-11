import { useState } from "react";
import { getActualizarPublicacion } from "../services/api";// asegúrate que este método exista y funcione

const CATEGORIAS_PERMITIDAS = ["TICS", "TALLER", "TECNOLOGIA"];

export const useActualizarPublicacion = () => {
  const [form, setForm] = useState({
    id: "",
    titulo: "",
    textoPrincipal: "",
    categoria: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { id, titulo, textoPrincipal, categoria } = form;

    if (!id.trim() || id.includes(":")) {
      setError("Debes ingresar un ID válido para la publicación.");
      return false;
    }

    if (!titulo.trim()) {
      setError("El título es obligatorio.");
      return false;
    }

    if (!textoPrincipal.trim()) {
      setError("El texto principal es obligatorio.");
      return false;
    }

    const categoriaMayus = categoria.trim().toUpperCase();
    if (!CATEGORIAS_PERMITIDAS.includes(categoriaMayus)) {
      setError("Categoría inválida. Solo se permiten: TICS, TALLER, TECNOLOGIA.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const categoriaMayus = form.categoria.trim().toUpperCase();

      const response = await getActualizarPublicacion(form.id, {
        titulo: form.titulo.trim(),
        textoPrincipal: form.textoPrincipal.trim(),
        categoria: categoriaMayus,
      });

      if (response?.error) {
        setError("No se pudo actualizar la publicación.");
      } else {
        setMessage("Publicación actualizada correctamente.");
      }
    } catch (err) {
      console.error("Error al actualizar la publicación:", err);
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
