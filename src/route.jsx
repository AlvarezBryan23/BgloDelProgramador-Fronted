import { EditUser } from "./components/usuarios"
import { ActualizarFoto } from "./components/usuarios"
import { EditarPassword } from "./components/usuarios"
import { AgregarPublicacion } from "./components/publicaciones"
import { Home } from "./services/Home"
import { EditarPublicacion } from "./components/publicaciones"
import { EliminarPublicacion } from "./components/publicaciones"
import { ListarCategoria } from "./components/publicaciones"
import { AgregarComentario } from "./components/comentarios"
import { EditarComentarios } from "./components/comentarios"
import { EliminarComentario } from "./components/comentarios"
import { ListarComentarios } from "./components/comentarios"

export const routes = [
    { path: '/', element: <Home /> }, 
    //Usuarios
    {path: '/edit', element: <EditUser/>},
    {path: '/editFoto', element: <ActualizarFoto/>},
    {path: '/editPassword', element: <EditarPassword/>},
    //Publicaciones
    {path: '/agregarPublicacion', element: <AgregarPublicacion/>},
    {path: '/editarPublicacion', element: <EditarPublicacion/>},
    {path: '/eliminarPublicacion', element: <EliminarPublicacion/>},
    {path: '/listarCategoria', element: <ListarCategoria/>},
    //Comentarios
    {path: '/addComentario', element: <AgregarComentario/>},
    {path: '/editComentario', element: <EditarComentarios/>},
    {path: '/deleteComentario', element: <EliminarComentario/>},
    {path: '/listarComentario', element: <ListarComentarios/>}
]