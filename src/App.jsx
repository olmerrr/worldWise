import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import './App.css'
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";

import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import { CitiesProvider } from "./contexts/CitiesContext.jsx";
import { AuthProvider } from "./contexts/FakeAuthContext.jsx";
import { lazy, Suspense } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));
function App() {

  return <div className="app">
    <AuthProvider>
      <CitiesProvider>
        <Suspense fallback={<SpinnerFullPage/>}>
          <BrowserRouter>
            <Routes>
              <Route index element={<Homepage/>}/>
              <Route path="product" element={<Product/>}/>
              <Route path="pricing" element={<Pricing/>}/>
              <Route path="login" element={<Login/>}/>
              <Route path="/app"
                     element={
                       <ProtectedRoute>
                         <AppLayout/>
                       </ProtectedRoute>
                     }>
                {/*дефолтный нестед роут*/}
                <Route index element={<Navigate replace to="cities"/>}/>

                <Route path="cities" element={<CityList/>}/>
                <Route path="cities/:id" element={<City/>}/>
                <Route path="countries" element={<CountryList/>}/>
                <Route path="form" element={<Form/>}/>
              </Route>

              <Route path="*" element={<PageNotFound/>}/>
            </Routes>
          </BrowserRouter>
        </Suspense>
      </CitiesProvider>
    </AuthProvider>

  </div>
}


export default App
