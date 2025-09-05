import { useNavigate } from 'react-router-dom';

export default function LeaderboardButton(){
    const navigate = useNavigate();

    function handleLeaderboard(){
        navigate('/leaderboard');
    }
    return (
        <div className="menu-page-button" >
            <button onClick={handleLeaderboard}>Leaderboard</button>
        </div>
    )
}