import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import '../components/Producto.css'

const Producto = () => {

    const imagen = require.context('../img');
    const [productos, setProductos] = useState([]);
    const[producto, setProducto] = useState('')
    const params = useParams();

    const getProductos = () =>{
        axios.get("http://localhost:3001/productos").then((response)=>{
            setProductos(response.data);
        })
    }

    useEffect(()=>{
        getProductos();

        productos.map((p)=>{
            if(p.Id.toString() === params.Id){
                setProducto(p)
            }
        })
    })

  return (
    <div className='producto'>
        {
           producto !== null
           ? 
           <div className='producto'>
                <img src={`/img/${producto.Id}.jpg`} className='imagen'/>
                <div className='textoProducto'>
                    <p>{producto.Nombre}</p>
                    <p>{producto.Descripcion}</p>
                    <p>{producto.Precio}</p>

                </div>
           </div>
           :" No hay productos"
        }
    </div>
  )
}

export default Producto