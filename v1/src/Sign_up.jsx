import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import axios from "axios";
import base_url from './Url.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Sign_up ()
{
    const [userInput,setInput]= useState({
        username:"",
        email:"",
        phone:"",
        password1:"",
        password2:"",

     });
  
  function submit()
  {    
    console.log(userInput);
     let res={};
    if(check())
    {
    console.log("Valid SignUp");
     
    axios.post(`${base_url}/sign_up`,userInput).then(
        (response)=>{
            document.getElementById("check").innerHTML=response.data;
          console.log(response.data+"response");
        },(error)=>{
          toast.error("Something Went Wrong!");
          console.log(error);
        }
        );

    }
    else 
    console.log("Invalid SignUp");
         
  }
  
  function check()
{
     
    if(userInput.username<=5)
    alert("length of username at least 6");
    else if(userInput.password1<=5)
    alert("length of username at least 6");
    else if(userInput.password1!=userInput.password2)
    alert("both passwords are not matching");
    else
     return true;
     return false;
}
  
  function inputEvent(event)
  {
     let value = event.target.value;
     let name=  event.target.name;
  
      setInput((prev)=>
      {
        return{
           ...prev,
           [name]: value,
        };
        
    });

  }


      return(
      <div className="sign_up">
      <form className="sign_up_form">

      <table>
      <br/><br/>
      <tr><td>
      <label>
          Enter UserName
      </label></td>
      <td>
          <input type="text" name="username" id="new_username" value={userInput.username} onChange={inputEvent} required/>
      </td>
      </tr>
      <tr><td>
      <label>
          Enter Email
      </label></td>
      <td>
          <input type="email" name="email" id="email" value={userInput.email} onChange={inputEvent} required/>
      </td>
      </tr>
      <tr><td>
      <label>
          Enter Mob_No
      </label></td>
      <td>
          <input type="number" name="phone" id="phone" value={userInput.Mob} onChange={inputEvent} pattern="[0-9]{10}" required/>
      </td>
      </tr>

      <tr><td>
      <label>
          Enter Password
      </label></td>
      <td>
          <input type="password" id="password_one" name="password1" value={userInput.password1} onChange={inputEvent} required/>
      </td>
      </tr>
    
      <tr><td>
      <label>
          Re-Enter Password
      </label></td>
      <td>
          <input type="password" id="password_two" name="password2" value={userInput.password2} onChange={inputEvent} required/>
      </td>
      </tr>
      </table>
      <button type="button" id="sign_btn" onClick={submit}>
      Sign_up</button>

      <a href="/">Already Have an Account Click Here</a>
      </form>
      
      <br/><br/>
      <h1  id="check"></h1>
      </div>
    );
}
