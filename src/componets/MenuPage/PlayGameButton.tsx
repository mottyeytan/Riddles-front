import { useNavigate } from 'react-router-dom';



export default function PlayGameButton(){
    const navigate = useNavigate();
    
    function handlePlayGame(){
        navigate('/game');
    }
    return (
        <div className="play-game-button">
            <button onClick={handlePlayGame}>Play Game</button>
        </div>
    )
}