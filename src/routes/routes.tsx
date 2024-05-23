import { Route, Routes } from "react-router-dom"
import { UserProvider } from "../providers/UserContext"
import Register from "../pages/Register/Register"
import Login from "../pages/Login/Login"
import { ProtectedRoutes } from "../components/ProtectedRoutes/ProtectedRoutes"
import {Dashboard} from "../pages/Dashboard/Dashboard"

export const RoutesMain = () => {
    return (
        <UserProvider>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register /> } />
                <Route path="/home" element={<ProtectedRoutes />}>
                    <Route index element={ <Dashboard />} />
                </Route>
            </Routes>
        </UserProvider>
    )
}