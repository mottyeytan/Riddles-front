import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function ProtectedRoute(){
    const { token } = useAuth();

    if(!token){
        return <Navigate to="/" />;
    }

    return <Outlet />;
}