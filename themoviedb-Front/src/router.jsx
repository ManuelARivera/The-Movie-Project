import {
    createBrowserRouter,
} from "react-router-dom";
import App from './App.jsx'
import { ProtectedRoute, ProtectedRouteSingedUser } from './components/protectionrouter.jsx'
import { SingIn } from "./pages/singin.jsx";
import { SingUp } from "./pages/singup.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute>
            <App />
        </ProtectedRoute>,
    },
    {
        path: "/signin",
        element: <ProtectedRouteSingedUser>
            <SingIn />
        </ProtectedRouteSingedUser>
    },
    {
        path: "/signup",
        element: <ProtectedRouteSingedUser>
            <SingUp />
        </ProtectedRouteSingedUser>
    },
    {
        path: "/new",
        element: <h1>404 - Not Found</h1>
    },
    {
        path: "*",
        element: <h1>404 - Not Found</h1>
    }
]);