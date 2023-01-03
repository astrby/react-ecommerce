import React,{seState} from 'react'
import {db} from '../storage/Firebase'
import { collection, onSnapshot, query, addDoc} from 'firebase/firestore';
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import '../css_files/Registro.css'

const Registro = () => {
    const navigate = useNavigate();
    const usersCollectionRef = collection(db, 'usuarios')
    const[alertLoginSuccess, setAlertLoginSuccess] = useState(false)
    const[alertLoginError, setAlertLoginError] = useState(false)
    const[enBlanco, setEnBlanco] = useState(false)

    const registrar= ()=>{
        
        var email = document.getElementById('email').value
        var nombre = document.getElementById('nombre').value
        var contraseña = document.getElementById('contraseña').value
        let correoExiste = false;
        if(email.length === 0 || nombre.length === 0 || contraseña.length === 0){
            setEnBlanco(true)
            setTimeout(() => {
                setEnBlanco(false)
            }, 2000);
            
        }else{
            const unsub = onSnapshot(usersCollectionRef, (querySnapshot)=>{
                querySnapshot.forEach((doc)=>{
                    if(email === doc.data().Email){
                        correoExiste=true
                        setAlertLoginError(true)
                        setTimeout(() => {
                            setAlertLoginError(false)
                        }, 2000);
                    }
                });
                if(correoExiste===false){ 
                    addDoc(usersCollectionRef, {Email: email, Nombre: nombre, Contraseña: contraseña})
                    setAlertLoginSuccess(true)
                    setTimeout(() => {
                        setAlertLoginSuccess(false)
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
        </div>: alertLoginSuccess === true
        ? 
        <div className='alertLoginSuccess'>
            <p>Usuario registrado correctamente. Ya puede iniciar sesión</p>
        </div>
        :alertLoginError === true
        ? 
        <div className='alertLoginError'>
            <p>El correo electrónico ya se encuentra registrado</p>
        </div>:''
    }
    <div className='signUpForm'>
        <p>Correo electrónico</p>
        <input type='text' id='email'/>
        <p>Nombre de usuario</p>
        <input type='text' id='nombre'></input>
        <p>Contraseña</p>
        <input type='text' id='contraseña'></input>
        <br/>
        <button onClick={registrar}>Registrar</button>
    </div>
    </>
  )
}

export default Registro