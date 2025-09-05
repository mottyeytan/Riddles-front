import { useAuth } from "../auth/AuthContext.tsx";
import EditRiddlesButton from "../componets/MenuPage/EditRiddlesButton.tsx";
import LeaderboardButton from "../componets/MenuPage/LeaderboardButton.tsx";
import PlayGameButton from "../componets/MenuPage/PlayGameButton.tsx";


export default function MenuPage(){
    const { role } = useAuth();


    const showEditRiddles = role === 'admin' || role === 'user';

    return (
        <div className="menu-page">
            <PlayGameButton/>
            {showEditRiddles && <EditRiddlesButton/>}
            <LeaderboardButton/>
        </div>
    )
}