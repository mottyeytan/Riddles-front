
import { useNavigate } from 'react-router-dom';

export default function Login(){
    const navigate = useNavigate();

    const handleLogin = () => {
        
        //TODO: add logic to login
        navigate('/menu');
    };

    return (
        <div className="login-componet">
            <h1>Login</h1>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}