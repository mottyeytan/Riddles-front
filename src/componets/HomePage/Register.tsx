
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext.tsx';
import { useState } from 'react';

export default function Register(){

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
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
                    password: password
                })
            });

            const data = await response.json();
            console.log(data);

            if(response.ok){
                login(data.token, data.user);
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
        <div className="register-componet">
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Register</button>
            {error && (
                <div className="error-message" style={{color: 'red'}}>{error}</div>
            )}
            </form>
        </div>
    )
}