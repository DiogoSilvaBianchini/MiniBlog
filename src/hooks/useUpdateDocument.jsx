import { useState } from "react"
import { db } from "../firebase/config"
import { doc, updateDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"


export const useUpdateDocument = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [lodding, setLodding] = useState(null)
    const [cancelled, setcancelled] = useState(null)

    const UpdatedDoc = async (docCollection, data, id) => {
        
        if(cancelled) return
        setLodding(true)
        
        try{
            const docRef = await doc(db, docCollection, id)
            await updateDoc(docRef, data)
            setLodding(false)
            setcancelled(true)
            navigate("/dashbord")
        }catch(err){
            console.log(err)
            setError(true)
            setLodding(false)
        }
    }


    return{UpdatedDoc, error, lodding}
}