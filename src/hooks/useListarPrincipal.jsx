import { useState, useEffect, useCallback } from "react";
import { getListarCategoria } from "../services/api"

// Función reutilizable para formatear la fecha
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
      hour12: false,
    }).format(fecha);
  } catch {
    return "Fecha inválida";
  }
};

export const useListarPrincipal = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodas = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // ✅ NO se envía listarOrden => backend devolverá todas las publicaciones
      const response = await getListarCategoria({
        limit: 50,
        from: 0
      });

      const publicacionesArray = response?.publicaciones ?? [];

      if (response.success && Array.isArray(publicacionesArray)) {
        const publicacionesFormateadas = publicacionesArray.map((pub) => ({
          ...pub,
          formattedEntryDate: formatFecha(pub.entryDate),
        }));
        setPublicaciones(publicacionesFormateadas);
      } else {
        setError("No se encontraron publicaciones.");
        setPublicaciones([]);
      }
    } catch (err) {
      console.error("Error al obtener publicaciones:", err);
      setError("Error de conexión con el servidor.");
      setPublicaciones([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodas();
  }, [fetchTodas]);

  return {
    publicaciones,
    loading,
    error,
    refetch: fetchTodas,
  };
};