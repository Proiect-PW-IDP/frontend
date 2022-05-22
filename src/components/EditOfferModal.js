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
  import {Image} from 'cloudinary-react';
  import { useAuth0 } from "@auth0/auth0-react";

const EditOfferModal = ({setOpenModal, offer}) => {
    const [title, setTitle] = useState(offer.title);
    const [details, setDetails] = useState(offer.details);
    const [telephone, setTelephone] = useState(offer.telephone);
    const [address, setAddress] = useState(offer.address);
    const [categoryList, setCategoryList] = useState([]);
    const [imageSelected, setImageSelected] = useState(null);
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

    useEffect(() => {
      Axios.get("http://localhost:8000/category/all").then( (response) => { 
        console.log(response);
        setCategoryList(response.data);
      });
    }, []);

    const transformCategory = (element) => {
        if(element.name.localeCompare(offer.category) != 0) {
        return (
            <option value={element.name}>{element.name}</option>
        )
        }
    }

    const handleDeleteOffer = () => {
        Axios.delete("http://localhost:8000/offer?offerId=" + offer.id).then( (response) => { 
          console.log(response);
          setOpenModal(false);
          navigate("/myOffers");
        });
    }

    const handleCreateOffer = (event) => {
        event.preventDefault();

        var categorySelect = document.getElementById("categorySelect");
        var typeSelect = document.getElementById("typeSelect");

        const editedOffer = {
            "id": offer.id,
            "userId": 1,
            "title": title,
            "details": details,
            "telephone": telephone,
            "address": address,
            "category": categorySelect.options[categorySelect.selectedIndex].value,
            "provided": typeSelect.options[typeSelect.selectedIndex].value
        };

        console.log(editedOffer);

        console.log(imageSelected);
        if (imageSelected != null) {
          const formData = new FormData();
          formData.append("file", imageSelected);
          formData.append("upload_preset", "rcoqg6hm");
    
          Axios.post("https://api.cloudinary.com/v1_1/btc-cloud/image/upload", formData)
          .then((response) => {
            console.log("Cloud Response")
            console.log(response);
            editedOffer.image=response.data.secure_url;
            console.log(editedOffer);

            Axios.post('http://localhost:8000/offer/email?userEmail=' + user.email, editedOffer)
              .then( (response) => { 
                console.log(response);
                setOpenModal(false);
            });
          })
        } else {
          editedOffer.image = offer.image;
          Axios.post('http://localhost:8000/offer/email?userEmail=' + user.email, editedOffer)
              .then( (response) => { 
                console.log(response);
                setOpenModal(false);
            });
        }
    }

    const uploadImage = () => {
      console.log(imageSelected);
      const formData = new FormData();
      formData.append("file", imageSelected);
      formData.append("upload_preset", "rcoqg6hm");

      Axios.post("https://api.cloudinary.com/v1_1/btc-cloud/image/upload", formData)
      .then((response) => {
        console.log("Cloud Response")
        console.log(response);
      })

      const image = imageSelected.name.slice(0, -4);
      console.log(image);
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
          <h1>Do You Want to Edit This Offer?</h1>
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
            <input 
                            type="text"
                            pattern="[0-9]*"
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="telephone"
                            placeholder="Telephone"
                            value={telephone}
                            onChange={e => setTelephone((v) => (e.target.validity.valid ? e.target.value : v))} />
            <input 
                            type="text"
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="address"
                            placeholder="Address"
                            value={address}
                            onChange={e => setAddress(e.target.value)} />
            <input 
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            placeholder="Image"
                            onChange={(event) => {setImageSelected(event.target.files[0])}} />
            <div class="flex justify-center">
                <div class="mb-3 xl:w-96">
                    <select id="typeSelect" class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-grey-light rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                        <option value={offer.provided}>{offer.provided ? "Provided" : "Required"}</option>
                        <option value={!offer.provided}>{offer.provided ? "Required" : "Provided"}</option>
                    </select>
                </div>
            </div>
            <div class="flex justify-center">
                <div class="mb-3 xl:w-96">
                    <select id="categorySelect" class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-grey-light rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                       <option value={offer.category}>
                        {offer.category}
                      </option>
                        {categoryList.map(element => {
                            return transformCategory(element)
                        })}
                    </select>
                </div>
            </div>
        </div>
        <div className="flex justify-center items-center">
        <button onClick={handleCreateOffer} className='w-40 h-12 m-2 text-white rounded-lg text-xl cursor-pointer border-none bg-blue-700'>Edit</button>
          <button
            onClick={handleDeleteOffer}
            className="w-40 h-12 m-2 text-white rounded-lg text-xl cursor-pointer border-none bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    );
}

export default EditOfferModal;