import style from "./CityItem.module.css";
import { Link } from "react-router-dom";

export default function CityItem({ city }) {
  const { cityName, emoji, country, date, notes, position, id } = city;
  const formatDate = (date) => new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(date));

  return <li>
    <Link to={`${id}`} className={style.cityItem}>
      <span className={style.emoji}>{emoji}</span>

      <h3 className={style.name}>{cityName}</h3>
      <span>{country}</span>
      {/*<span>{notes}</span>*/}
      <span>{position[0]}</span>
      <time className={style.date}>{formatDate(date)}</time>
      <button className={style.deleteBtn}>&times;</button>
    </Link>
  </li>
}