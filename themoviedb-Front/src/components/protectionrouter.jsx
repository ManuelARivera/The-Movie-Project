import { Navigate } from "react-router-dom"
import { useAppConext } from "../hooks/useAppContext"

export const ProtectedRoute = ({ children }) => {
    const { token } = useAppConext()

    return <>
        {
            token ? children : <Navigate to={'/signin'} replace />
        }
    </>
}

export const ProtectedRouteSingedUser = ({ children }) => {
    const { token } = useAppConext()

    return <>
        {
            !token ? children : <Navigate to={'/'} replace />
        }
    </>
}