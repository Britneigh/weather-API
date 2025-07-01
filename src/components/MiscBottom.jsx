import { useContext } from "react";
import { WeatherContext } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";

const MiscBottom = () => {
    const {weatherData} = useContext(WeatherContext);  
    const humidIcon = <FontAwesomeIcon icon={faDroplet} className="droplet"/>

  return (
   <div className="forecast-container row">
     <div className="col">
        <p className="misc-info">Humidity: {weatherData?.current?.relative_humidity_2m}% {humidIcon}</p>
        <p className="misc-info">UV index: {weatherData?.daily?.uv_index_max[0]}</p>
    </div>
    <div className="col">
        <div className="misc-info ">
        <p>Precipitation probability:</p>
        <p>{weatherData?.daily?.precipitation_probability_max[0]}%</p>
        <p>Precipitation:</p>
        <p>{weatherData?.daily?.precipitation_sum[0]} mm</p>
        </div>
    </div>
   </div>
  )
}

export default MiscBottom
