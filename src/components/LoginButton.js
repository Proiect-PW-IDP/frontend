import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <button className="bg-white hover:bg-blue-300 p-3 rounded-lg cursor-pointer outline-none" onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;
