import { createContext, useState } from "react";
export const AppContext = createContext({})
import { useAllMovies } from "../hooks/useAllMovies";

const getInitialValue = () => {
    const value = localStorage.getItem('user')
    if (!value)
        return {
            token: '',
            user: {}
        }

    return JSON.parse(value)
}

export const AppContextProvider = ({ children }) => {

    const [auth, setAuth] = useState(getInitialValue())
    const { movies } = useAllMovies()

    const logout = () => {
        localStorage.removeItem('user');
        setAuth({
            token: '',
            user: {}
        });
    }

    const saveUserInfo = (user) => {
        localStorage.setItem('user', JSON.stringify(user))
        setAuth(user)
    }

    return (
        <AppContext.Provider value={{
            token: auth.token,
            user: auth.user,
            saveUserInfo,
            logout,
            movies
        }}>
            {children}
        </AppContext.Provider>
    )
}