import { useState, useEffect, useRef, useContext } from "react";
import { WeatherContext } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import MiscTop from "./MiscTop";
import MiscBottom from "./MiscBottom";

const Misc = () => {
  const {weatherData} = useContext(WeatherContext);   
  const upArrow = <FontAwesomeIcon icon={faChevronUp}/>
  const downArrow = <FontAwesomeIcon icon={faChevronDown}/>
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const scrollRef = useRef(null);
  

useEffect(() => {
  const scrollContainer = scrollRef.current;

  const handleScroll = () => {
    checkScrollPosition();
  };

  const handleWheel = (e) => {
    e.preventDefault();
  };

  if (scrollContainer) {
    scrollContainer.addEventListener("scroll", handleScroll);
    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    checkScrollPosition();
  }

  return () => {
    if (scrollContainer) {
      scrollContainer.removeEventListener("scroll", handleScroll);
      scrollContainer.removeEventListener("wheel", handleWheel);
    }
  };
}, [weatherData]);

const scroll = (direction) => {
  const scrollAmount = 500;

  if (scrollRef.current) {
    scrollRef.current.scrollBy({
      top: direction === "up" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }
};

const checkScrollPosition = () => {
  if (!scrollRef.current) return;

  const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

  setCanScrollUp(scrollTop > 0);
  setCanScrollDown(scrollTop + clientHeight < scrollHeight - 1);
};

  return (
    <>
    {weatherData ? (
    <div className="forecast-container">
    {canScrollUp && (<button onClick={() => scroll("up")} className="vertical-arrow up">{upArrow}</button>)}
      <div className="vertical-scroll" ref={scrollRef}>
      <MiscTop />
      <MiscBottom />
      </div>
    {canScrollDown && (<button onClick={() => scroll("down")} className="vertical-arrow down">{downArrow}</button>)}
    </div>
    ) : (null)}
    </>
  )
}

export default Misc
