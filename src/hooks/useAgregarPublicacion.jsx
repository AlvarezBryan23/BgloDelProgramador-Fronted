import { useState } from "react";
import { getAgregarPublicacion } from "../services/api";

const CATEGORIAS_PERMITIDAS = ["TECNOLOGIA", "TALLER", "TICS"];

export const useAgregarPublicacion = () => {
  const [loading, setLoading] = useState(false);

  /**
   * Envía una publicación al servidor si los datos son válidos
   * @param {Object} form - Datos del formulario { titulo, categoria, textoPrincipal, username }
   * @param {Function} onSuccess - Callback en caso de éxito
   * @param {Function} onError - Callback en caso de error
   */
  const registerPost = async (form, onSuccess, onError) => {
    setLoading(true);

    try {
      // Validar categoría
      const categoria = form.categoria?.toUpperCase();
      if (!CATEGORIAS_PERMITIDAS.includes(categoria)) {
        onError?.("Categoría inválida. Solo se permiten: TECNOLOGIA, TALLER, TICS.");
        return;
      }

      // Verificar que el campo 'username' no esté vacío
      if (!form.username) {
        onError?.("El nombre de usuario es obligatorio.");
        return;
      }

      // Realizar solicitud al servidor (ahora pasamos username en lugar de email)
      const response = await getAgregarPublicacion({ ...form, categoria });

      // Manejo de la respuesta
      if (!response.success) {
        onError?.(response.message || "Error al registrar la publicación.");
      } else {
        onSuccess?.(response.publicacion);
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