import { Navbar } from '../components/navs/Navbar.jsx'
import { ListarPrincipal } from '../components/publicaciones/ListarPrincipal.jsx'

export const Home = () => {
  return (
    <main className='min-h-screen flex flex-col'>
        <Navbar/>
        <ListarPrincipal/>
          
    </main>
  )
}