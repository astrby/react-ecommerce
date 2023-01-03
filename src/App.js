import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Index from './components/Index';
import NB from './components/NB';
import Contacto from './components/Contacto';
import Producto from './components/Producto';
import Carrito from './components/Carrito';
import Login from './components/user/Login'
import Registro from './components/user/Registro'
import SubirProducto from './components/SubirProducto';
import Compras from './components/Compras';

function App() {
  return (
    <div className="App">
      <NB></NB>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index></Index>}></Route>
          <Route path='/contacto' element={<Contacto></Contacto>}></Route>
          <Route path='/producto/:Id' element={<Producto></Producto>}></Route>
          <Route path='/carrito' element={<Carrito></Carrito>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/registro' element={<Registro></Registro>}></Route>
          <Route path='/subirproducto' element={<SubirProducto></SubirProducto>}></Route>
          <Route path='/compras' element={<Compras></Compras>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
