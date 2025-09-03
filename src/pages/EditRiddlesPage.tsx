import RiddleCard from "../componets/EditPage/RiddleCard.tsx";
import CreateRiddle from "../componets/EditPage/CreateRiddle.tsx";
import { useAuth } from "../auth/AuthContext.tsx";
import { useState, useEffect } from "react";


export default function EditRiddlesPage(){
    

    return (
        <div className="edit-riddles-page">
            <CreateRiddle />
            <RiddleCard />
        </div>
    )
}