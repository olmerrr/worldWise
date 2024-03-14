import style from "./Sidebar.module.css"
import Logo from "./Logo.jsx";
import AppNav from "./AppNav.jsx";
import { Outlet } from "react-router-dom";
export default  function Sidebar() {
  return <div className={style.sidebar}>
    <Logo/>
    <AppNav />
    {/*эта штука показывает нестед элементы*/}
    <Outlet/>
    {/*эта штука показывает нестед элементы*/}

    <footer className={style.footer}>
        <p className={style.copyright}> &copy; Copyright {new Date().getFullYear()} by Yaroslav Dombrovskyi</p>
    </footer>
  </div>
}