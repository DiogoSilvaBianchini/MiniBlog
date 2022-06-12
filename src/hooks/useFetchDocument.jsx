import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

export const useFetchDocument = (docCollection, id) => {

    const [documents, setDocument ] = useState(null)
    const [lodding, setLodding] = useState(false)
    const [error, setErro] = useState(false)
    const [cancelled, setCancelled] = useState(null)
    
    useEffect(() => {
        if(cancelled) return

        const loddingDoc = async () => {
            setLodding(true)
            try {
                const docRef = await doc(db, docCollection, id)
                const docSnap = await getDoc(docRef)
                setDocument(docSnap.data()) 
                setLodding(false)
            } catch (error) {
                setErro(true)
                console.log(error)
            }
        }

        loddingDoc()
    }, [docCollection, id, cancelled])

    

    useEffect(() => {
        return setCancelled(true)
    }, [])

    return {documents, lodding, error}
}   