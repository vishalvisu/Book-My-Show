import React, { useState } from 'react';
import data from './data.js';
import Poster from './Poster.jsx';
import Heading from './Heading.jsx';
import Nav_bar from './Nav_bar';
import Auth from './Auth.jsx';
import {useEffect} from 'react';
import base_url from './Url.js';
import axios from "axios";
import Logout from './Logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function list(val)
{
  return(
    <Poster 
    link={val.link}  
    name={val.name}
    desc={val.desc}
    title={val.title}
    rating={val.rating}
    genre={val.Genre}
    key={val.title}
    />    
  );
}


function Home()
{
//   data=[];  
const [movies,updateMovie]=useState([]);

const update=function Update(choice)
{
  console.log("updated "+choice.Genre+" "+choice.Language+" "+choice.ReleaseWeek);
  axios.get(`${base_url}/latestMovies/`, 
    {
          params: 
          {
             Genre:choice.Genre,
             Language:choice.Language,
             ReleaseWeek:choice.ReleaseWeek
          }
       }).then(
       (response)=>{
         console.log("Connected to backend Succesfully "+response.data.movies);
         updateMovie(response.data.movies);
         console.log(movies.length);
       },(error)=>{
         toast.error("Something Went Wrong!");
         console.log(error);
       });  
};

useEffect(()=>{

},[movies]);

   return(
     <>
      <Heading/>
      <div className="LogOut">
      <Logout/></div>
      <Nav_bar  fun={update}/>     
    <div className="latest_movies">
    {movies.map(list)}
    </div></>);

}

export default Home