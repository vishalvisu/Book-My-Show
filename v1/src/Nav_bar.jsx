import React from 'react';
import { useState,useEffect } from 'react';
import data from './data.js';
import base_url from './Url.js';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Nav_bar(props)
{

  const [userChoice,setChoice]= useState({
   
    Genre:"Comedy",
    ReleaseWeek:"this",
    Language:"Hindi"
  });

 function ChangeChoice (event)
 {
  let value = event.target.value;
  let name=  event.target.name;

  var obj;
   setChoice((prev)=>
   {
      obj= {
        ...prev,
        [name]: value,
           };
           props.fun(obj);
           return obj;
      });
   }

  // useEffect(() => {

   // props.fun([]);
    /* console.log(data);

    axios.get(`${base_url}/latest_movies/`, 
    {
          params: 
          {
             name:"GONE GIRL"
          }
       }).then(
       (response)=>{
           data.length=0;
         console.log("Connected to backend Succesfully "+response.data);
       },(error)=>{
         toast.error("Something Went Wrong!");
         console.log(error);
       });*/  
         
  //});
     






    return(
        <div className="nav_bar">
        <div className="choice">
      <label for="genre">Genre</label>
      <br/>
      <select name="Genre" id="genre" onChange={ChangeChoice}>
  <option value="Comedy">Comedy</option>
  <option value="Crime">Crime</option>
  <option value="Drama">Drama</option>
  <option value="Horror">Horror</option>
      </select>
    </div>
    <div className="choice">
      <label for="release_week">Release Week</label>
      <br/>
      <select name="ReleaseWeek" id="release_week" onChange={ChangeChoice}>
  <option value="this">this</option>
  <option value="last_week">last_week</option>
  <option value="others">others</option>
      </select>
    </div>

    <div className="choice">
      <label for="Language">Language</label>
      <br/>
      <select name="Language" id="language" onChange={ChangeChoice}>
  <option value="Hindi">Hindi</option>
  <option value="English">English</option>
  <option value="tamil">Tamil</option>
  <option value="Horror">Horror</option>
      </select>
</div>
 </div>
    );

}

export default Nav_bar;