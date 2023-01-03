import React, {useEffect, useState } from "react";
import "../components/css_files/Carrito.css";
import {useDatos} from './storage/CarritoDatos'
import {useDatosUsuario} from '../components/UsuariosDatos'
import {imagenes, db} from './storage/Firebase'
import {addDoc, collection} from 'firebase/firestore'
import { getDownloadURL, listAll, ref} from 'firebase/storage';
import {useNavigate} from 'react-router-dom'

const Carrito = () => {
  var [carrito] = useState ([]);
  var [total] = useState(0);
  var arrayCantProductos = [];
  var cantProductos = 0;
  var productos = 0;
  var carritoDatos = useDatos((state)=> state.carrito);
  var nuevoCarrito = useDatos((state)=> state.nuevoCarrito);
  const [imagenesList, setImagenesList] = useState([])
  const imagenesRef = ref(imagenes, 'Imagenes/')
  const usersCollectionRef = collection(db, 'facturas')
  const usuarioDatos = useDatosUsuario((state) => state.usuario)
  const[alertCompra, setAlertCompra] = useState(false)
  const[alertLogin, setAlertLogin] = useState(false)

  //Se mapean los valores con Id único para retornarlos.
  const mapCarrito = new Map(
    carritoDatos.map((carrito) => [carrito.Nombre, carrito])
  );
  const unicoCarrito = [...mapCarrito.values()];

//Se pasan variables de cantidad e Id para sobreescribir carrito.
  const handleChange = (e, Nombre) => {
    if(e.target.value.length !== 0){
      var y = 0;

      //For Loop para disminuir cantidad
      for(let i=0; i<carritoDatos.length; i++){
        if(carritoDatos[i].Nombre===Nombre){
          y = y+1;
        }
        //Eliminar articulos para un nuevo array.
        if(y<=e.target.value ||  carritoDatos[i].Nombre !==Nombre){
          carrito= [...carrito, carritoDatos[i]]
        }
      }

      //For loop para añadir artículos al carrito.
      for(let i=0; i<carritoDatos.length; i++){
        if(carritoDatos[i].Nombre===Nombre && e.target.value> y){
          var v = +e.target.value-y
          carrito = [...carrito, ...Array(v).fill(carritoDatos[i])]
          break;
        }
      }
      //Nuevo array con artículos actualizados.
      nuevoCarrito(carrito);
      window.location.reload(false);
    }   
  }

  const getImagenes=()=>{
    listAll(imagenesRef).then((response)=>{
      response.items.forEach((item)=>{
        getDownloadURL(item).then((url)=>{
          setImagenesList((lista)=>[...lista, url])
        })
      })
    })
  }

  const pagar = async()=>{
    if(usuarioDatos.length === 0){

      setAlertLogin(true)
      setTimeout(() => {
            setAlertLogin(false)
        }, 2000);
    }else{
      await addDoc(usersCollectionRef, {correo: usuarioDatos[0].Email, PrecioTotal: total, Artículos: carritoDatos})
      carrito =[];
      nuevoCarrito(carrito)

      setAlertCompra(true)
      setTimeout(() => {
            setAlertCompra(false)
        }, 2000);
    }
  }

  useEffect(()=>{
    getImagenes();
  },[])

  return (
    <>
      {
          alertCompra === true
          ? 
          <div className='alertaComprado'>
              <p>Compra realizada</p>
          </div>
          : alertLogin === true
          
          ?<div className='alertaLogin'>
            <p>Debe iniciar Sesión</p>
          </div>:' '
      }
      {
        carritoDatos.length === 0
        ? <div>
          <h4 className="sinProductos">No hay productos en el carrito.</h4>
          </div> 
        :
          (carritoDatos.forEach((x) => {
            carritoDatos.forEach((y) => {
                if (x.Nombre == y.Nombre) {
                  productos = productos + 1;
                }
              });

              //Array para guardar cantidad de productos por  cada Id de artículo.
              arrayCantProductos = [
                ...arrayCantProductos,
                { Nombre: x.Nombre, Cantidad: productos },
              ];
              productos = 0;
          }),

          //Array para mostrar único producto con cantindad
          unicoCarrito.map((producto, i) => {
            var cantImagenes=0;
            arrayCantProductos.forEach((p) => {
              if (p.Nombre == producto.Nombre) {
                cantProductos = p.Cantidad;
                total = total + +producto.Precio
              }
            });
            return (
                <div className="carrito" key={i}>
                  <p className="tituloCarrito">{producto.Nombre}</p>
                  {
                    imagenesList.map((imagen, i)=>{
                      var imagenId = imagen.split('?', 1).toString().split('https://firebasestorage.googleapis.com/v0/b/react-ecomerce-62065.appspot.com/o/Imagenes%2F').pop();

                      if(imagenId.split('_').join(' ') == producto.Nombre+'.jpg' && cantImagenes<1){
                        cantImagenes=cantImagenes+1;
                        return <img className='imgCarrito' key={i} src={imagen}/>
                      }
                    })
                  }
                  <p className="cantidadCarrito">
                    Cantidad:
                  <input type='number' defaultValue={cantProductos} min='0' max='100' onChange={e=> handleChange(e, producto.Nombre)}/>
                  </p>
              </div>
            );
          }))
      }
      {
        //Mostrar botón de pagar si hay artículos.
        total > 0
        ?
        <div className="pago">
          <h4 className="total">Total: ₡{total}</h4>
          <br/>
          <button  onClick={pagar} className="pagarBoton">Pagar</button>
        </div>:''
      }
    </>
  );
};

export default Carrito;
