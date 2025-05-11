import { useState } from "react"
import { getEliminarComentario } from "../services/api"

export const useEliminarComentario = () => {
  const [comentarioId, setComentarioId] = useState(""); // Guardamos el ID del comentario
  const [deleted, setDeleted] = useState(false); // Estado para saber si el comentario fue eliminado
  const [error, setError] = useState(""); // Estado para manejar posibles errores

  // Maneja el cambio en el ID del comentario
  const handleChange = (e) => {
    setComentarioId(e.target.value); // Actualiza el estado con el ID del comentario
  };

  // Maneja la eliminación del comentario
  const handleDelete = async (e) => {
    e.preventDefault();

    // Verifica si el ID del comentario es válido
    if (!comentarioId.trim()) {
      setError("Debes ingresar un ID válido.");
      setDeleted(false);
      return;
    }

    try {
      // Llamada al servicio para eliminar el comentario usando el ID
      const response = await getEliminarComentario(comentarioId);

      // Verifica si la respuesta contiene un error
      if (response.error) {
        setError("Hubo un error al eliminar el comentario.");
        setDeleted(false);
      } else {
        setDeleted(true); // Marca el comentario como eliminado
        setError(""); // Limpiar cualquier mensaje de error
      }
    } catch (err) {
      console.error("Error al eliminar el comentario:", err);
      setError("Error al conectar con el servidor.");
      setDeleted(false);
    }
  };

  return {
    comentarioId,
    setComentarioId,
    deleted,
    error,
    handleChange,
    handleDelete,
  };
};
