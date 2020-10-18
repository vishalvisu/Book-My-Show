import React from 'react';

function Select_location_time()
{
  

    return(
        <>
        <div className="location_time">
                <div className="choice">
      <label for="city">City</label>
      <br/>
      <select name="city" id="city">
  <option value="New Delhi">New Delhi</option>
  <option value="Kolkata">Kolkata</option>
  <option value="Chennai">Chennai</option>
  <option value="Mumbai">Mumabi</option>
      </select>
    </div>
    
    <div className="choice">
      <label for="theaters">theaters</label>
      <br/>
      <select name="theaters" id="theaters">
  <option value="Inox">Inox</option>
  <option value="Movie_plaze">Movie_plaze</option>
  <option value="Axis">Axis</option>
      </select>
    </div>

    <div className="choice">
      <label for="timing">timing</label>
      <br/>
      <select name="timing" id="timing">
  <option value="t1">9:30 AM</option>
  <option value="t2">12:30 PM</option>
  <option value="t3">2:30 PM</option>
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