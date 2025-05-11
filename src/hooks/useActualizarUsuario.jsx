import { useState } from "react";
import { getEditUser } from "../services/api"

export const useEditUser = () => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    surname: "",
    username: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    if (!form.id.trim() || form.id.includes(":")) {
      setError("Debes ingresar un ID válido.");
      return false;
    }
    if (!form.name.trim()) {
      setError("El nombre es obligatorio.");
      return false;
    }
    if (!form.surname.trim()) {
      setError("El apellido es obligatorio.");
      return false;
    }
    if (!form.username.trim()) {
      setError("El nombre de usuario es obligatorio.");
      return false;
    }
    if (!form.email.trim() || !form.email.includes("@")) {
      setError("Correo electrónico no válido.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      console.log("Editando usuario con ID:", form.id);
      console.log("Datos:", form);

      const response = await getEditUser(form.id, {
        name: form.name,
        surname: form.surname,
        username: form.username,
        email: form.email,
      });

      if (response?.error) {
        setError("No se pudo actualizar el usuario.");
      } else {
        setMessage("Usuario actualizado correctamente.");
      }
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
      setError("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    handleChange,
    handleSubmit,
    loading,
    error,
    message,
  };
};