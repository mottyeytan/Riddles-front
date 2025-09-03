import RiddleCard from "../componets/EditPage/RiddleCard.tsx";
import CreateRiddle from "../componets/EditPage/CreateRiddle.tsx";
import { useRiddles } from "../dal/UseRiddles.tsx";

export default function EditRiddlesPage(){
    const { riddles, loading, error } = useRiddles();

    return (
        <div className="edit-riddles-page">
            <CreateRiddle />
            
            {loading && <p>Loading riddles...</p>}
            {error && <p>Error loading riddles: {error}</p>}
            
            <div className="riddles-list">
                {Array.isArray(riddles) && riddles.length > 0 ? (
                    riddles.map(riddle => (
                        <RiddleCard 
                            key={riddle.id}
                            riddle={riddle}
                        />
                    ))
                ) : (
                    !loading && !error && <p>No riddles found.</p>
                )}
            </div>
        </div>
    )
}