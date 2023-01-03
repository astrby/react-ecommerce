import React, { useEffect } from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import '../components/css_files/NB.css'
import {useDatos} from './storage/CarritoDatos'
import {useDatosUsuario} from '../components/UsuariosDatos'
import { useState } from 'react'

const NB = () => {
  const carrito = useDatos((state) => state.carrito)
  const usuarioDatos = useDatosUsuario((state) => state.usuario)
  const borrarUsuario = useDatosUsuario((state) => state.cerrarSesion)
  var añadirUsuario = useDatosUsuario((state)=> state.añadirUsuario);
  const [usuarioNombre, setUsuarioNombre]= useState('')
  const [usuarioCorreo, setUsuarioCorreo]= useState('')
  
  //Función para eliminar datos almacenados en localStorage del usuario.
  const cerrarSesion = ()=>{
    borrarUsuario();
  }

  useEffect(()=>{
    //Se setea al nombre de usuario cuando se inicia sesión.
    setUsuarioNombre('Iniciar Sesión')
   usuarioDatos.map((u)=>{
    if(u !== null){
      setUsuarioNombre(u.Nombre)
      setUsuarioCorreo(u.Email)
    }
   })
  })

  return (
    <>
    <nav className='menu'>
       <ul className='navBarra'>
       <a className='titleNav' href="/"><img src='logo.png'></img><h4 >TechnoShop</h4></a>
          <li className='contactoNav'><a href="/contacto">Contacto</a></li>
          <li className='carritoNav'>
            <a href="/carrito" 
            ><AiOutlineShoppingCart className='carritoItems'/>{carrito.length}</a>
          </li>
          {
            //Si hay un usuario con sesión iniciada se muestran opciones.
            usuarioNombre !== 'Iniciar Sesión' 
            ?
            (<li className='loginNav'>
              <div className='dropdown'>
                <span className='login' >{usuarioNombre}</span>
                <div className='dropdownContenido'>
                <a href='/Compras' >Mis Compras</a>
                <br/>
                  <a href='/' onClick={cerrarSesion}>Cerrar Sesión</a>
                </div>
              </div>
            </li>)
            : (<li className='loginNav'><a className='login' href="/login">Iniciar Sesión</a></li>)
          }
          <br/>
        </ul>
      </nav>
      </>
  )
}

export default NB