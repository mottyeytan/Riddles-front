import { createContext, useState, useEffect, useContext } from "react";


interface AuthContextType {
    token: string | null;
    role: string | null;
    login: (token: string, role: string) => void;
    logout: () => void;
    
}
export const TokenSaveContext = createContext<AuthContextType | undefined>(undefined);


export default function AuthProvider({ children }: { children: React.ReactNode }){
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('role');

        if(savedToken && savedUser ){
            setToken(savedToken);
            setRole(savedUser);
            
        }

        setLoading(false);
    }, []);

    function login(Newtoken: string, role: string){
        setToken(Newtoken);
        setRole(role);

        localStorage.setItem('token', Newtoken);
        localStorage.setItem('role', role);
    }

    function logout(){
        setToken(null);
        setRole(null);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }

    return (
        <TokenSaveContext.Provider value={{ token, role, login, logout}}>
            {children}
        </TokenSaveContext.Provider>
    )

}


export function useAuth() {
    const context = useContext(TokenSaveContext);
    if(!context){
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}