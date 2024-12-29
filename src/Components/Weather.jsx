import React, { useEffect, useRef, useState } from 'react'
import '../App.css'
import { CiSearch } from "react-icons/ci";
import clearsky from '../assets/clearsky.png'
import fewclouds from '../assets/fewclouds.png'
import clouds from '../assets/clouds.png'
import rain from '../assets/rain.png'
import thunderstorm from '../assets/thunderstorm.png'
import snow from '../assets/snow.png'
import mist from '../assets/mist.png'
import { IoHeartDislikeCircleOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
function Weather() {
    const [getWeather, setWeather] = useState({});
    const inputref = useRef();
    const [status, setstatus] = useState("");
    const [favourite, setFavourite] = useState([{}]);
    const getWeatherIcon = {
        "01d": clearsky,
        "02d": fewclouds,
        "03d": clouds,
        "04d": clouds,
        "09d": rain,
        "10d": rain,
        "11d": thunderstorm,
        "13d": snow,
        "50d": mist
    };
    const fetchWeatherUpdate = (search) => {
        setstatus("Updating...");
        setTimeout(async () => {
            try {
                const data = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&&units=metric&appid=a0fb60f0a211dca5c59eb2fbaf20222c`)).json();

                console.log(data);
                if(data.cod== 404){
                    console.log(data);
                    setstatus("Not Found ");
                    return ;
                }
                setWeather({
                    temp: Math.floor(data.main.temp),
                    cityname: data.name,
                    humidity: data.main.humidity,
                    icon: getWeatherIcon[data.weather[0].icon] || clearsky,
                    speed: data.wind.speed
                });
                
                setstatus("");
                inputref.current.value = "";
            } catch (error) {
                console.log(error.message);
                setstatus("");
            }
        }, 500);
    }
    useEffect(() => {
        fetchWeatherUpdate('delhi')
    }, []);


    const addFavouriteFun = () => {
        setFavourite((e) => {

            console.log("1");
            
            const arr= favourite.includes(getWeather) ? favourite : [...e,getWeather];
            
           
            return arr;
        });
    }

    return (
        <div id='weather_container'>
            <div className="weather_box">
                <div className="searchbox">
                    <div className="inputs">
                        <input type="text" ref={inputref} placeholder='Search' />
                    </div>
                    <div className="searchicon" onClick={() => { fetchWeatherUpdate(inputref.current.value) }}>
                        <i> <CiSearch></CiSearch> </i>
                    </div>
                </div>
                {
                    !status ? "" : <span id='status'>{status}</span>
                }
                <div className="weathericons">
                    <img src={getWeather.icon} alt="" />
                </div>
                <div className="weather_temp">
                    <span>{getWeather.temp} °C</span>
                </div>
                <div className="weather_area">
                    <span>{getWeather.cityname}</span>
                </div>
                <div className="box">
                    <div className="weather_speed">
                        <span>{getWeather.speed} Km/h</span>
                        <span>Wind Speed</span>
                    </div>
                    <div className="add_favourite" onClick={() => { addFavouriteFun() }}>
                        <CiHeart color='red'></CiHeart>
                    </div>
                </div>
            </div>
           <div className="add_weather">
            {
                favourite.map((elem,ind)=>{
                    return  ind!=0 ?    <div className="weath_box"  >
                    <div className="weather_img">
                        <img src={elem.icon} alt="" />
                    </div>
                    <div className="first_box">
                    <div className="weath_temp_name">
                        <span>{elem.temp} °C</span>
                        <span>{elem.cityname}</span>
                    </div>
                    <div className="weather_speen">
                        <span>{elem.speed}</span>
                        <span>km/h</span>
                    </div>
                    </div>
                </div>
                : ""
                })
            }
         
           </div>
        </div>
    )
}

export default Weather
