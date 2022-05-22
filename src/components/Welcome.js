import React from "react";
import { useNavigate } from 'react-router-dom';
import AllOffers from "./AllOffers";
import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";


function Welcome() {
    const navigate = useNavigate();
    const {
        isLoading,
        error,
        isAuthenticated,
        user,
        getAccessTokenSilently,
        loginWithRedirect,
        logout,
    } = useAuth0();


    return (
       <div className="bg-gray-300 min-h-screen flex justify-center flex-col">
                <h1 class="mb-8 text-3xl text-center">Welcome</h1>
                {!isAuthenticated && <div className="flex flex-row justify-center items-center space-x-4 ">
                    <LoginButton/>
                </div>}
                {isAuthenticated && <h2 class="mb-8 text-3xl text-center">You are already logged in, now you can start helping or asking for help</h2>}
        </div>
    );
}

export default Welcome;