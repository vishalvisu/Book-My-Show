import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Switch,useHistory} from 'react-router-dom';
import base_url from './Url.js';
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


axios.defaults.withCredentials=true;
function Login(props)
{
   const history = useHistory();
   const [userInput,setInput]= useState({ 
      username:"",
      password:""
   }); 

 function submit(props)
{
   console.log(userInput);
   console.log("Inside Submit");
   console.log(document.cookie.split(" ")[0].split("=")[1]); 

  
   axios.get(`${base_url}/login`,
   {
      params:{
         username:userInput.username,
         password:userInput.password
      }
      }).then( (response)=>{
        console.log("Connected to backend Succesfully "+response.data.jwt);
        if(response.data=="SUCCESS")
          history.push('/Home');
        else
        console.log(response.data);
      },(error)=>{
        toast.error("Something Went Wrong!");
        console.log(error);
      });
}

useEffect(()=>{
  
   axios.get(`${base_url}/isLogin`,
   {
      }).then( (response)=>{
        console.log("Connected to backend Succesfully "+response.data.jwt);
        if(response.data=="VALID")
          history.push('/Home');
        else
        console.log(response.data);
      },(error)=>{
        toast.error("Something Went Wrong!");
        console.log(error);
      });
},[]);


function inputEvent(event)
{
   let value = event.target.value;
   let name=  event.target.name;

    setInput((prev)=>
    {
      if(name=="username")
      {
         return{
            username:value,
            password:prev.password,
         };
      }
         else
         {
         return {
            password:value,
            username:prev.username,
             };
         }
   });


}
   return(
    <div className="form_container">
    <form className="login_form">
    
    <table>
    
    <tr><td>
    <label for="username">userName</label></td>
    <td>
    <input type="text" id="username" name="username" value={userInput.username} onChange={inputEvent}/>
    </td></tr>

     <tr><td>
    <label for="password">Password</label></td>
    <td>
    <input type="password" id="passsword" name="password" onChange={inputEvent} value={userInput.password} /></td>
    </tr>
   </table>
   
      <button type="button" id="log_btn" onClick={submit}>
      Login</button>
     
   <a href="sign_up">Don't Have Account Click Here</a>
    </form>
    </div>
   );
}

export default Login;