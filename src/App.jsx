import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import './App.css'
import Product from "./pages/Product.jsx";
import Homepage from "./pages/Homepage.jsx";
import Pricing  from "./pages/Pricing.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";

const BASE_URL = "http://localhost:9000";
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities(){
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch {
        alert("Error loading data")
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return <div className="app">
  <BrowserRouter>
    <Routes>
      <Route index element={<Homepage/>}/>
      <Route path="product" element={<Product/>}/>
      <Route path="pricing" element={<Pricing/>}/>
      <Route path="login" element={<Login/>}/>

      <Route path="/app" element={<AppLayout/>}>
        {/*дефолтный нестед роут*/}
        <Route index element={<CityList cities={cities} isLoading={isLoading}/>}/>

        <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>}/>
        <Route path="cities/:id" element={<City />}/>
        <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />}/>
        <Route path="form" element={<p>Form</p>}/>
      </Route>

      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
  </BrowserRouter>

  </div>
}
export default App
