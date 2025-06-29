import { useState } from "react";
import List from "./List";

const SearchBar = () => {
  const [input, setInput] = useState("");


  const handleChange = (event) => {
    const value = event.target.value;
    setInput(value);
  }

  return (
  <div className="search-bar">
    <form>
      <input type="text" className="search-field" placeholder="Enter a location here..." value={input} onChange={handleChange}></input>
    </form>
    <List input={input} setInput={setInput}/>
  </div>
  )
}

export default SearchBar
