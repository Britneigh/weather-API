import { useState, useEffect } from "react";
import { fetchLocation } from "../api";
import { useContext } from "react";
import { LocationContext } from "./Home";

const List = ({ input, setInput }) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {setLocation} = useContext(LocationContext);

useEffect(() => {
    setLoading(true);
    fetchLocation(input)
    .then((response) => {
        setLoading(false);
        setList(response.results);
    })
    .catch((error) => {
        setLoading(false);
        setError(error);
    })
}, [input]);

const handleLocation = (location) => {
    setLocation(location);
    setInput("");
}

  return (
    <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <div className="locations">
        {list && list.map((location, index) =>
        <div className="location-card" onClick={() => handleLocation(location)} key={index}>
            <p>{location.name}, {location.country}</p>
        </div>)}
        </div>
    </div>
  )
}

export default List
