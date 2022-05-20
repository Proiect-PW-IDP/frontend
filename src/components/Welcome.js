import React from "react";
import { useNavigate } from 'react-router-dom';
import AllOffers from "./AllOffers";
import LoginButton from "./LoginButton";


function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-300 min-h-screen flex justify-center flex-col">
                <h1 class="mb-8 text-3xl text-center">Welcome</h1>
                <div className="flex flex-row justify-center items-center space-x-4 ">
                    <LoginButton/>
                </div>
        </div>
    );
}

export default Welcome;