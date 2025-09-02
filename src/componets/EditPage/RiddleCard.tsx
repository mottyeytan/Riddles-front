import riddles from '../../data/riddles.json';


export default function RiddleCard(){
    

    
    return (
        <div className="riddle-card-container"> 

        

        {riddles.map((riddle) => (
            <div className="riddle-card">
                <p>{riddle.riddle}</p>
                <p>{riddle.answer}</p>   
                <button >edit</button>
                <button >delete</button>
            </div>
        ))}

       
        </div>
    )
}