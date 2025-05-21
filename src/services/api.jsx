import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3005/blogProgramador/v1", // Ajusta según tu backend
  timeout: 5000,
  httpsAgent: false,
});


//Rutas del usuario
export const getEditUser = async (id, data) => {
    try {
      const response = await apiClient.patch(`/user/updateUser/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error al editar el usuario:", error);
      return { error: true };
    }
  }; 

export const getEditarFoto = async(id, data) =>{
    try{
      const response = await apiClient.patch(`/user/updateProfilePicture/${id}`, data);
      return response.data;
    }catch(err){
      console.error("Error al editar la foto", err);
      return {error: true}
    }
  }

export const getEditarPassword = async(id, data) =>{
    try{
      const response = await apiClient.patch(`/user/updatePassword/${id}`, data);
      return response.data;
    }catch(err){
      console.error("Error al editar la contraseña", err);
      return {error: true}
    }
  }

  //Rutas de las Publicaciones
  export const getAgregarPublicacion = async(data) =>{
    try{
      const response = await apiClient.post('/publicaciones/addPublicacion', data);
      return response.data;
    }catch(err){
      console.error("Error al agregar la publicacion", err);
      return {error: true} 
    }
  }

  export const getActualizarPublicacion = async(id, data) =>{
    try{
      const response = await apiClient.patch(`/publicaciones/updatePublicacion/${id}`, data);
      return response.data;
    }catch(err){
      console.error("Error al agregar la publicacion", err);
      return {error: true} 
    }
  }

  export const getEliminarPublicacion = async(id, data) =>{
    try{
      const response = await apiClient.delete(`/publicaciones/deletePublicacion/${id}`, data);
      return response.data;
    }catch(err){
      console.error("Error al agregar la publicacion", err);
      return {error:true}
    }
  }

    export const getListarCategoria = async ({ listarOrden }) => {
    try {
      const response = await apiClient.post('/publicaciones/listarPublicacion', {
        listarOrden 
      });
      return response.data;
    } catch (err) {
      console.error("Error al listar la publicación", err);
      return { success: false };
    }
  };

//Rutas de los comentarios
export const getAgregarComentario = async(data) =>{
  try{
    const response = await apiClient.post('/comentario/addComentario', data);
    return response.data;
  }catch(err){
    console.error("Error al listar la publicación", err);
    return { success: false };
  }
}

export const getEditarComentario = async(id, data) =>{
  try{
    const response = await apiClient.patch(`/comentario/updateComentario/${id}`, data)
    return response.data;
  }catch(err){
    console.error("Error al listar la publicación", err);
    return { success: false };
  }
}

export const getEliminarComentario = async(id, data) =>{
  try{
    const response = await apiClient.delete(`/comentario/deleteComentario/${id}`, data);
    return response.data;
  }catch(err){
    console.error("Error al listar la publicación", err);
    return { success: false };
  }
}

export const getListarComentario = async() =>{
  try{
    const response = await apiClient.get('/comentario/listarComentarios');
    return response.data;
  }catch(err){
    console.error("Error al listar la publicación", err);
    return { success: false };
  }
}