import Buttons from "./Buttons.tsx";
import Login from "./Login.tsx";
import Guest from "./Guest.tsx";
import Register from "./Register.tsx";


export default function MainLogin(){

    return (
        <div className="login-componet">

            <Login />

            <Guest />

            <Register />

            <Buttons />

        </div>
    )
}