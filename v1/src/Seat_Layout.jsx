import React, { useEffect } from 'react';
import { useState } from 'react';
import './index.css';

function Seat_Layout(props)
{
var curr=[];
//  const [avaiable,setAvailiable]=useState(curr);
  

  console.log(props);

  function selectSeat()
  {
    let Id=this.id;
    let clr= this.style.backgroundColor;
    
    let no= parseInt(Id);
    if(clr=='blue')
    {
        this.style.backgroundColor='lightgreen';
        curr[no]=false;
    }
    else
    {
         this.style.backgroundColor='blue';
         curr[no]=true;
    }
              props.send(curr);
  }

   useEffect(()=>{
      
    let arr= document.getElementsByClassName("seat");
    for(let i=0;i<arr.length;i++)
    {
      let btn= document.createElement('button');
      btn.className="btn";
      arr[i].appendChild(btn);
      btn.id=i+1;
      btn.addEventListener("click", selectSeat);
    }

    for(let i=0;i<curr.length;i++)
    {
      document.getElementById(curr[i]+'').style.backgroundColor='red';
      document.getElementById(curr[i]+"").disabled=true;
    }
 
    for(let i=0;i<=99;i++)
      curr[i]=false;  

   },[]);
    return(
      
      <div className="theatre">
  
      <div className="cinema-seats left">
        <div className="cinema-row row-1">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
        </div>
    
        <div className="cinema-row row-2">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
        </div>
    
        <div className="cinema-row row-3">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
        </div>
    
        <div className="cinema-row row-4">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
        </div>
        <div className="space">

        </div>
        <div className="cinema-row row-5">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
        </div>
    
        <div className="cinema-row row-6">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
        </div>
    
        <div className="cinema-row row-7">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
        </div>
      </div>
    
    
      <div className="cinema-seats right">
        <div className="cinema-row row-1">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
        </div>
    
        <div className="cinema-row row-2">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
        </div>
    
        <div className="cinema-row row-3">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
        </div>
        <br/><br/>
        <div className="cinema-row row-4">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
        </div>
       <div className="space">

       </div>
        <div className="cinema-row row-5">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
        </div>
    
        <div className="cinema-row row-6">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
        </div>
    
        <div className="cinema-row row-7">
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
          <div className="seat"></div>
        </div>
      </div>
      
    </div>

    )
}

export default Seat_Layout;