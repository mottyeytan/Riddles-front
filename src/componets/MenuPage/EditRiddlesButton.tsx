import { useNavigate } from 'react-router-dom';


export default function EditRiddlesButton(){
    const navigate = useNavigate();
    
    function handleEditRiddles(){
        navigate('/edit-riddles');
    }
    return (
        <div className="menu-page-button" >
            <button onClick={handleEditRiddles}>Edit Riddles</button>
        </div>
    )
}