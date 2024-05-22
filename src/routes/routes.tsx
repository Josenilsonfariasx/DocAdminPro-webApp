import { Route, Routes } from "react-router-dom"
import { UserProvider } from "../providers/UserContext"
import Register from "../pages/Register/Register"

export const RoutesMain = () => {
    return (
        <UserProvider>
            <Routes>
                {/* <Route path="/" element={<SingIn />} /> */}
                <Route path="/register" element={<Register /> } />
                {/* <Route path="/home" element={<ProtectedRoutes />}>
                    <Route index element={ <TechProvider><Dashboard /></TechProvider>} />
                </Route> */}
            </Routes>
        </UserProvider>
    )
}