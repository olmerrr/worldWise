import style from "./Map.module.css"
import { useNavigate, useSearchParams } from "react-router-dom";
export default  function Map() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return <div className={style.mapContainer} onClick={() => navigate("form")}>
    <h1>Map</h1>

    <h2>Position: {lat}, {lng}</h2>
    <button onClick={() => setSearchParams({lat: 30, lng: 33})}>Change pos</button>
  </div>
}