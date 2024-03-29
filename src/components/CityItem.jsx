import style from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext.jsx";

export default function CityItem({ city }) {
  const {currentCity, deleteCity} = useCities();
  const { cityName, emoji, country, date, notes, position, id } = city;
  const formatDate = (date) => new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(date));

  const handleRemoveCity = (e) => {
    e.preventDefault();
     deleteCity(id)
  };
  return <li>
    <Link  className={`${style.cityItem} ${id === currentCity.id ? style['cityItem--active'] : ""}`}
           to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
      <span className={style.emoji}>{emoji}</span>

      <h3 className={style.name}>{cityName}</h3>
      <span>{country}</span>
      <span>{position[0]}</span>
      <time className={style.date}>{formatDate(date)}</time>
      <button className={style.deleteBtn} onClick={(handleRemoveCity)}>&times;</button>
    </Link>
  </li>
}