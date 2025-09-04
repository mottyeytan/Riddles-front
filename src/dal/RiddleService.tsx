
const BASE_URL = 'https://riddle-server.onrender.com/riddles/';

export interface Riddle {
    id: number;
    difficulty: 'easy' | 'medium' | 'hard';
    timeLimit: number;
    hint: string;
    name: string;
    description: string;
    correctAnswer: string;
}

export class RiddleService{

    

    static async getRiddles(): Promise<Riddle[]> {
        
        try{
            const response = await fetch(`${BASE_URL}getRiddle`);
            const data = await response.json();

            if(!response.ok){
                throw new Error(`Failed to fetch riddles: ${response.status} ${response.statusText}`);
            }

            return data.riddle || [];
        } catch (error) {
            console.error('Error fetching riddles:', error);
            throw error;
        }
    }

    static async createRiddle(riddle: Riddle): Promise<Riddle> {
        
        try{
            const response = await fetch(`${BASE_URL}createRiddle`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(riddle)
            });
            const data = await response.json();

            if(!response.ok){
                throw new Error('Failed to create riddle');
            }

            return data;
        } catch (error) {
            console.error('Error creating riddle:', error);
            throw error;
        }
        
    }

    static async updateRiddle(id: number, riddle: Riddle): Promise<Riddle> {
        
        
        try{
            
            const response = await fetch(`${BASE_URL}updateRiddle/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                    
                },
                body: JSON.stringify(riddle)
            });
            const data = await response.json();

            if(!response.ok){
                throw new Error('Failed to update riddle');
            }

            return data;
        } catch (error) {
            console.error('Error updating riddle:', error);
            throw error;
        }
        
    }

    static async deleteRiddle(id: number): Promise<void> {
        
        try{
            const response = await fetch(`${BASE_URL}deleteRiddle/${id}`, {
                method: 'DELETE', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })
            });
            const data = await response.json();

            if(!response.ok){
                throw new Error('Failed to delete riddle');
            }

            return data;
        } catch (error) {
            console.error('Error deleting riddle:', error);
            throw error;
        }
    }




}