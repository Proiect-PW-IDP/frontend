import react from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LogoutButton from "./LogoutButton";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import { useAuth0 } from "@auth0/auth0-react";
  import {Image} from 'cloudinary-react';


const Navbar = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const {
        isLoading,
        error,
        isAuthenticated,
        user,
        getAccessTokenSilently,
        loginWithRedirect,
        logout,
    } = useAuth0();
    const navigate = useNavigate();
    const location = useLocation();
    const [url, setUrl] = useState(location.pathname);

    useEffect(() => {
        setUrl(location.pathname);
      });

    const handleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    }

    const handleSignOut = () => {
        Cookies.remove("logged");
        navigate("/");
    }

    console.log(url);

    return (
        <nav class="bg-gray-800">
            <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div class="relative flex items-center justify-between h-16">
                    <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    
                        <div class="flex-shrink-0 flex items-center">
                            <Image class="hidden lg:block h-8 w-auto" cloudName="btc-cloud" publicId="https://res.cloudinary.com/btc-cloud/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1653050002/savePeop_xphyyd.png"/> 
                        </div>

                        <div class="hidden sm:block sm:ml-6">
                            <div class="flex space-x-4">
                    
                                {url.localeCompare("/") == 0 ?
                                     <Link to={"/home"} class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Home
                                     </Link> :
                                    <Link to={"/home"} class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Home
                                    </Link>
                                }

                                {url.includes("/required") ?
                                     <Link to={"/required/category"} state={{offerType: "required"}} class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Required
                                     </Link> :
                                    <Link to={"/required/category"} state={{offerType: "required"}} class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Required
                                    </Link>
                                }

                                {url.includes("/provided") ?
                                    <Link to={"/provided/category"} state={{offerType: "provided"}} class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Provided
                                    </Link> :
                                    <Link to={"/provided/category"} state={{offerType: "provided"}} class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Provided
                                    </Link>
                                }

                                {url.includes("/myOffers") ?
                                    <Link to={"/myOffers"} class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                                        My Offers
                                    </Link> :
                                    <Link to={"/myOffers"} class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        My Offers
                                    </Link>
                                }  
                            </div>
                        </div>
                    </div>

                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button type="button" class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span class="sr-only">View notifications</span>

                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    </button>


                    <div class="ml-3 relative">
                    <div>
                        <button type="button" class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true"
                        onClick={handleUserMenu}>
                        <span class="sr-only">Open user menu</span>
                        {isAuthenticated ?
                        <img class="h-8 w-8 rounded-full" src={user.picture} alt=""/> :
                        <img class="h-8 w-8 rounded-full" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt=""/>
                        }
                        </button>
                    </div>

                    {isUserMenuOpen && <div class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
            
                        <a href="/required" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
                        <LogoutButton/>
                    </div>}
                    </div>
                    
                </div>
                </div>
            </div>


            <div class="sm:hidden" id="mobile-menu">
                <div class="px-2 pt-2 pb-3 space-y-1">

                <a href="#" class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Dashboard</a>

                <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>

                <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>

                <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;