import { useNavigate } from 'react-router-dom';

export default function LeaderboardButton(){
    const navigate = useNavigate();
    
    function handleLeaderboard(){
        navigate('/leaderboard');
    }
    return (
        <div className="leaderboard-button">
            <button onClick={handleLeaderboard}>Leaderboard</button>
        </div>
    )
}