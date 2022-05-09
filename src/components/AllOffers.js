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

const AllOffers = () => {
    const navigate = useNavigate();
    const [offerRequiredList, setOfferRequiredList] = useState([]);
    const location = useLocation();
    const { offerType, category } = location.state;

    useEffect(() => {
      Axios.get("http://localhost:8081/offer/" + offerType + "/category/" + "?categoryName=" + category.name).then( (response) => { 
        console.log(response);
        setOfferRequiredList(response.data);
      });
    }, []);

    const transformOffer = (element) => {
        return (
          <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
              <Link to={"/" + offerType + "/" + category.name + "/" + element.id} state={{offerType: offerType, category: category, offer: element}} class="block relative h-48 rounded overflow-hidden">
                <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="https://dummyimage.com/421x261"/>
              </Link>
              <div class="mt-4">
                <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                <h2 class="text-gray-900 title-font text-lg font-medium">{element.category}</h2>
                <p class="mt-1">{element.title}</p>
              </div>
            </div>
        )
    }

    return (
        <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
        <h1 class="title-font text-2xl font-medium text-gray-900 mb-5 ml-1">
          { offerType.localeCompare("required") == 0 ? "Required offers - " + category.name : "Provided offers - " + category.name}
        </h1>
          <div class="flex flex-wrap -m-4">
          {offerRequiredList.map(element => {
             return transformOffer(element)
          })}
          </div>
        </div>
      </section>
    )
}

export default AllOffers;