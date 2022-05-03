
import react from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = ({setIsLogged}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();

        const user = {
            "username": username,
            "password": password,
        };

        console.log(user);
        if (user.username == "clau" && user.password == "clau") {
            Cookies.set("logged", true);
            setIsLogged(true);
            navigate("/home");
        }
    }

    return (
        <div class="bg-gray-300 min-h-screen flex flex-col">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center">Login</h1>
                    <input 
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)} />

                    <input 
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />

                    <div class="mb-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <label class="block font-bold" for="remember">
                                        <input class="ml-2 leading-tight" type="checkbox" id="remember" name="remember"/>
                                        <span class="text-sm ml-2">
                                            Remember me
                                        </span>
                                    </label>
                                </div>
                                <div>
                                    <a class="font-bold text-sm text-orange-500 hover:text-orange-700" href="#password-request">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                        </div>

                    <button className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 rounded-md text-white text-sm text-center"
                        onClick={handleLogin}>
                    Login</button>

                </div>

                <div class="text-grey-dark text-center mt-6">
                    Don't have an account? 
                    <a class="no-underline text-blue-500 ml-2" href="/signup">
                        SignUp
                    </a>.
                </div>
            </div>
        </div>
    )
}

export default Login;