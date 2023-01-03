import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Index from './components/Index';
import NB from './components/NB';
import Contacto from './components/Contacto';
import Producto from './components/Producto';

function App() {
  return (
    <div className="App">
      <NB></NB>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index></Index>}></Route>
          <Route path='/contacto' element={<Contacto></Contacto>}></Route>
          <Route path='/producto/:Id' element={<Producto></Producto>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
