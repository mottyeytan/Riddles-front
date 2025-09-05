import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function ProtectedRouteAll(){
    const { token, isLoading } = useAuth();
    
    if(isLoading){
        return <div>Loading...</div>;
    }

    if(!token){
        return <Navigate to="/" />;
    }

    return <Outlet />;
}

export function ProtectedRouteUser(){
    const { role, isLoading } = useAuth();
    
    if(isLoading){
        return <div>Loading...</div>;
    }

    if(role !== 'user' && role !== 'admin'){
        return <Navigate to="/" />;
    }

    return <Outlet />;
}