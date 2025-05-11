import { useState } from 'react';
import { getEditarPassword } from '../services/api'

export const useActualizarPassword = () => {
  const [id, setId] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleIdChange = (e) => setId(e.target.value);
  const handleOldPasswordChange = (e) => setOldPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);

  const validateForm = () => {
    if (!id.trim()) {
      setError("Debes ingresar un ID válido.");
      return false;
    }
    if (!oldPassword.trim() || !newPassword.trim()) {
      setError("Debes ingresar ambas contraseñas.");
      return false;
    }
    if (oldPassword === newPassword) {
      setError("La nueva contraseña no puede ser igual a la anterior.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!validateForm()) return;

    const body = {
      oldPassword,
      newPassword,
    };

    setLoading(true);
    try {
      const response = await getEditarPassword(id, body);

      if (response?.success === false) {
        setError(response.message || "No se pudo actualizar la contraseña.");
      } else {
        setMessage("Contraseña actualizada correctamente.");
        setId("");
        setOldPassword("");
        setNewPassword("");
      }
    } catch (err) {
      console.error("Error al actualizar la contraseña:", err);
      setError(`Error al conectar con el servidor: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    id,
    oldPassword,
    newPassword,
    handleIdChange,
    handleOldPasswordChange,
    handleNewPasswordChange,
    handleSubmit,
    loading,
    error,
    message,
  };
};
