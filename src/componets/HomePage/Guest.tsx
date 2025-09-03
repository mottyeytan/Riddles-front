
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext.tsx';
import { useState } from 'react';

export default function Guest(){
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    async function handleGuestLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        try{
            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: username,
                    password: null,
                    role: 'guest'
                })
            });

            const data = await response.json();
            console.log(data);

            if(response.ok){
                login(data.token, data.role);
                navigate('/menu');
            } else {
                setError(data.message || 'Invalid username or password');
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Invalid username or password');
            console.log(error);
        }
    }

    return (
        <div className="gust-componet">
            <h1>Enter your name</h1>
            <form onSubmit={handleGuestLogin}>
            <input required type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <button type="submit">Login</button>
            {error && (
                <div className="error-message" style={{color: 'red'}}>{error}</div>
            )}
            </form>
        </div>
    )
}