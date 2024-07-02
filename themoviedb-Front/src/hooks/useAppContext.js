import { useContext } from "react"
import { AppContext } from "../context/AppContext"

export const useAppConext = () => {
    const value = useContext(AppContext)
    return value
}