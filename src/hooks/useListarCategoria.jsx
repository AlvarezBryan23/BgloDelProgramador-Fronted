import { useState, useEffect, useCallback } from "react";
import { getListarCategoria } from "../services/api";

const CATEGORIAS_VALIDAS = ["tics", "tecnologia", "taller"];

// ✅ Función nativa para formatear la fecha en zona horaria de Guatemala
const formatFecha = (fechaISO) => {
  if (!fechaISO) return "Fecha no disponible";

  try {
    const fecha = new Date(fechaISO);
    return new Intl.DateTimeFormat("es-GT", {
      timeZone: "America/Guatemala",
      weekday: "short",     // ej. sáb
      year: "numeric",      // ej. 2025
      month: "short",       // ej. may
      day: "numeric",       // ej. 10
      hour: "2-digit",      // ej. 17
      minute: "2-digit",    // ej. 20
      hour12: false         // formato 24 horas
    }).format(fecha);
  } catch (error) {
    console.error("Error al formatear la fecha:", error);
    return "Fecha inválida";
  }
};

export const useListarCategoria = (categoriaSeleccionada) => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPublicaciones = useCallback(async () => {
    const categoria = categoriaSeleccionada?.toLowerCase();

    if (!CATEGORIAS_VALIDAS.includes(categoria)) {
      setError("Selecciona una categoría válida.");
      setPublicaciones([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getListarCategoria({ listarOrden: categoria });
      const publicacionesArray = response?.publicaciones ?? [];

      if (response.success && Array.isArray(publicacionesArray)) {
        const publicacionesFormateadas = publicacionesArray.map((pub) => ({
          ...pub,
          formattedEntryDate: formatFecha(pub.entryDate), // ✅ Se aplica el formateador
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
  }, [categoriaSeleccionada]);

  useEffect(() => {
    if (categoriaSeleccionada) {
      fetchPublicaciones();
    }
  }, [categoriaSeleccionada, fetchPublicaciones]);

  return {
    publicaciones,
    loading,
    error,
    refetch: fetchPublicaciones,
  };
};