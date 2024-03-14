import style from "./CountryList.module.css";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import CountryItem from "./CountryItem.jsx";

export default function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message message="No data available" />;

  const countries = cities.reduce((arr, city) => {
    if (!arr.find((el) => el.country === city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    }
    return arr;
  }, []);

  return (
    <ul className={style.countryList}>
      {countries.map((country, index) => (
        <CountryItem country={country} key={index} />
      ))}
    </ul>
  );
}
