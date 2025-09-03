import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function ProtectedRouteAll(){
    const { token } = useAuth();
    

    if(!token){
        return <Navigate to="/" />;
    }

    return <Outlet />;
}

export function ProtectedRouteUser(){
    const { role } = useAuth();
    

    if(role !== 'user' && role !== 'admin'){
        return <Navigate to="/" />;
    }

    return <Outlet />;
}