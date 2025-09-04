import { useState } from 'react';
import { useAuth } from '../../auth/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';


export default function Login(){
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        console.log('Login function called!'); // DEBUG
        event.preventDefault();
        console.log('Form submitted with:', { username, password }); // DEBUG

        try{
            const response = await fetch('https://riddle-server.onrender.com/auth/login', {
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
            // console.log(data);

            if(response.ok){
                login(data.token, data.role);
                navigate('/menu');

            } else {
                setError(data.message || 'Invalid username or password');
            }
        } catch (error) {
            console.log('Login error:', error); // DEBUG
            setError(error instanceof Error ? error.message : 'Invalid username or password');
            console.log(error);
        }
    }


    return (
        <div className="login-componet">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input required type="text" placeholder="Username"  value={username} onChange={(e) => setUsername(e.target.value)} />
                <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
                {error && (
                    <div className="error-message" style={{color: 'red'}}>{error}</div>
                )}
            </form>
        </div>
    )
}