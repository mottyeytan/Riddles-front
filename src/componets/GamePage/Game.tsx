import { useState } from 'react';
import riddles from '../../data/riddles.json';

export default function Game(){
    const [riddleIndex, setRiddleIndex] = useState(0);
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState('');

    const currentRiddle = riddles[riddleIndex];

    const RiddleLength = riddles.length - 1;

    function handleSubmit(){
        if(answer.toLowerCase() === currentRiddle.answer.toLowerCase()){
            setMessage('correct');

            nextRiddle();       
            
        } else {
            setMessage('wrong');
        }
    }

    function nextRiddle(){
        if(riddleIndex < RiddleLength){
            setRiddleIndex(riddleIndex + 1);
            setAnswer('');
            setMessage('');
        } else {
            setMessage('you finished all the riddles');
        }
    }

    return (
        <div className="riddle-card">
            <h2>riddle {riddleIndex + 1} / {riddles.length}</h2>
            <h1>{currentRiddle.riddle}</h1>
            <input 
                type="text" 
                placeholder="your answer..." 
                value={answer} 
                onChange={(e) => setAnswer(e.target.value)}
            />
            <button onClick={handleSubmit}>submit</button>
            <button onClick={nextRiddle}>next riddle</button>
            
            {message && (
                <div className="result" style={{marginTop: '20px', fontSize: '18px'}}>
                    {message}
                </div>
            )}
        </div>
    )
}