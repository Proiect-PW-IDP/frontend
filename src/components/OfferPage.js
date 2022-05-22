import react from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import {Image} from 'cloudinary-react';
import { useAuth0 } from "@auth0/auth0-react";
import EditOfferModal from './EditOfferModal';

const OfferPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [modalOpen, setModalOpen] = useState(false);
    const { myOffer, offerType, category, offer } = location.state;
    const {
        isLoading,
        error,
        isAuthenticated,
        user,
        getAccessTokenSilently,
        loginWithRedirect,
        logout,
      } = useAuth0();
      const [currentOffer, setCurrentOffer] = useState(offer);
      const [offerUser, setOfferUser] = useState("");
      const [currentUser, setCurrentUser] = useState("");
      const [isInterested, setIsInterested] = useState(false);
    
      useEffect(() => {
        Axios.get("http://localhost:8000/offer/?offerId=" + offer.id).then( (response) => { 
          console.log(response);
          setCurrentOffer(response.data)
        });

        Axios.get("http://localhost:8000/user/?userId=" + offer.userId).then( (response) => { 
          console.log(response);
          setOfferUser(response.data)
        });

        Axios.get("http://localhost:8000/user/email?email=" + user.email).then( (response) => { 
          console.log(response);
          setCurrentUser(response.data)
        });

        Axios.get("http://localhost:8000/interest/email?userEmail=" + user.email + "&offerId=" + offer.id).then( (response) => { 
          console.log(response);
          if (response.data.localeCompare("") != 0) {
            setIsInterested(true);
          } else {
            setIsInterested(false);
          }
          console.log(isInterested);
        });
      }, [modalOpen]);
  

      const handleSendNotification = () => {
        const notification = {
            "senderEmail": user.email,
            "userOfferEmail": offerUser.email,
            "message": offer.title + " from " + offer.category + " " + (offerType.localeCompare("required") == 0 ? "I can provide it" : "I need it")
        };

      console.log(notification);
      

      Axios.post('http://localhost:8000/offer/provided/category/sender', notification)
        .then( (response) => { 
          console.log(response);
      });

      const interest = {
        "userId": currentUser.id,
        "offerId": offer.id
    };

  console.log(notification);
  

  Axios.post('http://localhost:8000/interest', interest)
    .then( (response) => { 
      console.log(response);
      setIsInterested(true);
  });      
  
    }

    return (
        <section class="text-gray-600 body-font overflow-hidden">
            <div class="container px-5 py-24 mx-auto">
                <div class="lg:w-4/5 mx-auto flex flex-wrap">
                {!modalOpen && (currentOffer.image.localeCompare("") == 0 ?
                  <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400"/> :
                  <Image style={{width: 400, height: 400}} class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" cloudName="btc-cloud" publicId={currentOffer.image}/>)  
                }
                {!modalOpen && <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h2 class="text-sm title-font text-gray-900 font-medium tracking-widest">{currentOffer.category}</h2>
                    <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{currentOffer.title}</h1>
                    <div class="flex mb-4">
                    </div>
                    <p class="leading-relaxed"><span class="text-gray-900 font-medium">Type:</span> {currentOffer.provided ? "Provided" : "Required"}</p>
                    <p class="leading-relaxed"><span class="text-gray-900 font-medium">Details:</span> {currentOffer.details}</p>
                    <div class="flex-1 mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                        <h2 class="text-gray-900 text-xl title-font font-medium mb-1">Contact</h2>
                        <p class="leading-relaxed"><span class="text-gray-900 font-medium">Email:</span> {offerUser.email}</p>
                        <p class="leading-relaxed"><span class="text-gray-900 font-medium">Telephone:</span> {currentOffer.telephone}</p>
                        <p class="leading-relaxed"><span class="text-gray-900 font-medium">Address:</span> {currentOffer.address}</p>
                    </div>
                    <div class="flex">
                    <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                    onClick={() => {
                        if(myOffer) {setModalOpen(true);} else {
                          handleSendNotification();
                        }
                      }}>
                        {myOffer ? "Edit" : offerType.localeCompare("required") == 0 ? "I can provide it" : "I need it"}
                    </button>
                    </div>
                    {isInterested && <h2 class="text-sm title-font text-gray-900 font-medium tracking-widest">You are interested</h2>}
                </div>}
                </div>
                {modalOpen && <EditOfferModal setOpenModal={setModalOpen} offer={currentOffer}/>}
            </div>
        </section>
    )
}

export default OfferPage;