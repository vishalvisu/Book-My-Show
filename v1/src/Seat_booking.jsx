import React from 'react';
import base_url from './Url.js';
import axios from "axios";
import Heading from './Heading.jsx';
import Screen from './Screen.jsx';
import Seat_Layout from './Seat_Layout.jsx';
import { useHistory } from 'react-router-dom';

function Seat_booking(props)
{
   var seat=[];

  const history= useHistory();

   console.log(props);
   function fun(list)
   {
         seat=list;
         console.log(seat);
   }

   function BookTicket()
   {
      axios.get(`${base_url}/bookTicket`,
   {
      params:{
          
         title:props.title,
         CinemaId:props.cinemaId,
         format_time:props.tm,
         seats:seat,
         format_date:new Date().toLocaleDateString()
      }
      }).then( (response)=>{
        console.log("Connected to backend Succesfully "+response.data);
        if(response.data=="BOOKED")
          history.push('https://www.youtube.com/watch?v=5ZR7VVZE98c');
        else
         history.push('https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript');
      },(error)=>{
        console.log(error);
      });
 

   }

   return(
   <div>
      <div className="seat_layout">
  <Heading/>
  <Seat_Layout  send={fun}/>
  </div>
  <Screen/>
  <div className=".container" id="PayBtn">
       <button id="pay_btn" onClick={BookTicket}>
           PayNow
       </button>
       </div>
    </div>
   );
}

export default Seat_booking;