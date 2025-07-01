import SearchBar from "./SearchBar"
import CurrentWeather from "./CurrentWeather";
import ForecastHourly from "./ForecastHourly";
import ForecastWeekly from "./ForecastWeekly";

const Home = ({location}) => {

  return (
    <div className="home">
      <div className="row">
        <SearchBar />
      </div>
      {location.name ? (
        <>
      <div className="row">
        <CurrentWeather />
      </div>
      <div className="row">
      <ForecastHourly />
      </div>
      <div className="row">
      <ForecastWeekly />
      </div>
      </>) : null}
    </div>
  )
}

export default Home
