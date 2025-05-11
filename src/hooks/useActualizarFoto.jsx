import { useState } from "react";
import { getEditarFoto } from "../services/api.jsx";

export const useEditFoto = () => {
   const [id, setId] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Por favor selecciona una imagen válida.");
      setFile(null);
    }
  };

  const validateForm = () => {
    if (!id.trim()) {
      setError("Debes ingresar un ID válido.");
      return false;
    }
    if (!file) {
      setError("Debes seleccionar una imagen.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    setLoading(true);
    try {
      const response = await getEditarFoto(id, formData);

      if (response?.success === false) {
        setError("No se pudo actualizar la foto.");
      } else {
        setMessage("Foto de perfil actualizada correctamente.");
        setFile(null); // Limpiar archivo después de la actualización
        setId("");     // Limpiar ID
      }
    } catch (err) {
      console.error("Error al subir la foto:", err);
      setError(`Error al conectar con el servidor: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    id,
    setId,
    file,
    handleIdChange,
    handleFileChange,
    handleSubmit,
    loading,
    error,
    message,
  };
};
