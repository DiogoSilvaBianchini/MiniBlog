import { useState } from "react"
import { db } from "../firebase/config"
import { doc, deleteDoc } from "firebase/firestore"


export const useDeleteDocument = () => {
    const [error, setError] = useState(null)
    const [lodding, setLodding] = useState(null)
    const [cancelled, setcancelled] = useState(null)

    const DeleteDoc = async (docCollection, id) => {
        
        if(cancelled) return
        setLodding(true)
        
        try{
            await deleteDoc(doc(db, docCollection, id))
            setLodding(false)
            setcancelled(true)
        }catch(err){
            console.log(err.menssage)
            setError(true)
            setLodding(false)
        }
    }


    return{DeleteDoc, error, lodding}
}