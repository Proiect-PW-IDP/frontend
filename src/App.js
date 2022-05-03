import './App.css';
import react, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Cookies from "js-cookie";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Welcome from "./components/Welcome"; 
import Navbar from './components/Navbar';

function App() {
  const [isLogged, setIsLogged] = useState(Cookies.get("logged"));

  return (
      <div>
          <Router>
              <Navbar />
              <Routes>
                  <Route path="/" element={<Welcome />}/>
                  <Route path="/login" element={<div> <Login setIsLogged={setIsLogged}/> </div>} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route element={<ProtectedRoutes isLogged={isLogged}/>}>
                      <Route path="/home" element={<Home setIsLogged={setIsLogged}/>} />
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
              </Routes>
          </Router>
      </div>
  );
}

export default App;
