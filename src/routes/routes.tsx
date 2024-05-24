import { Route, Routes } from "react-router-dom"
import { UserProvider } from "../providers/UserContext"
import Register from "../pages/Register/Register"
import Login from "../pages/Login/Login"
import { ProtectedRoutes } from "../components/ProtectedRoutes/ProtectedRoutes"
import {Dashboard} from "../pages/Dashboard/Dashboard"
import { Documents } from "../pages/Documents/Documents"
import UserProfileForm from "../pages/Pefil/Profile"
import { Search } from "../pages/Search/Search"
import Forgot from "../pages/ForgotPassword/ForgotPassword"
import ConfirmCode from "../pages/ConfirmCode/ConfirmCode"
import ResetPassword from "../pages/ResetPassword/ResetPassword"

export const RoutesMain = () => {
    return (
        <UserProvider>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register /> } />
                <Route path="/forgot" element={< Forgot />} />
                <Route path="/code" element={< ConfirmCode />} />
                <Route path="/password" element={< ResetPassword />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/home" element={ <Dashboard />} />
                    <Route  path="/docs" element={ <Documents />} />
                    <Route path="/profile" element={< UserProfileForm />} />
                    <Route path="/filter" element={< Search />} />
                </Route>
            </Routes>
        </UserProvider>
    )
}