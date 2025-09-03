import { createContext, useState, useEffect, useContext } from "react";


interface AuthContextType {
    token: string | null;
    user: string | null;
    login: (token: string, user: string) => void;
    logout: () => void;
    
}
export const TokenSaveContext = createContext<AuthContextType | undefined>(undefined);


export default function AuthProvider({ children }: { children: React.ReactNode }){
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if(savedToken && savedUser){
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }

        setLoading(false);
    }, []);

    function login(Newtoken: string, userData: string){
        setToken(Newtoken);
        setUser(userData);

        localStorage.setItem('token', Newtoken);
        localStorage.setItem('user', JSON.stringify(userData));
    }

    function logout(){
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    return (
        <TokenSaveContext.Provider value={{ token, user, login, logout}}>
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