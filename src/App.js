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

function App() {
  const [isLogged, setIsLogged] = useState(Cookies.get("logged"));

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
                  <Route path="/provided/:categoryName/:requiredId" element={<OfferPage />}/>
                  <Route path="*" element={<PageNotFound />} />
              </Routes>
          </Router>
      </div>
  );
}

export default App;
