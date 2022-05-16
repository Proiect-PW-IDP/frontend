import react from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Axios from 'axios';
import LogoutButton from "./LogoutButton";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const CreateOfferModal = ({setOpenModal}) => {
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      Axios.get("http://localhost:8081/category/all").then( (response) => { 
        console.log(response);
        setCategoryList(response.data);
      });
    }, []);

    const transformCategory = (element) => {
        return (
            <option value={element.name}>{element.name}</option>
        )
    }

    const handleCreateOffer = (event) => {
        event.preventDefault();

        var categorySelect = document.getElementById("categorySelect");
        var typeSelect = document.getElementById("typeSelect");

        const offer = {
            "userId": 1,
            "title": title,
            "details": details,
            "category": categorySelect.options[categorySelect.selectedIndex].value,
            "provided": typeSelect.options[typeSelect.selectedIndex].value
        };

        console.log(offer);

        Axios.post('http://localhost:8081/offer', offer)
          .then( (response) => { 
            console.log(response);
            setOpenModal(false);
        });
    }

     return (
        <div className="bg-white relative flex justify-center items-center w-500 h-500">
      <div className="bg-white flex flex-col p-6 w-500 h-500 rounded-xl shadow-2xl">
        <div className="flex justify-end">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            className="bg-transparent text-2xl cursor-pointer border-none"
          >
            X
          </button>
        </div>
        <div className="inline-block text-center my-5 text-3xl">
          <h1>Do You Want to Create an Offer?</h1>
        </div>
        <div className="bg-white px-6 py-8 text-black w-full">
            <input 
                            type="text"
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="title"
                            placeholder="Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)} />
            <input 
                            type="text"
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="details"
                            placeholder="Details"
                            value={details}
                            onChange={e => setDetails(e.target.value)} />
            <div class="flex justify-center">
                <div class="mb-3 xl:w-96">
                    <select id="typeSelect" class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-grey-light rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                        <option value="false">Required</option>
                        <option value="true">Provided</option>
                    </select>
                </div>
            </div>
            <div class="flex justify-center">
                <div class="mb-3 xl:w-96">
                    <select id="categorySelect" class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-grey-light rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                        {categoryList.map(element => {
                            return transformCategory(element)
                        })}
                    </select>
                </div>
            </div>
        </div>
        <div className="flex justify-center items-center">
        <button onClick={handleCreateOffer} className='w-40 h-12 m-2 text-white rounded-lg text-xl cursor-pointer border-none bg-blue-700'>Create</button>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            className="w-40 h-12 m-2 text-white rounded-lg text-xl cursor-pointer border-none bg-red-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    );
}

export default CreateOfferModal;