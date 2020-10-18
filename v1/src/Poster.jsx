import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import React from 'react';
import './index.css';

function Poster(props)
{  
   return(
    <>
    <div className="poster">
   <img className="card-img-top" src={props.link} alt="alternate"/>
 <div className="card-body">
   <h4 className="card-title">{props.title}</h4>
   <h3 className="card-title">{props.genre}</h3>
   <h4 className="rating">IMDB:<strong className="rate">{props.rating}</strong></h4>
   <div className="desc">
   <h3 className="card-text">{props.desc}</h3>
   </div>
   </div>
   <div className="book_ticket">
  
     <a id="book_now" href='/Home/Select_location_time' target="blank">
  <button className="book_btn">Book_Now</button>
     </a>

   
   </div></div>
   </>
     );
}

export default Poster;