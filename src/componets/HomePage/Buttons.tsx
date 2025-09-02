interface ButtonsProps {
    activeMode: string;
    onModeChange: (mode: string) => void;
}

export default function Buttons({ activeMode, onModeChange }: ButtonsProps){

    const renderButtons = () => {
        return (
            <>
                {(activeMode === 'register' || activeMode === 'guest') && (
                    <button className="login-button"
                    onClick={() => onModeChange('login')}>
                        back to login
                    </button>
                )}
                
                {(activeMode === 'login' || activeMode === 'guest') && (
                    <button className="register-button"
                    onClick={() => onModeChange('register')}>
                        register
                    </button>
                )}

                {(activeMode === 'login' || activeMode === 'register') && (
                    <button className="guest-button"
                    onClick={() => onModeChange('guest')}>
                        login as guest
                    </button>
                )}
            </>
        );
    };

    return (
        <div className="buttons-componet">
            {renderButtons()}
        </div>
    )
}



