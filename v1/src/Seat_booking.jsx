import React from 'react';
import Heading from './Heading.jsx';
import Screen from './Screen.jsx';
import Seat_Layout from './Seat_Layout.jsx';

function Seat_booking()
{
   return(
   <div>
      <div className="seat_layout">
  <Heading/>
  <Seat_Layout/>
  <Seat_Layout/>
  <Seat_Layout/>
  </div>
  <Screen/>
    </div>
   );
}

export default Seat_booking;