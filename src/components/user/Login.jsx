import React,{useState} from 'react'
import '../css_files/Login.css'
import {db} from '../storage/Firebase'
import { collection, onSnapshot, query} from 'firebase/firestore';
import {useDatosUsuario} from '../UsuariosDatos'
import {useNavigate} from 'react-router-dom'

const Login = () => {

  var añadirUsuario = useDatosUsuario((state)=> state.añadirUsuario);
  const navigate = useNavigate();
  const[alertLogin, setAlertLogin] = useState(false)
  const[enBlanco, setEnBlanco] = useState(false)

  const getUsuarios = () =>{
    var email = document.getElementById('email').value;
    var contraseña = document.getElementById('contraseña').value;
    const q = query(collection(db, 'usuarios'));
    let correoExiste = false;

    if(email.length === 0  || contraseña.length === 0){
      setEnBlanco(true)
            setTimeout(() => {
                setEnBlanco(false)
            }, 2000);
    }else{
      const unsub = onSnapshot(q, (querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          if(email === doc.data().Email && contraseña === doc.data().Contraseña && correoExiste===false){
            añadirUsuario(doc.data())
            navigate('/');
            correoExiste = true;
          }
          else if(correoExiste===false){
            setAlertLogin(true)
            setTimeout(() => {
              setAlertLogin(false)
            }, 2000);
          }
        });
      })
    
      return ()=>unsub();
    }
  }

  return (
    <>
      {
        enBlanco === true
        ?
        <div className='alertLogin'>
            <p>Todos los campos deben llenarse</p>
        </div>:alertLogin === true
          ? 
          <div className='alertLogin'>
              <p>No se ha encontrado al usuario</p>
          </div>
          :''
      }
      <div className='loginForm'>
          <p>Correo electrónico</p>
          <input type='text' id='email'/>
          <p>Contraseña</p>
          <input type='text' id='contraseña'></input>
          <br/>
          <button onClick={getUsuarios}>Ingresar</button>
          <br/>
          <a href='/registro'>Registrarse</a>
      </div>
    </>
  )
}

export default Login