import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login';
import * as serviceWorker from './serviceWorker';
import Sign_up from './Sign_up';
import Seat_booking from './Seat_booking.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home.jsx';
import Select_location_time from './Select_location_time.jsx';
import SecuredRoute from './SecuredRoute';
import Seat_Layout from './Seat_Layout';

var names=[],city,title;

function store(a,b,c)
{
   console.log(a);
   console.log(b);
    names=a;
    title=b;
    city=c;
}

var cinemaId,tm;
function cinemaId_Time(x,y)
{
    cinemaId=x;
    tm=y;
}

ReactDOM.render
(
  <>
  <BrowserRouter>
  <Switch>
              <Route  path="/" component={Login} exact/>
              <SecuredRoute fun1={store} path='/Home' component={Home} exact/>
              <Route path="/sign_up" component={Sign_up} exact/> 
              <Route path="/Home/Select_location_time" 
               render={() =><Select_location_time CinemasName={names} City={city} send={cinemaId_Time}/>}
               exact/>
              <Route  path="/Home/Select_location_time/Select_Seat"
               render={() =><Seat_booking cinemaId={cinemaId} tm={tm} title={title}/>} exact/>            
    </Switch>
    </BrowserRouter>
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
