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

const Category = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { offerType } = location.state;

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
      Axios.get("http://localhost:8081/category/all").then( (response) => { 
        console.log(response);
        setCategoryList(response.data);
      });
    }, []);

    const transformCategory = (element) => {
        return (
            <div class="p-4 md:w-1/3">
            <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <img class="lg:h-48 md:h-36 w-full object-cover object-center" src="https://dummyimage.com/721x401" alt="blog"/>
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
            </div>
            </div>
        </div>
        )
    }

    return (
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
            <h1 class="title-font text-2xl font-medium text-gray-900 mb-5 ml-1">
            {offerType.localeCompare("required") == 0 ? "Required categories" : "Provided categories    "}
            </h1>
                <div class="flex flex-wrap -m-4">
                {categoryList.map(element => {
                    return transformCategory(element)
                 })}
                </div>
            </div>
        </section>
    );
}

export default Category;