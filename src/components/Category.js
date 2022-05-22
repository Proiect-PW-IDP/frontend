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
  import { useAuth0 } from "@auth0/auth0-react";
  import {Image} from 'cloudinary-react';
  import CreateCategoryModal from './CreateCategoryModal';
  import EditCategoryModal from './EditCategoryModal';

const Category = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const {
        isLoading,
        error,
        isAuthenticated,
        user,
        getAccessTokenSilently,
        loginWithRedirect,
        logout,
    } = useAuth0();


    const { offerType } = location.state;

    const [categoryList, setCategoryList] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("");

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      Axios.get("http://localhost:8081/category/all").then( (response) => {
        console.log(response);
        setCategoryList(response.data);
        console.log("User");
        console.log(user)
        console.log(user.email);
        console.log("Logat");
        console.log(isAuthenticated);
      });

      if (user["http://my-api.com/roles"].length !=0 ) {
        if (user["http://my-api.com/roles"][0].localeCompare("app admin") == 0) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
      } else {
          setIsAdmin(false);
      }

    }, [modalOpen, editModalOpen]);

    const transformCategory = (element) => {
        return (
            <div class="p-4 md:w-1/3">
            <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            {element.image.localeCompare("") == 0 ?
                  <img alt="ecommerce" class="lg:h-48 md:h-36 w-full object-cover object-center" src="https://dummyimage.com/721x401"/> :
                  <Image class="lg:h-48 md:h-36 w-full object-cover object-center" cloudName="btc-cloud" publicId={element.image}/>  
            }
            <div class="p-6">
                <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2>
                <h1 class="title-font text-lg font-medium text-gray-900 mb-3">{element.name}</h1>
                <p class="leading-relaxed mb-3">{element.description}</p>
                <div class="flex items-center flex-wrap">
                <Link to={"/" + offerType +"/" + element.name} state={{offerType: offerType, category: element}} class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                    {offerType.localeCompare("required") == 0 ? "Go to the required products page" : "Go to the provided products page"}
                    <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                    </svg>
                </Link>
                </div>
                {(!modalOpen && !editModalOpen && isAdmin) && <button onClick={() => {
                    setSelectedCategory(element);
                    setEditModalOpen(true);
                    }} class="block text-white bg-blue-700 mt-5 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-5" type="button" data-modal-toggle="defaultModal">
                    Edit category
                </button>}
            </div>
            </div>
        </div>
        )
    }

    return (
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
            <div class="flex">
                <h1 class="title-font flex-1 text-2xl font-medium text-gray-900 mb-5 ml-1">
                {offerType.localeCompare("required") == 0 ? "Required categories" : "Provided categories    "}
                </h1>
                {(!modalOpen && !editModalOpen && isAdmin) && <button onClick={() => {
                    setModalOpen(true);
                    }} class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-5" type="button" data-modal-toggle="defaultModal">
                    Create category
                </button>}
            </div>
            {modalOpen && <CreateCategoryModal setOpenModal={setModalOpen}/>}
             {!modalOpen && !editModalOpen && <div class="flex flex-wrap -m-4">
                {categoryList.map(element => {
                    return transformCategory(element)
                 })}
                </div>
            }
            {editModalOpen && <EditCategoryModal setEditOpenModal={setEditModalOpen} category={selectedCategory}/>}
            </div>
        </section>
    );
}

export default Category;