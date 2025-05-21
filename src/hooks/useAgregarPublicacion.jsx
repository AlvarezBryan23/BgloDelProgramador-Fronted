import { useState } from "react";
import { getAgregarPublicacion } from "../services/api";

const CATEGORIAS_PERMITIDAS = ["TECNOLOGIA", "TALLER", "PRACTICA SUPERVISADA"];

export const useAgregarPublicacion = () => {
  const [loading, setLoading] = useState(false);

  const registerPost = async (form, onSuccess, onError) => {
    setLoading(true);

    try {
      const categoria = form.categoria?.toUpperCase();

      if (!CATEGORIAS_PERMITIDAS.includes(categoria)) {
        onError?.("Categoría inválida. Solo se permiten: TECNOLOGIA, TALLER, PRACTICA SUPERVISADA.");
        return;
      }

      if (!form.username?.trim()) {
        onError?.("El nombre de usuario es obligatorio.");
        return;
      }

      const response = await getAgregarPublicacion({ ...form, categoria });

      if (response?.success) {
        onSuccess?.(response.publicacion);
      } else {
        onError?.(response.message || "Error al registrar la publicación.");
      }
    } catch (error) {
      onError?.("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return {
    registerPost,
    loading,
  };
};