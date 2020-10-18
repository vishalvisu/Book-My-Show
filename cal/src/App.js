import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
 

function App() {

  const [numbers,setNumber]= useState({
    number1:"",
    number2:""
  });

  function InputEvent(event)
{
   let value = event.target.value;
   let name=  event.target.name;

    setNumber((prev)=>
    {
      if(name=="number1")
      {
         return{
            number1:value,
            number2:prev.number2,
         };
      }
         else
         {
         return {
            number2:value,
            number1:prev.number1,
               };
         }
   });
}

  return (
    <div className="calculator">
          <div className="input">
            <input type="number" name="number1" value={numbers.number1} onChange={InputEvent} />
          </div>
          <div className="input">
            <input type="number" name="number2" value={numbers.number2} onChange={InputEvent}/>
          </div>
          <div className="operation">
            <input type="button" name="add" value="+"/>
          </div>
    </div>
  );
}

export default App;
