import RiddleCard from "../componets/EditPage/RiddleCard.tsx";
import CreateRiddle from "../componets/EditPage/CreateRiddle.tsx";


export default function EditRiddlesPage(){
    return (
        <div className="edit-riddles-page">
            <CreateRiddle />
            <RiddleCard />
        </div>
    )
}