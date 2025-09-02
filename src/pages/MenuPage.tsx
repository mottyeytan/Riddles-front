import EditRiddlesButton from "../componets/MenuPage/EditRiddlesButton.tsx";
import LeaderboardButton from "../componets/MenuPage/LeaderboardButton.tsx";
import PlayGameButton from "../componets/MenuPage/PlayGameButton.tsx";
// import { useState, useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext.tsx";

export default function MenuPage(){
    // const [showEditRiddles, setShowEditRiddles] = useState(false);
    // const { whoIsLoggedIn } = useContext(AuthContext);


    // function handleEditRiddles(){
    //     {whoIsLoggedIn === 'admin' || whoIsLoggedIn === 'user' && (
    //         setShowEditRiddles(true)
    //     )}
    // }

    return (
        <div className="menu-page">
            <PlayGameButton />
            {<EditRiddlesButton />}
            <LeaderboardButton />
        </div>
    )
}