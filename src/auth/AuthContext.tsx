import { createContext, useState, useEffect, useContext } from "react";


interface AuthContextType {
    token: string | null;
    role: string | null;
    isLoading: boolean;
    login: (token: string, role: string) => void;
    logout: () => void;
    
}
export const TokenSaveContext = createContext<AuthContextType | undefined>(undefined);


export default function AuthProvider({ children }: { children: React.ReactNode }){
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
            const savedToken = localStorage.getItem('token');
            const savedRole = localStorage.getItem('role');

            if(savedToken && savedRole ){
                setToken(savedToken);
                setRole(savedRole);
            }
            
            setIsLoading(false);
        
    }, []);


    if(isLoading){
        return <div>Loading...</div>;
    }



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
        <TokenSaveContext.Provider value={{ token, role, isLoading, login, logout}}>
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