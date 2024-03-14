import Sidebar from "../components/Sidebar.jsx";
import Map from "../components/Map.jsx";

import style from "./AppLayout.module.css";
export default function AppLayout() {
  return <div className={style.app}>
  <Sidebar />
    <Map />
  </div>
}