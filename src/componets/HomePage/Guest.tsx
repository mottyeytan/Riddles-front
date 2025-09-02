

import { useNavigate } from 'react-router-dom';

export default function Guest(){
    const navigate = useNavigate();

    function handleGuestLogin() {
        

        //TODO: add logic to login as guest
        navigate('/menu');
    };

    return (
        <div className="gust-componet">
            <h1>Enter your name</h1>
            <input type="text" placeholder="Username" />
            <button onClick={handleGuestLogin}>Login</button>
        </div>
    )
}