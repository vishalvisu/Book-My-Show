import React from 'react';
import base_url from './Url.js';
import axios from "axios";
import {useHistory} from 'react-router-dom';

export default function Logout()
{
    const history = useHistory();
    function LOGOUT()
    {
        axios.get(`${base_url}/logout`,
        {
           }).then( (response)=>{
               history.push('/');
           },(error)=>{
             console.log(error);
           });
    }
    return(
     
        <button id="logout" onClick={LOGOUT}>Logout</button>
    );
}