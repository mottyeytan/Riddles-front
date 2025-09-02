import { useState } from 'react';
import Buttons from "./Buttons.tsx";
import Login from "./Login.tsx";
import Guest from "./Guest.tsx";
import Register from "./Register.tsx";

export default function MainLogin(){
    const [activeMode, setActiveMode] = useState('login');

    const renderActiveComponent = () => {
        switch(activeMode) {
            case 'register':
                return <Register />;
            case 'guest':
                return <Guest />;
            default:
                return <Login />;
        }
    };

    return (
        <div className="login-componet">
            {renderActiveComponent()}
            <Buttons 
                activeMode={activeMode}
                onModeChange={setActiveMode}
            />
        </div>
    )
}