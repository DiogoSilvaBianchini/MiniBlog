import {useState, useEffect} from 'react'
import {db} from '../firebase/config'
import {collection, query, orderBy, onSnapshot, where} from 'firebase/firestore'

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
    const [ documents, setDocuments ] = useState(null)
    const [ error, setError ] = useState(null)
    const [ lodding, setLodding ] = useState(null)
    
    const [ cancelled, setCancelled ] = useState(false)

    useEffect(() => {

        const loddingData = async () => {
            if(cancelled) return

            setLodding(true)

            const collectionRef = await collection(db, docCollection)

            try {
                let q

                if(search){ // Buscar por tag
                    q = await query(
                        collectionRef,
                            where("tags", "array-contains", search), //Procure em nos arrays(array-contains) tags(firebase), o que estará armazenado em search
                            orderBy("createdAt", "desc")    
                        )
                }else if(uid){
                    q = await query(
                        collectionRef,
                        where("uid", "==", uid),
                        orderBy("createdAt", "desc")
                    )
                }else { // Buscar todos os itens da collection
                    q = await query(collectionRef, orderBy("createdAt", "desc")) // Organiza do mais recente ao mais aintigo
                }

                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data()
                        }))
                    )
                }) //Filtra os dados mais novos e analisa mudanças


                setLodding(false)
            } catch (error) {
                console.log(error)
                setError(error.message)
                setLodding(false)
            }
        }
        loddingData()
    }, [docCollection, search, uid, cancelled])


    useEffect(() => {
        return () => setCancelled(true)
    }, [])


    return {documents, lodding, error} 
}