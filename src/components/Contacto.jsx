import React, {useState} from 'react'
import '../components/css_files/Contacto.css'
import Form from 'react-bootstrap/Form'
import emailjs from 'emailjs-com'

const Contacto = () => {

  const[alertaMensajeError, setAlertaMensajeError] = useState(false)
  const[alertaMensajeEnviado, setAlertaMensajeEnviado] = useState(false)

  //Función para enviar email al servicio emailJS.
  const sendEmail = (e)=>{
    e.preventDefault();
    var nombre = document.getElementById('nombre').value
    var email = document.getElementById('email').value
    var telefono = document.getElementById('telefono').value
    var mensaje = document.getElementById('mensaje').value

    if(!nombre || !email || !telefono || !mensaje){
      setAlertaMensajeError(true)
      setTimeout(() => {
        setAlertaMensajeError(false)
        }, 2000);
    }else{
      emailjs.sendForm(process.env.REACT_APP_EMAILSERVICE, process.env.REACT_APP_EMAILTEMPLATE, e.target, process.env.REACT_APP_EMAILAPIKEY)
      setAlertaMensajeEnviado(true)
      setTimeout(() => {
        setAlertaMensajeEnviado(false)
        }, 2000);
    }
  }

  return (
    <>
      {
          alertaMensajeError === true
          ? 
          <div className='alertaMensajeError'>
              <p>Todos los campos deben llenarse</p>
          </div>
          : 
          alertaMensajeEnviado === true
          ? <div className='alertaMensajeEnviado'>
          <p>Mensaje enviado</p>
      </div>: ''
      }
    <Form className='contacto' onSubmit={sendEmail}>
      <h4 className='contactoTitle'>Contacto</h4>
      <h6>Para sugerencias, puede enviar un mensaje en el siguiente apartado.</h6>
      <br/>
      <p>Nombre</p>
      <input type='text' name='nombre' id='nombre'></input>
      <p>Correo electrónico</p>
      <input type='text' name='email' id='email'></input>
      <p>Teléfono</p>
      <input className='telefonoContacto' type='number' maxLength='8' name='telefono' id='telefono'></input>
      <p>Escriba su mensaje</p>
      <textarea className='mensajeContacto' type='text' name='mensaje' id='mensaje'></textarea>
      <br/>
      <button>Enviar</button>
    </Form>
    </>
  )
}

export default Contacto