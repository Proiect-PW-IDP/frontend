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

const CreateCategoryModal = ({setOpenModal}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageSelected, setImageSelected] = useState("");
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

    const handleCreateCategory = (event) => {
        event.preventDefault();

        const category = {
            "name": name,
            "description": description
        };

        console.log(category);

        console.log(imageSelected);
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "rcoqg6hm");
  
        Axios.post("https://api.cloudinary.com/v1_1/btc-cloud/image/upload", formData)
        .then((response) => {
          console.log("Cloud Response")
          console.log(response);
          category.image=response.data.secure_url;
          console.log(category);

          Axios.post('http://localhost:8081/category', category)
            .then( (response) => { 
              console.log(response);
              setOpenModal(false);
          });
        })
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
          <h1>Do You Want to Create a Category?</h1>
        </div>
        <div className="bg-white px-6 py-8 text-black w-full">
            <input 
                            type="text"
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="name"
                            placeholder="Name"
                            value={name}
                            onChange={e => setName(e.target.value)} />
            <input 
                            type="text"
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="description"
                            placeholder="Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)} />
            <input 
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            placeholder="Image"
                            onChange={(event) => {setImageSelected(event.target.files[0])}} />
        </div>
        <div className="flex justify-center items-center">
        <button onClick={handleCreateCategory} className='w-40 h-12 m-2 text-white rounded-lg text-xl cursor-pointer border-none bg-blue-700'>Create</button>
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

export default CreateCategoryModal;