import Message from "./Message.jsx";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button.jsx";
import BackButton from "./BackButton.jsx";
import { useUrlPosition } from "../hooks/useUrlPosition.js";
import Spinner from "./Spinner.jsx";


export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [ cityName, setCityName ] = useState("");
  const [ countryName, setCountry ] = useState("");
  const [ date, setDate ] = useState(new Date());
  const [ notes, setNotes ] = useState("");
  const [ isLoadingGeocoding, setIsLoadingGeocoding ] = useState(false);
  const [ emoji, setEmoji ] = useState("");
  const [ geocodingError, setGeocodingError ] = useState("");

  const [ lat, lng ] = useUrlPosition();


  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if ( isLoadingGeocoding ) return <Spinner />
        if ( !data.countryCode ) throw new Error("Click on city  or close to city please");

        setCityName(data.city || data.locality || "")
        setCountry(data.country || data.locality || "")
        setEmoji(convertToEmoji(data.countryCode))
      } catch ( err ) {
        setGeocodingError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }

    fetchCityData();

  }, [ lat, lng ]);

  if (geocodingError) return <Message message={geocodingError}/>
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton/>
      </div>
    </form>
  );
}

export default Form;
