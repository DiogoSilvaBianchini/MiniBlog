import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'
import style from './Alert.module.css'

const Alert = ({message, yes, no, id, close}) => {
    const {DeleteDoc} = useDeleteDocument()
    const navigate = useNavigate()

    const [warning, setWarning] = useState(null)

    useEffect(() => {
        if(warning){
            DeleteDoc("posts", id)
            return navigate("/dashbord")
        }else{
            return
        }
    },[warning, id, DeleteDoc, navigate])

    const cancelled = () => {
        setWarning(false)
        close(false)
    }
  return (
    <div className={style.box}>
        <p className={style.msg}>{message}</p>
        <button className='btn' onClick={cancelled}>{no}</button>
        <button className='btn delete' onClick={() => setWarning(true)}>{yes}</button>
    </div>
  )
}

export default Alert