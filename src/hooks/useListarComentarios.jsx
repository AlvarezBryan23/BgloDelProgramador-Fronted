import { useState, useEffect, useCallback } from "react";
import { getListarComentario } from "../services/api"

const formatFecha = (fechaISO) => {
  if (!fechaISO) return "Fecha no disponible";

  try {
    const fecha = new Date(fechaISO);
    return new Intl.DateTimeFormat("es-GT", {
      timeZone: "America/Guatemala",
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).format(fecha);
  } catch (error) {
    console.error("Error al formatear la fecha:", error);
    return "Fecha inválida";
  }
};

export const useListarComentarios = (limit = 10, from = 0) => {
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchComentarios = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getListarComentario(limit, from);

      const comentariosArray = response?.comentarios ?? [];

      if (response.success && Array.isArray(comentariosArray)) {
        const comentariosFormateados = comentariosArray.map((comentario) => ({
          ...comentario,
          formattedEntryDate: formatFecha(comentario.entryDate)
        }));

        setComentarios(comentariosFormateados);
        setTotal(response.total || 0);
      } else {
        setComentarios([]);
        setTotal(0);
        setError("No se encontraron comentarios.");
      }
    } catch (err) {
      console.error("Error al obtener comentarios:", err);
      setComentarios([]);
      setTotal(0);
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  }, [limit, from]);

  useEffect(() => {
    fetchComentarios();
  }, [fetchComentarios]);

  return {
    comentarios,
    loading,
    error,
    total,
    refetch: fetchComentarios
  };
};
