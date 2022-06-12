import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'

export const useQuery = () => {
    const { search } = useLocation(); //Pega o valor da URL (?q=)

    return useMemo(() => new URLSearchParams(search), [search]) // Ativa quando "Search" for modificado
}