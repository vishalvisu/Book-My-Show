import React, { useState } from 'react';
import data from './data.js';
import Poster from './Poster.jsx';
import Heading from './Heading.jsx';
import Nav_bar from './Nav_bar';
import {useEffect} from 'react';
import base_url from './Url.js';
import axios from "axios";
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
    />    
  );
}


function Home()
{
//   data=[];  
const [movies,updateMovie]=useState([]);

movies.concat(data);
const update=function Update(choice)
{
  console.log("updated "+choice.Genre+" "+choice.Language+" "+choice.ReleaseWeek);
  //   updateMovie([]);
  //  updateMovie(arr);
  axios.get(`${base_url}/latest_movies/`, 
    {
          params: 
          {
             name:"GONE GIRL"
          }
       }).then(
       (response)=>{
         console.log("Connected to backend Succesfully "+response.data.movies);
         updateMovie(response.data.movies);
         console.log(movies);
       },(error)=>{
         toast.error("Something Went Wrong!");
         console.log(error);
       });  
};

useEffect(()=>{

});

   return(
     <>
      <Heading/>
      <Nav_bar  fun={update}/>     
    <div className="latest_movies">
    {movies.map(list)}
    </div></>);

}

export default Home