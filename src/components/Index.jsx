import React, { useEffect, useState } from 'react'
import '../components/css_files/Index.css';
import {db, imagenes} from './storage/Firebase'
import { collection, onSnapshot, query} from 'firebase/firestore';
import { getDownloadURL, listAll, ref} from 'firebase/storage';

const Index = () => {

  const [productos, setProductos] = useState([]);
  const [imagenesList, setImagenesList] = useState([])
  const imagenesRef = ref(imagenes, 'Imagenes/')

  //Función para obtener los productos e ingresarlos a array.
  const getProductos = () =>{
    const q = query(collection(db, 'productos'));
    const unsub = onSnapshot(q, (querySnapshot)=>{
      let productosArray = [];
      querySnapshot.forEach((doc)=>{
        productosArray.push({...doc.data(), id: doc.id})
        setProductos(productosArray);
      });
    })
    return ()=>unsub();
  }

  //Función para obtener imágenes e ingresarlas a State.
  const getImagenes=()=>{
    listAll(imagenesRef).then((response)=>{
      response.items.forEach((item)=>{
        getDownloadURL(item).then((url)=>{
          setImagenesList((lista)=>[...lista, url])
        })
      })
    })
  }

  //Carga automática de function que obtiene los productos.
  useEffect(()=>{
    getProductos();
    getImagenes();
  },[])
  return (
    <>
    <h4 className='tituloProductos'>Productos disponibles</h4>
    {
      productos !== null
      ? 
      productos.map((producto,i)=>{
        var cantImagenes=0;
        //Se imprime cada producto con imagen.
        return <div key={i} className='product'>
          {
            imagenesList.map((imagen, j)=>{
              var imagenId = imagen.split('?', 1).toString().split('https://firebasestorage.googleapis.com/v0/b/react-ecomerce-62065.appspot.com/o/Imagenes%2F').pop();

              if(imagenId.split('_').join(' ') == producto.Nombre+'.jpg' && cantImagenes<1){
                cantImagenes=cantImagenes+1;
                return <a key={j} href={`/producto/${producto.Nombre}`}> <img key={i} src={imagen}/></a>
              }
            })
          }
          <a className='titleProducto' href={`/producto/${producto.Nombre}`}>{producto.Nombre}</a>
          <p className='precioProducto'>Precio: ₡{producto.Precio}</p>
        </div>
      }): "No hay productos"
    }
    </>
  )
}

export default Index