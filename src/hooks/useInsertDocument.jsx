import { useReducer } from 'react'
import {db} from '../firebase/config'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

const initialState = {
    lodding: null,
    error: null
}

const insertReducer = (state, action) => {
    switch(action.type){
        case "LOADING":
            return {lodding: true, error: null}
        case "INSERTED_DOC":
            return {lodding: false, error: null}
        case "ERROR":
            return {lodding: false, error: action.payload}
        default:
            return state;
    }
}

export const useInsertDocument = (docCollection) => {
    const [response, dispatch] = useReducer(insertReducer, initialState)


    const checkCancelledBeforeDispatch = (action) => {
        dispatch(action)
    } 

    const insertDocument = async (document) => {
        checkCancelledBeforeDispatch({
            type: "LOADING"
        })
        try {
            const newDocument = {...document, createdAt: Timestamp.now()}
            const insertedDocument = await addDoc(
                collection(db, docCollection),
                newDocument
            )

            checkCancelledBeforeDispatch({
                type: "INSERTED_DOC",
                payload: insertedDocument
            })
        } catch (error) {
            checkCancelledBeforeDispatch({
                type: "ERROR",
                payload: error.message
            })
        }
    }
    return {insertDocument, response}
}