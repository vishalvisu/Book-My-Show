import Axios from 'axios';
import React from 'react';
import axios from "axios";
import { Redirect, Route } from 'react-router-dom';
import Login from './Login';
import base_url from './Url.js';
import { useAsync } from 'react-async';
import Home from './Home';

// Then we'll fetch user data from this API
const loadUsers = async () =>
  await axios.get(`${base_url}/isLogin`)
    .then(res => ((res.status==200)? res : Promise.reject(res)))
    .then(res => res.data);


export default function SecuredRoute(props) {
  const { data, error, isLoading } = useAsync({ promiseFn: loadUsers });
  if (isLoading) return "LOADING";
  if (error) return "ERROR";
  if (data=="VALID")
  {
     return(<Route path={props.path} component={props.component} exact/>);
  }
  else
  {
      console.log(data);
   return(<Redirect to='/' component={Login} exact/>);   
  }
}