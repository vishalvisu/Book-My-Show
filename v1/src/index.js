import React from 'react';
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


ReactDOM.render
(
  <>
  <BrowserRouter>
  <Switch>
              <Route  path="/" component={Login} exact/>
              <SecuredRoute path='/Home' component ={Home} exact/>
              <Route path="/sign_up" component={Sign_up} exact/> 
              <Route path="/Home/Select_location_time" component={Select_location_time} exact/>
              <Route  path="/Home/Select_location_time/Select_Seat" component={Seat_booking} exact/>            
    </Switch>
    </BrowserRouter>
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
