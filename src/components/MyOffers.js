import react from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CreateOfferModal from './CreateOfferModal';
import {Image} from 'cloudinary-react';
import { useAuth0 } from "@auth0/auth0-react";

const MyOffers = () => {
    const navigate = useNavigate();
    const [offerRequiredList, setOfferRequiredList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const {
      isLoading,
      error,
      isAuthenticated,
      user,
      getAccessTokenSilently,
      loginWithRedirect,
      logout,
    } = useAuth0();

    useEffect(() => {
      Axios.get("http://localhost:8000/offer/all/myOffers/?userEmail=" + user.email).then( (response) => { 
        console.log(response);
        setOfferRequiredList(response.data);
      });
    }, [modalOpen]);

    const transformOffer = (element) => {
        return (
          <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
              <Link to={"/myOffers/" + element.id} state={{myOffer: true, offer: element}} class="block relative h-48 rounded overflow-hidden">
                {element.image.localeCompare("") == 0 ?
                  <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="https://dummyimage.com/421x261"/> :
                  <Image class="object-cover object-center w-full h-full block" cloudName="btc-cloud" publicId={element.image}/>  
                }
              </Link>
              <div class="mt-4">
                <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                <h2 class="text-gray-900 title-font text-lg font-medium">{element.category}</h2>
                <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">{element.provided ? "Provided" : "Required"}</h3>
                <p class="mt-1">{element.title}</p>
              </div>
            </div>
        )
    }

    return (
        <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
            <div class="flex">
        <h1 class="title-font flex-1 text-2xl font-medium text-gray-900 mb-5 ml-1">
          My Offers
        </h1>
        {!modalOpen && <button onClick={() => {
          setModalOpen(true);
        }} class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-5" type="button" data-modal-toggle="defaultModal">
          Create offer
        </button>}
        </div>
        {modalOpen && <CreateOfferModal setOpenModal={setModalOpen}/>}
        {!modalOpen && 
        <div class="flex flex-wrap -m-4">
          {offerRequiredList.map(element => {
             return transformOffer(element)
          })}
          </div>
        }
        </div>
      </section>
    )
}

export default MyOffers;