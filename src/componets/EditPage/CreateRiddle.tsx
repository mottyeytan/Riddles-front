import { useState } from 'react';
import { useRiddles } from '../../dal/UseRiddles.tsx';
import { type Riddle } from '../../dal/RiddleService.tsx';

export default function CreateRiddle(){
    const { createRiddle, riddleLength } = useRiddles();
    const [isCreating, setIsCreating] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [NewRiddle, setNewRiddle] = useState<Riddle>({
        id: riddleLength + 1,
        name: '',
        description: '',
        hint: '',
        timeLimit: 0,
        difficulty: 'easy' as 'easy' | 'medium' | 'hard',
        correctAnswer: ''
    });
    
    
    
    async function HnadelcreateRiddle(NewRiddle: Riddle){
        console.log(NewRiddle);
        try{
            setLoading(true);
            setError(null);

            await createRiddle(NewRiddle)

            setIsCreating(false);
            setLoading(false);

        }catch (error){
            setError("eroor")

            console.log(error)
        }

    }


    function CancelCreating(){
        setIsCreating(false)
    }
    

    return (
        <div className="create-riddle-container">
            <div className= "create-riddle-card">

            { !isCreating ?  (<button className="create-riddle-actions" onClick={() => setIsCreating(true)}>Create Riddle</button> ) :
                
                   ( <>
                   <input 
                            type="text" 
        
                            onChange={(e) => setNewRiddle({...NewRiddle, name: e.target.value})}
                            placeholder="Name"
                        />
                        
                        <textarea 
                            onChange={(e) => setNewRiddle({...NewRiddle, description: e.target.value})}
                            placeholder="Description"
                        />
                        
                        <input 
                            type="text" 
                            onChange={(e) => setNewRiddle({...NewRiddle, hint: e.target.value})}
                            placeholder="Hint"
                        />
                        
                        <input 
                            type="number" 
                            onChange={(e) => setNewRiddle({...NewRiddle, timeLimit: Number(e.target.value)})}
                            placeholder="Time Limit"
                        />
                        
                        <select 
                            onChange={(e) => setNewRiddle({...NewRiddle, difficulty: e.target.value as 'easy' | 'medium' | 'hard'})}
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                        
                        <input 
                            type="text" 
                            
                            onChange={(e) => setNewRiddle({...NewRiddle, correctAnswer: e.target.value})}
                            placeholder="Correct Answer"
                        />

                        <div className="create-riddle-actions">
                            <button onClick={CancelCreating}>Cancel</button>
                            <button onClick={() => HnadelcreateRiddle(NewRiddle)}>Save</button>
                        </div>

                        </>
                            
                            )}
                
                </div>
            
        </div>
    )
}