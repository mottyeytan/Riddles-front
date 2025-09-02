
import { useNavigate } from 'react-router-dom';

export default function Register(){
    const navigate = useNavigate();

    const handleRegister = () => {
        
        //TODO: add logic to register
        navigate('/menu');
    };

    return (
        <div className="register-componet">
            <h1>Register</h1>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button onClick={handleRegister}>Register</button>
        </div>
    )
}