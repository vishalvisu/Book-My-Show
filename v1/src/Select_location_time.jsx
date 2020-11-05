import React, { useEffect, useState } from 'react';
import base_url from './Url.js';
import axios from "axios";
import Option from './Option.jsx';
import { useHistory } from 'react-router-dom';

function Select_location_time(props)
{
    
  const history= useHistory();
  let timing=[];
function handleChange()
{ 
  let Id=document.getElementById('theaters').value;

  axios.get(`${base_url}/get_timing/`, 
    {
          params: 
          {
             id:Id
          }
       }).then(
       (response)=>{
         console.log(response.data);
           timing=response.data;
           inserttime();
       },(error)=>{
         console.log("Something Went Wrong!");
         console.log(error);
       });

}

function inserttime()
{
  let select=document.getElementById('timing');

  document.getElementById("timing").options.length = 0;

console.log(select.length);
  for (const val of timing) 
  {
    var option = document.createElement("option");
    option.value = val;
    option.text = val;
    option.className='tm';
    select.appendChild(option);
  }
}

useEffect(()=>{

     console.log(document.getElementById('theaters').value);
      handleChange();     
},[]);

function SelectSeat()
{
  let cinema= document.getElementById("theaters").value;
  let tm=    document.getElementById("timing").value;  
  
  console.log(cinema);
  console.log(tm);

  props.send(cinema,tm);
  
  history.push('/Home/Select_location_time/Select_Seat');
}

    let cinmeasName= Object.values(props.CinemasName);

    console.log(props.CinemasName);
    return(
        <>
        <div className="location_time">
    <div className="choice">
      <label for="theaters">theaters</label>
      <br/>
      <select name="theaters" id="theaters" onChange={handleChange}>
      {
        cinmeasName.map((obj)=>
        {
          return <Option key={obj.Id} id={obj.Id} value={obj.name}
          /> 
        })
      }
      </select>
    </div>

    <div className="choice">
      <label for="timing">timing</label>
      <br/>
      <select name="timing" id="timing">
      </select>
    </div>
        </div>
        <div className="select_seat">
  <button className="book_btn" onClick={SelectSeat}>Select Seat</button>
        </div></>
    )
}

export default Select_location_time;