import '../firebase/config'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'


export const useAuthentication = () => {

    const [error, setError] = useState(null)
    const [lodding, setLodding] = useState(null)
    
    //Função ant memory Liking
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled(){
        if(cancelled){
            return
        }
    }

    //Sistema de LogOut
    const LogOut = () => {
        checkIfIsCancelled()

        signOut(auth)
    }

    //Sistema de Login
    const login = async(data) => {
        checkIfIsCancelled()

        setLodding(true)
        setError(null)
        
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password) 
            setLodding(false)
        } catch (err) {
            let systemErrorMessage;
            if(err.message.includes("user-not-found")){
                systemErrorMessage = "E-mail não encontrado"
            }else if(err.message.includes("wrong-password")){
                systemErrorMessage = "Senha incorreta"
            }else{
                systemErrorMessage = "Algo deu errado, tente atualizar a pagina."
            }

            setError(systemErrorMessage)
        }
    }

    //Criar usuario
    const createUser = async (data) => {
        //Checa se a função foi cancelada
        checkIfIsCancelled()
        
        //Inicia o Lodding da página
        setError(null)
        setLodding(true)

        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })
            
            setLodding(false)

            return user
        } catch (err) {
            console.log(err.message)
            console.log(typeof err.message)

            let systemErrorMessage;

            if(err.message.includes("Password")){
                systemErrorMessage = "Senhas devem conter mais de 6 caracteres"
            }else if(err.message.includes("email-already")){
                systemErrorMessage = "Esse E-mail já foi cadastrado"
            }else if(err.message.includes("invalid-email")){
                systemErrorMessage = "E-mail invalido"
            }else{
                systemErrorMessage = "Algo deu errado, tente novamente"
            }
            
            setError(systemErrorMessage)
            setLodding(false)
        }

        
    }

    //Ativa o sistema de cancelamento
    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        LogOut,
        login,
        error,
        lodding
    }
}