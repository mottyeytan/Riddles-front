import Buttons from "./Buttons.tsx";
import Login from "./Login.tsx";
import Guest from "./Guest.tsx";
import Register from "./Register.tsx";
import { Link } from "react-router-dom";

export default function MainLogin(){

    return (
        <div className="login-componet">

            <Login />

            <Guest />

            <Register />

            <Buttons login={<Login />} guest={<Guest />} register={<Register />} />

        </div>
    )
}