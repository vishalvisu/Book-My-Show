import React, { useState } from 'react';

function Select_location_time(props)
{

//    const [location_time,setLocationTime]=useState({});


    console.log(props);
    return(
        <>
        <div className="location_time">
    <div className="choice">
      <label for="theaters">theaters</label>
      <br/>
      <select name="theaters" id="theaters">
      </select>
    </div>

    <div className="choice">
      <label for="timing">timing</label>
      <br/>
      <select name="theaters" id="theaters">
      </select>
    </div>
        </div>
        <div className="select_seat">
        <a id="book_now" href='/Home/Select_location_time/Select_Seat' target="blank">
  <button className="book_btn">Select Seat</button></a> 
        </div></>
    )
}

export default Select_location_time;