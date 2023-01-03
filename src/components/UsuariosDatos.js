import create from 'zustand'
import {persist} from 'zustand/middleware'

//Cambio de Valtio a Zustand

export let useDatosUsuario = create
(persist(set => ({
    usuario: [],
    añadirUsuario: (usuario) => set(()=> ({usuario: [usuario]})),
    cerrarSesion: () => set(()=>({usuario: []}))
})),
{
    name: 'usuario'
})