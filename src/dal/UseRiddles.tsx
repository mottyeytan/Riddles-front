import { RiddleService, type Riddle } from "./RiddleService.tsx";
import { useState, useEffect, createContext, useContext } from "react";

interface RiddlesContextType {
    riddles: Riddle[];
    loading: boolean;
    error: string | null;
    updateRiddle: (riddle: Riddle) => Promise<void>;
    deleteRiddle: (id: number) => Promise<void>;
    createRiddle: (riddle: Riddle) => Promise<void>;
}

const RiddlesContext = createContext<RiddlesContextType | undefined>(undefined);

export function RiddlesProvider({ children }: { children: React.ReactNode }) {
    const [riddles, setRiddles] = useState<Riddle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        async function fetchRiddles(){
            try {
                setLoading(true);
                setError(null);
                const data = await RiddleService.getRiddles();
                setRiddles(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Error fetching riddles:', err);
                setError(err instanceof Error ? err.message : 'An error occurred');
                setRiddles([]);
            } finally {
                setLoading(false);
            }
        };
        
        fetchRiddles();
    }, [refreshTrigger]);

    async function createRiddle(riddle: Riddle){
        try {
            await RiddleService.createRiddle(riddle);
            setRefreshTrigger(prev => prev + 1);
        } catch (err) {
            console.error('Error creating riddle:', err);
        }
    }

    async function updateRiddle(riddle: Riddle){
        try {
            await RiddleService.updateRiddle(riddle.id, riddle);
            setRefreshTrigger(prev => prev + 1);
        } catch (err) {
            console.error('Error updating riddle:', err);
        }
    }

    async function deleteRiddle(id: number){
        try {
            await RiddleService.deleteRiddle(id);
            setRefreshTrigger(prev => prev + 1);
        } catch (err) {
            console.error('Error deleting riddle:', err);
        }
    }

    return (
        <RiddlesContext.Provider value={{ riddles, loading, error, createRiddle, updateRiddle, deleteRiddle }}>
            {children}
        </RiddlesContext.Provider>
    );
}

export function useRiddles() {
    const context = useContext(RiddlesContext);
    if (context === undefined) {
        throw new Error('useRiddles must be used within a RiddlesProvider');
    }
    return context;
}