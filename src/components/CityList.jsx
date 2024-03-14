import style from "./CityList.module.css";
import Spinner from "./Spinner.jsx";
import CityItem from "./CityItem.jsx";
import Message from "./Message.jsx";

export default function CityList({ cities = [], isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message message="Add your firs city by clicking on a city on the map"/>
  return (
    <ul className={style.cityList}>
      {cities.map(city => <CityItem key={city.id} city={city} />)}
    </ul>
  );
}