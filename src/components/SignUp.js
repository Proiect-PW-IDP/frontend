import react from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [address, setAddress] = useState("");
    const [isSamePassword, setIsSamePassword] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (password.localeCompare(confirmPassword) != 0) {
            setIsSamePassword(false);
        } else {
            setIsSamePassword(true);
        }
      });

    const handleSignup = (event) => {
        event.preventDefault();

        const user = {
            "username": username,
            "password": password,
            "name": name,
            "email": email,
            "telephone": telephone,
            "address": address
        };

        if (user.username == "clau" && user.password == "clau") {
            navigate("/login");
        }

    }

    return (
        <div class="bg-gray-300 min-h-screen flex flex-col">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center">Sign up</h1>
                    <input 
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fullname"
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)} />

                    <input 
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />

                    <input 
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="telephone"
                        placeholder="Telephone"
                        value={telephone}
                        onChange={e => setTelephone(e.target.value)} />

                    <input 
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="address"
                        placeholder="Address"
                        value={address}
                        onChange={e => setAddress(e.target.value)} />

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

                    {!isSamePassword && <p class="text-center text-red-500">Passwords are not the same</p>}

                    <input 
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)} />

                    <button className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 rounded-md text-white text-sm text-center"
                        onClick={handleSignup}>
                    Create account</button>

                    <div class="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <a class="no-underline border-b border-grey-dark text-grey-dark ml-1" href="#">
                            Terms of Service
                        </a> and 
                        <a class="no-underline border-b border-grey-dark text-grey-dark ml-1" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div class="text-grey-dark text-center mt-6">
                    Already have an account? 
                    <a class="no-underline text-blue-500 ml-2" href="/login">
                        Login
                    </a>.
                </div>
            </div>
        </div>
    )
}

export default Signup;