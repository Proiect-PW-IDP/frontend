import react from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';


const Home = ({setIsLogged}) => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Home</h1>

            <button
                onClick={() => {
                    Cookies.remove("logged");
                    setIsLogged(false);
                    navigate("/");
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default Home;