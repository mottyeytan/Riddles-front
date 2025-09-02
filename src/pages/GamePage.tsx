import Game from "../componets/GamePage/Game.tsx";
import Timer from "../componets/GamePage/Timer.tsx";

export default function GamePage(){
    return (
        <div className="game-page">
            <Timer />
            <Game />
        </div>
    )
}