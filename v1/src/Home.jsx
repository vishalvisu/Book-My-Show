import React, { useState } from 'react';
import Poster from './Poster.jsx';
import Heading from './Heading.jsx';
import Nav_bar from './Nav_bar';
import {useEffect} from 'react';
import base_url from './Url.js';
import axios from "axios";
import Logout from './Logout';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';

function Home(props)
{
//   data=[];  
const [movies,updateMovie]=useState([]);
const [city,updateCity]= useState("Kolkata");
console.log(props);

var CHOICE;
const update=function Update(choice)
{
  updateCity(choice.City);
  console.log("updated "+choice.Genre+" "+choice.Language+" "+choice.City);
  axios.get(`${base_url}/latestMovies/`, 
    {
          params: 
          {
             Genre:choice.Genre,
             Language:choice.Language,
             City:choice.City
          }
       }).then(
       (response)=>{
        updateMovie(response.data.movies);
         console.log(movies.length);
       },(error)=>{
         toast.error("Something Went Wrong!");
         console.log(error);
       });
};

const history= useHistory();
function fun2(title)
{
    console.log(props);
    console.log("fun2");
    //props.fun1(title,city);

    let ans=[];
    axios.get(`${base_url}/theatres/`, 
    {
          params: 
          {
             City:city,
             title:title,
          }
       }).then(
       (response)=>{
         console.log(response.data);
         props.fun1(response.data,title,city);
         history.push('/Home/Select_location_time');
       },(error)=>{
         toast.error("Something Went Wrong!");
         console.log(error);
       });
}

useEffect(()=>{

},[movies]);

   return(
     <>
      <Heading/>
      <div className="LogOut">
      <Logout/></div>
      <Nav_bar  fun={update}/>     
    <div className="latest_movies">
    {movies.map((val)=>
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
    fun4={fun2}/>)})
  }
    </div></>);
}

export default Home