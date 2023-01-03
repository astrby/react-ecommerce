import React from 'react'
import { useEffect } from 'react'
import {useDatosUsuario} from '../components/UsuariosDatos'
import {collection, query, onSnapshot} from 'firebase/firestore'
import {db} from './storage/Firebase'
import { useState } from 'react'
import '../components/css_files/Compra.css'

const Compras = () => {

    const usuarioDatos = useDatosUsuario((state) => state.usuario)
    var[facturas, setFacturas] = useState([])
    const q = query(collection(db, 'facturas'))
    
    useEffect(()=>{
        const unsub = onSnapshot(q, (querySnapshot)=>{
            let facturasArray =[]
            querySnapshot.forEach((doc)=>{
                if(usuarioDatos[0].Email === doc.data().correo){
                    facturasArray.push({...doc.data(), id: doc.id})
                    setFacturas(facturasArray)
                }
            })
        })
        return() =>unsub();
    },[])

  return (
    <div>
        {
            facturas !== null

            ? facturas.map((factura, i)=>{
                return <div key={i} className='factura'>
                    <h3>Factura {i+1}</h3>
                    <h5>Artículos</h5>
                    {
                        factura.Artículos.map((articulo, j)=>{
                            return <div key={j}>
                                <p>Artículo: {articulo.Nombre}</p>
                                <p>Precio: ₡{articulo.Precio}</p>
                                <br/>
                            </div>
                        })
                    }
                    <h5>Total</h5>
                    <p>Total: ₡{factura.PrecioTotal}</p>
                    <br/>
                </div>
                
            }) : ''
        }
    </div>
  )
}

export default Compras