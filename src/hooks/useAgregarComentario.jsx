import { useState } from "react"
import { getAgregarComentario } from "../services/api"

export const useAgregarComentario = () => {
  const [loading, setLoading] = useState(false);

  const agregarComentario = async (comentarioData, onSuccess, onError) => {
    setLoading(true);

    try {
      // Se manda el comentario con los campos: opiniones, informacion, titulo, username
      const response = await getAgregarComentario(comentarioData);

      if (response.error) {
        if (onError) onError("Error al agregar el comentario.");
      } else {
        if (onSuccess) onSuccess(response.data);
      }
    } catch (error) {
      if (onError) onError("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return {
    agregarComentario,
    loading,
  };
};
