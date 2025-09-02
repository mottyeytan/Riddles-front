
import React from 'react';

export default function Buttons({login, guest, register}: {login: React.ReactNode, guest: React.ReactNode, register: React.ReactNode}){

    return (
        <div className="buttons-componet">

            <p> Don't have an account? </p>
            <button className="register-button" onClick={register}>Register</button>

            <button className="login-button" onClick={login}>
                Login
            </button>

            <button className="guest-button" onClick={guest}>
                Login as guest 
            </button>
        </div>
    )
}