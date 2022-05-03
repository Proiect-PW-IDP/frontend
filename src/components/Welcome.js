import React from "react";
import { useNavigate } from 'react-router-dom';


function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-300 min-h-screen flex justify-center flex-col">
                <h1 class="mb-8 text-3xl text-center">Welcome</h1>
                <div className="flex flex-row justify-center items-center space-x-4 ">
                    <button className="bg-white hover:bg-blue-300 p-3 rounded-lg cursor-pointer outline-none" onClick={() => navigate("/login")}>Log in</button>
                    <button className="bg-white hover:bg-blue-300 p-3 rounded-lg cursor-pointer outline-none" onClick={() => navigate("/signup")}>Sign Up</button>
                </div>
        </div>
    );
}

export default Welcome;