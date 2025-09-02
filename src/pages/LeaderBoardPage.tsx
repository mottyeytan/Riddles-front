import PlayerCard from "../componets/LeaderBoardPage/PlayerCard.tsx";

const getLeaderboard = async () => {
    const response = await fetch('http://localhost:3000/leaderboard');
    const data = await response.json();
    return data;
}

export default function LeaderBoardPage(){
    return (
        <div className="leaderboard-page">
            <PlayerCard />
        </div>
    )
}