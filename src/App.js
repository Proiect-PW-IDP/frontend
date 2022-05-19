import './App.css';
import react, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginButton from "./components/LoginButton";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Cookies from "js-cookie";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Welcome from "./components/Welcome";
import Navbar from './components/Navbar';
import AllOffers from './components/AllOffers';
import OfferPage from './components/OfferPage';
import Category from './components/Category';
import MyOffers from './components/MyOffers';
import { useAuth0 } from "@auth0/auth0-react";
import Axios from 'axios';

function App() {
  const [isLogged, setIsLogged] = useState(Cookies.get("logged"));
    const {
        isLoading,
        error,
        isAuthenticated,
        user,
        getAccessTokenSilently,
        loginWithRedirect,
        logout,
    } = useAuth0();
    const [accessToken, setAccessToken] = useState(null);

    const createNewAccount = () => {
        const newUser = {
            "email": user.email,
        };

        Axios.post('http://localhost:8081/user', newUser)
            .then( (response) => { 
              console.log(response);
          });
    }

    useEffect(() => {
        const getAccessToken = async () => {
            try {
                const accessToken = await getAccessTokenSilently({
                    audience: "http://my-api.com",
                    scope: "read:users",
                });
                setAccessToken(accessToken);
            } catch (e) {
                console.log(e.message);
            }
        };
        getAccessToken();
    }, [getAccessTokenSilently]);

    const securedAPITest = () => {
        fetch("http://localhost:8081/auth0/private", {
            method: "GET",
            headers: new Headers({
                Authorization: "Bearer " + accessToken,
                "Content-Type": "application/json",
            }),
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (resJson) {
                console.log(resJson)
                console.log(user)
                if (isAuthenticated) {
                    createNewAccount();
                }
            })
            .catch((e) => console.log(e));
    };
    securedAPITest();
    
    return (
      <div>
          <Router>
              <Navbar />
              <Routes>
                  <Route path="/" element={<Welcome />}/>
                  <Route element={<ProtectedRoutes isLogged={isLogged}/>}>
                      <Route path="/home" element={<Home setIsLogged={setIsLogged}/>} />
                  </Route>
                  <Route path="/category" element={<Category />} />
                  <Route path="/required/category" element={<Category />} />
                  <Route path="/required/:categoryName" element={<AllOffers />} />
                  <Route path="/required/:categoryName/:requiredId" element={<OfferPage />}/>
                  <Route path="/provided/category" element={<Category />} />
                  <Route path="/provided/:categoryName" element={<AllOffers />} />
                  <Route path="/provided/:categoryName/:providedId" element={<OfferPage />}/>
                  <Route path="/myOffers" element={<MyOffers />}/>
                  <Route path="/myOffers/:myOfferId" element={<OfferPage />}/>
                  <Route path="*" element={<PageNotFound />} />
              </Routes>
          </Router>
      </div>
  );
}

export default App;
