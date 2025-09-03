import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.tsx';



export default function NavBar(){
    const navigate = useNavigate();
    const { logout } = useAuth();

    function handleLogout(){

        //TODO: add logic to logout
        logout();
        navigate('/');
    }

    return (
        <div className="nav-bar" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', position: 'fixed', top: '0', left: '0', right: '0', backgroundColor: '#f0f0f0'}}>
            <h1>NavBar</h1>
            <div className="nav-bar-right">
                <button onClick={handleLogout}>Logout</button>
                
            </div>
        </div>
    )
}