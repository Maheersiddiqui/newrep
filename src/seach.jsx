import TextField from '@mui/material/TextField'
import './weather.css'
import Button from '@mui/material/Button'
import { useState } from 'react'
function Search(){
  let url="https://api.openweathermap.org/data/2.5/weather";
  let key='2eedb2116d282562140187bab615bf93';
  let [city ,setcity]=useState("");
  let [weather_data,setweather_data]=useState({});
  let handlechange=(event)=>{
    setcity(event.target.value);
  };
  let get_weather_updates=async()=>{
  
    let data=await fetch(`${url}?q=${city}&appid=${key}&units=metric`)
    
    let data_json=await data.json();
    console.log(data_json);
    let result={
        temprature:data_json.main.temp,
        feelslike:data_json.main.feels_like,
        min_temp:data_json.main.temp_min,
        max_temp:data_json.main.temp_max,
        humid:data_json.main.humidity,
      }
      setweather_data(result)
      return result;
     
    }
  
    
  let handlesubmit=(event)=>{
    event.preventDefault();
    console.log(city);
    setcity("");
    get_weather_updates();
  };
    return(
        <form  onSubmit={handlesubmit} action="">
        <TextField onChange={handlechange} value={city} id="outlined-basic"
         label="enter your location" variant="outlined" />
        <Button id="search_button" type="submit" onClick={get_weather_updates}
         variant="outlined">search</Button>
         
          <p>
          <strong> TEMPERATURE:</strong> <span>{weather_data.temprature}</span></p>
          <p><strong>FEELS LIKE:</strong><span>{weather_data.feelslike}</span> </p>
          <p><strong>MAXIMUM TEMPERATURE:</strong> <span>{weather_data.max_temp}</span></p>
          <p><strong>MINIMUM TEMPERATURE:</strong> <span>{weather_data.min_temp}</span></p>
          <p><strong>HUMIDITY:</strong> <span>{weather_data.humid}</span></p>
      </form>
    )
}
export {Search}