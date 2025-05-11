import { useState } from "react"
import { getEliminarPublicacion } from "../services/api"

export const useDeletePublicacion = () => {
  const [publicacionId, setPublicacionId] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPublicacionId(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    // Validación
    if (!publicacionId.trim()) {
      setError("Debes ingresar un ID de publicación válido.");
      setIsDeleted(false);
      return;
    }

    setLoading(true);
    setError("");
    setIsDeleted(false);

    try {
      const response = await getEliminarPublicacion(publicacionId);

      if (response.error) {
        setError("Error al eliminar la publicación.");
        setIsDeleted(false);
      } else {
        setIsDeleted(true);
        setError("");
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor.");
      setIsDeleted(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    publicacionId,
    setPublicacionId,
    isDeleted,
    error,
    loading,
    handleChange,
    handleDelete,
  };
};
