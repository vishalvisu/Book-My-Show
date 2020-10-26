import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import React from 'react';
import './index.css';

function Poster(props)
{  

  function handleClick()
  {
    props.fun4(props.title);
  }
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

  <button className="book_btn" onClick={handleClick}>Book_Now</button>
   
   </div></div>
   </>
     );
}

export default Poster;