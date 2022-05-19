import react from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import {Image} from 'cloudinary-react';
import { useAuth0 } from "@auth0/auth0-react";

const OfferPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { myOffer, offerType, category, offer } = location.state;
    const [user, setUser] = useState({});

    useEffect(() => {
        Axios.get("http://localhost:8081/user?userId=" + offer.userId).then( (response) => { 
          console.log(response);
          setUser(response.data);
        });
      }, []);

    return (
        <section class="text-gray-600 body-font overflow-hidden">
            <div class="container px-5 py-24 mx-auto">
                <div class="lg:w-4/5 mx-auto flex flex-wrap">
                {offer.image.localeCompare("") == 0 ?
                  <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400"/> :
                  <Image class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" cloudName="btc-cloud" publicId={offer.image}/>  
                }
                <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h2 class="text-sm title-font text-gray-900 font-medium tracking-widest">{offer.category}</h2>
                    <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{offer.title}</h1>
                    <div class="flex mb-4">
                    </div>
                    <p class="leading-relaxed"><span class="text-gray-900 font-medium">Type:</span> {offer.provided ? "Provided" : "Required"}</p>
                    <p class="leading-relaxed"><span class="text-gray-900 font-medium">Details:</span> {offer.details}</p>
                    <div class="flex-1 mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                        <h2 class="text-gray-900 text-xl title-font font-medium mb-1">Contact</h2>
                        <p class="leading-relaxed"><span class="text-gray-900 font-medium">Username:</span> {user.username}</p>
                        <p class="leading-relaxed"><span class="text-gray-900 font-medium">Name:</span> {user.name}</p>
                        <p class="leading-relaxed"><span class="text-gray-900 font-medium">Email:</span> {user.email}</p>
                        <p class="leading-relaxed"><span class="text-gray-900 font-medium">Telephone:</span> {user.telephone}</p>
                    </div>
                    <div class="flex">
                    <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                        {myOffer ? "Edit" : offerType.localeCompare("required") == 0 ? "I can provide it" : "I need it"}
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}

export default OfferPage;