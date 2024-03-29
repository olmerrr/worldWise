import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";

function CitiesProvider({children}) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

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

  async function getCity(id) {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await response.json();
        setCurrentCity(data);
      } catch {
        alert("Error loading data")
      } finally {
        setIsLoading(false);
      }
    }
  async function createCity(newCity) {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`, {
          method: "POST",
          body: JSON.stringify(newCity),
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        setCities(cities => [...cities, data])
      } catch {
        alert("Error creating city data")
      } finally {
        setIsLoading(false);
      }
    }
  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      setCities(cities => cities.filter(city => city.id !== id))
    } catch {
      alert("Error with deleting data")
    } finally {
      setIsLoading(false);
    }
  }

  return <CitiesContext.Provider value={
    {
      cities,
      isLoading,
      currentCity,
      getCity,
      createCity,
      deleteCity
    }
  }>
    {children}
  </CitiesContext.Provider>;
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("CitiesContext was used outside the  CitiesProvider")
  return context;
}
export {
  CitiesProvider,
  useCities
};