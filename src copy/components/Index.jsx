import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../components/Index.css';

const Index = () => {

  const img = require.context('../img');
  const [productos, setProductos] = useState([]);

  const getProductos = () =>{
    axios.get("http://localhost:3001/productos").then((response)=>{
      setProductos(response.data);
    })
  }

  //Carga automática de function que obtiene los productos.
  useEffect(()=>{
    getProductos();
  },[])
  
  return (
    <>
    {
      productos !== null
      ? productos.map((producto)=>{
        return <div key={producto.Id} className='product'>
          <img
            src={img(`./${producto.Id}.jpg`)}
            className='imgProducto'
          />
          <a className='titleProducto' href={`/producto/${producto.Id}`}>{producto.Nombre}</a>
          <p className='precioProducto'>{producto.Precio}</p>
        </div>
      }): "No hay productos"
    }
    </>
  )
}

export default Index