import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import '../components/css_files/Producto.css'
import {useDatos} from './storage/CarritoDatos'
import {db, imagenes} from './storage/Firebase'
import { collection, onSnapshot, query} from 'firebase/firestore';
import { getDownloadURL, listAll, ref} from 'firebase/storage';

const Producto = () => {
    const [imagen, setImagen] = useState('')
    var[producto, setProducto] = useState([]);
    const[alert, setAlert] = useState(false)
    var[productosAgregar]= useState([])
    const params = useParams();
    const añadirProducto = useDatos((state) => state.añadirProducto);
    const imagenesRef = ref(imagenes, 'Imagenes/');
    let existe = false;
    
    //Función para guradar producto en State.
    const getProductos = () =>{
        const q = query(collection(db, 'productos'));
        const unsub = onSnapshot(q, (querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                if(doc.data() !== null && doc.data().Nombre == params.Id && existe===false){
                    existe=true;
                    setProducto(doc.data())
                    getImagenes(doc.data().Nombre)
                }
            });
        })
        getImagenes();
        return ()=>unsub();
    }

    //Función para obtener imagen y guardarla en State.
    const getImagenes= (productoNombre)=>{
       listAll(imagenesRef).then((response)=>{
            response.items.forEach((item)=>{
                 getDownloadURL(item).then((url)=>{
                    var imagenId = url.split('?', 1).toString().split('https://firebasestorage.googleapis.com/v0/b/react-ecomerce-62065.appspot.com/o/Imagenes%2F').pop();
                    if(imagenId.split('_').join(' ') == productoNombre+'.jpg'){
                        setImagen(url)
                    }
                })
            })
        })
    }

    //Función para igualar a 1 input de cantidad de arículos.
    const handleChange=(e)=>{
        if(e.target.value<1 && e.target.value.length !== 0){
            e.target.value=1
        }
    }

    //Función para añadir a carrito X cantidad de artículos por el cliente.
    const handleCarrito = (e)=>{
        var cantidadProductos = document.getElementById('cantidadProductos').value;
        productosAgregar = [...Array(+cantidadProductos).fill(producto)]
        añadirProducto(productosAgregar);
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 2000);
    }

    useEffect(()=>{
        getProductos();
        getImagenes();
    },[])

  return (
    <>
    {
        alert === true
        ? 
        <div className='alertaAgregado'>
            <p>Producto agregado al carrito</p>
        </div>
        :''
    }
    <div className='producto'>
        {
           producto !== null
           ? 
           <div className='producto'>
                <img className='imagen' src={imagen}/>
                <div className='textoProducto'>
                    <h2 className='tituloProducto'>{producto.Nombre}</h2>
                    <p className='descripcionProducto'>{producto.Descripcion}</p>
                    <h5 className='precioProducto'>Precio: ₡{producto.Precio}</h5>
                    <p className='cantidadProductos'>Cantidad: <input type='number' defaultValue='1' min='1' max='100' onChange={e=> handleChange(e)} id='cantidadProductos'/></p>
                    <br/>
                    <button className='botonCarrito' onClick={handleCarrito}>Agregar al carrito</button>
                </div>
           </div>
           :" No hay productos"
        }
    </div>
    </>
  )
}

export default Producto