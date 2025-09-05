import { useEffect, useState } from 'react';
import { useRiddles } from '../../dal/UseRiddles.tsx';
export default function Game(){
    const { riddles } = useRiddles();
    const [showHint, setShowHint] = useState(false);
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
    const [riddleIndex, setRiddleIndex] = useState(0);
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState('');

    const filteredRiddles = riddles.filter(riddle => riddle.difficulty === difficulty);
    const currentRiddle = filteredRiddles[riddleIndex];
    
    const RiddleLength = filteredRiddles.length - 1;

    function handleSubmit(){
        if(answer.toLowerCase().trim() === currentRiddle.correctAnswer.toLowerCase().trim()){
            setMessage('correct');
       
            setTimeout(() => {
                    nextRiddle();
                }, 1300);
            
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

    function handleDifficulty(difficulty: 'easy' | 'medium' | 'hard'){
        setDifficulty(difficulty);
        setRiddleIndex(0);
        setAnswer('');
        setMessage('');
    }


    return (
        <div className="riddle-card">
            <h2 className="riddle-index">riddle {riddleIndex + 1} / {filteredRiddles.length}</h2>
            <h1 className="riddle-name">{currentRiddle.name}</h1>
            <p className="riddle-description">{currentRiddle.description}</p>
            {showHint && (
                <p className="riddle-hint">{currentRiddle.hint}</p>
            )}
            <input 
                className="riddle-answer"
                type="text" 
                placeholder="your answer..." 
                value={answer} 
                onChange={(e) => setAnswer(e.target.value)}
            /> 
            <div className="riddle-actions">
            <button onClick={handleSubmit}>submit</button>
            <button onClick={nextRiddle}>next riddle</button>
            </div>
            <button className="riddle-hint-button" onClick={() => setShowHint(!showHint)}>{showHint ? 'hide hint' : 'show hint'}</button>

            <select className="riddle-difficulty-select" onChange={(e) => handleDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select> 
            <p className="riddle-difficulty">difficulty: {difficulty}</p>
            
            {message && (
                <div className="riddle-result" >
                    {message}
                </div>
            )}
        </div>
    )
}