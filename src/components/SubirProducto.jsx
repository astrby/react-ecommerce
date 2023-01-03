import React,{useState} from 'react'
import {db, imagenes} from './storage/Firebase'
import { ref,uploadBytes } from 'firebase/storage';
import { collection, onSnapshot, query, addDoc} from 'firebase/firestore';
import '../components/css_files/SubirProducto.css'

const SubirProducto = () => {

    const[alertProductoSuccess, setAlertProductoSuccess] = useState(false)
    const[alertProductoError, setAlertProductoError] = useState(false)
    const[enBlanco, setEnBlanco] = useState(false)
    const[imagen, setImagen]= useState([])

    const subirProducto= ()=>{
        var nombreProducto=document.getElementById('nombreProducto').value
        var descripcionProducto=document.getElementById('descripcionProducto').value
        var precioProducto=document.getElementById('precioProducto').value
        const imagenRef = ref(imagenes,`Imagenes/${nombreProducto.split(' ').join('_')}.jpg`)
        let subido = false;

        const usersCollectionRef = query(collection(db, 'productos'));
        if(nombreProducto.length === 0 || descripcionProducto.length === 0 || precioProducto.length === 0){
            setEnBlanco(true)
            setTimeout(() => {
                setEnBlanco(false)
            }, 2000);
            
        }else{
            const unsub = onSnapshot(usersCollectionRef, (querySnapshot)=>{
                querySnapshot.forEach((doc)=>{
                    if(doc.data().Nombre===nombreProducto){
                        subido=true;
                        setAlertProductoError(true)
                        setTimeout(() => {
                            setAlertProductoError(false)
                        }, 2000);
                    }
                })
                if(subido===false){
                    addDoc(usersCollectionRef,{Nombre: nombreProducto, Descripcion: descripcionProducto, Precio: precioProducto});
                    uploadBytes(imagenRef, imagen);
                    setAlertProductoSuccess(true)
                    setTimeout(() => {
                        setAlertProductoSuccess(false)
                    }, 2000);
            }
            })
            
            return ()=>unsub();
        }
    }

  return (
    <>
    {
        enBlanco === true
        ?
        <div className='alertLoginError'>
            <p>Todos los campos deben llenarse</p>
        </div>: alertProductoSuccess=== true
        ? 
        <div className='alertLoginSuccess'>
            <p>Producto subido correctamente</p>
        </div>
        :alertProductoError === true
        ? 
        <div className='alertLoginError'>
            <p>El nombre del producto ya existe</p>
        </div>:''
    }
        <div className='subirProductoForm'>
            <p>Nombre del producto</p>
            <input type='text' id='nombreProducto'></input>
            <br/>
            <p>Descripción del producto</p>
            <input type='text' id='descripcionProducto'></input>
            <br/>
            <p>Precio</p>
            <input type='number' id='precioProducto'></input>
            <br/>
            <p>Imagen del producto</p>
            <input type='file' onChange={(e)=>{setImagen(e.target.files[0])}} id='imagenProducto'></input>
            <br/>
            <button onClick={subirProducto}>Subir producto</button>
        </div>
    </>
  )
}

export default SubirProducto