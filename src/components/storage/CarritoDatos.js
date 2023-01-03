import create from 'zustand'
import {persist} from 'zustand/middleware'

//Uso de zustand para persistir  datos del carrito en almacenamiento local.
export let useDatos = create
(persist(set => ({
    carrito: [],
    añadirProducto: (producto) => set((state)=> ({carrito: [...state.carrito, ...producto]})),
    borrarCarrito: () => set({}),
    nuevoCarrito: (listaCarrito) => set((state)=>({carrito: listaCarrito}))
})),
{
    name: 'carrito'
})
