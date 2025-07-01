import { useContext } from "react";
import { WeatherContext } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MiscTop from "./MiscTop";
import MiscBottom from "./MiscBottom";

const Misc = () => {
  const {weatherData} = useContext(WeatherContext);   
            
  return (
    <>
    {weatherData ? (
    <div className="misc-container">
      <MiscTop />
      <MiscBottom />
    </div>
    ) : (null)}
    </>
  )
}

export default Misc
