import { Route, Routes } from "react-router-dom"
import { UserProvider } from "../providers/UserContext"
import Register from "../pages/Register/Register"
import Login from "../pages/Login/Login"

export const RoutesMain = () => {
    return (
        <UserProvider>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register /> } />
                {/* <Route path="/home" element={<ProtectedRoutes />}>
                    <Route index element={ <TechProvider><Dashboard /></TechProvider>} />
                </Route> */}
            </Routes>
        </UserProvider>
    )
}