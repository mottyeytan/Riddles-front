import { type Riddle } from '../../dal/RiddleService.tsx';
import { useState } from 'react';
import { useRiddles } from '../../dal/UseRiddles.tsx';
import {useAuth} from '../../auth/AuthContext.tsx';

export default function RiddleCard({riddle}: {riddle: Riddle}){
    const { role } = useAuth();
    const { updateRiddle, deleteRiddle } = useRiddles(); 
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [editForm, setEditForm] = useState({
        name: '',
        description: '',
        hint: '',
        timeLimit: 0,
        difficulty: 'easy' as 'easy' | 'medium' | 'hard',
        correctAnswer: ''
    });

    if (loading) {
        return (
            <div className="riddle-card-container">
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="riddle-card-container">
                <p>Error: {error}</p>
            </div>
        );
    }

    if (!riddle) {
        return (
            <div className="riddle-card-container">
                <p>No riddle data available</p>
            </div>
        );
    }

    function startEditing() {
        setEditForm({
            name: riddle.name,
            description: riddle.description,
            hint: riddle.hint,
            timeLimit: riddle.timeLimit,
            difficulty: riddle.difficulty,
            correctAnswer: riddle.correctAnswer
        });
        setIsEditing(true);
    };

    async function saveChanges() {
        try {
            setLoading(true);
            setError(null);
            const updatedRiddle: Riddle = {
                id: riddle.id,
                ...editForm
            };
            
            await updateRiddle(updatedRiddle); 
            setIsEditing(false);
            setLoading(false);
        } catch (error) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };


    async function handleDelete() {
        
        try {
            setLoading(true);
            setError(null);
            await deleteRiddle(riddle.id);
            setIsEditing(false);
            setLoading(false);
        } catch (error) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    }

    const cancelEditing = () => {
        setIsEditing(false);
    };
    
    return (
        <div className="riddle-card-container"> 
            <div className="riddle-card">
                {!isEditing ? (
                    <>
                        <h3>{riddle.name}</h3>
                        <p><strong>Description:</strong> {riddle.description}</p>   
                        <p><strong>Hint:</strong> {riddle.hint}</p>
                        <p><strong>Time Limit:</strong> {riddle.timeLimit} seconds</p>
                        <p><strong>Difficulty:</strong> {riddle.difficulty}</p>
                        <p><strong>Answer:</strong> {riddle.correctAnswer}</p>

                        <div className="riddle-card-actions">
                            <button
                             onClick={role === 'admin' ? startEditing : undefined}
                            disabled={role !== 'admin'}
                            className={role !== 'admin' ? 'riddle-card-actions-disabled' : 'riddle-card-actions-enabled'}
                            title={role !== 'admin' ? 'You are not authorized to edit this riddle' : 'Edit this riddle'}
                            >Edit
                            </button>
                            
                            <button
                             onClick={role === 'admin' ? handleDelete : undefined}
                            disabled={role !== 'admin'}
                            className={role !== 'admin' ? 'riddle-card-actions-disabled' : 'riddle-card-actions-enabled'}
                            title={role !== 'admin' ? 'You are not authorized to delete this riddle' : 'Delete this riddle'}
                            >Delete
                            </button>
                        </div>
                    </>
                ) : (
                    
                    <>
                        <input 
                            type="text" 
                            value={editForm.name}
                            onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                            placeholder="Name"
                        />
                        
                        <textarea 
                            value={editForm.description}
                            onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                            placeholder="Description"
                        />
                        
                        <input 
                            type="text" 
                            value={editForm.hint}
                            onChange={(e) => setEditForm({...editForm, hint: e.target.value})}
                            placeholder="Hint"
                        />
                        
                        <input 
                            type="number" 
                            value={editForm.timeLimit}
                            onChange={(e) => setEditForm({...editForm, timeLimit: Number(e.target.value)})}
                            placeholder="Time Limit"
                        />
                        
                        <select 
                            value={editForm.difficulty}
                            onChange={(e) => setEditForm({...editForm, difficulty: e.target.value as 'easy' | 'medium' | 'hard'})}
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                        
                        <input 
                            type="text" 
                            value={editForm.correctAnswer}
                            onChange={(e) => setEditForm({...editForm, correctAnswer: e.target.value})}
                            placeholder="Correct Answer"
                        />

                        <div className="riddle-card-actions">
                            <button onClick={cancelEditing}>Cancel</button>
                            <button onClick={saveChanges}>Save</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}