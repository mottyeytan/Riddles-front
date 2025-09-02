import { useState } from 'react';

export default function CreateRiddle(){
    const [showCreateRiddle, setShowCreateRiddle] = useState(false);
    

    return (
        <div className="create-riddle-container">
            <button onClick={() => setShowCreateRiddle(true)}>Create Riddle</button>
            {showCreateRiddle && (
                <form className="create-riddle-form">
                    <input type="text" placeholder="Riddle"  />
                    <input type="text" placeholder="Answer"   />
                    <button type="submit" onClick={() => setShowCreateRiddle(false)} >Create</button>
                </form>
                
            )}
        </div>
    )
}