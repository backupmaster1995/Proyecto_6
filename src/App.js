import {useState, useEffect} from "react"
import Form from "./components/Form";
import Header from "./components/Header";
import WeatherInfo from "./components/WeatherInfo";
import Error from "./components/Error"

function App() {

  const [allcountries, setAllCountries] = useState([])
  const [userQuery, setUserQuery] = useState({
    city:"",
    country:"",
  })
  const [queryChecked, setQueryChecked] = useState(false)
  const [weatherData, setWeatherData] = useState({})
  const [error, setError] = useState(false);

  const {country, city} = userQuery

  //Getting countries data
  useEffect(()=> {
      fetch("https://restcountries.eu/rest/v2/all")
        .then(resp => resp.json())
        .then(data => setAllCountries(data))
  },[])

  //Requesting weather data
  useEffect(() => {
    const getWeatherData = async () => {
      if(queryChecked) {
        const APIkey = "5b08ebd99aa958fe4b29282ea991285c"
        const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIkey}`

        const response = await fetch(URL)
        const data = await response.json()
        setWeatherData(data)
        
        if(data.cod === "404") {
          setError(true);
        } else {
          setError(false);
        }

        setQueryChecked(false)
      }
    }
    getWeatherData()
  }, [queryChecked])

  return (
    <>
      <Header 
        title="Clima React App"
      />

      <div className="contenedor-form">
          <div className="container">
              <div className="row">
               
                  <div className="col m6 s12 form-container">
                      <Form 
                        userQuery={userQuery}
                        allcountries={allcountries}
                        setUserQuery={setUserQuery}
                        setQueryChecked={setQueryChecked}
                      />
                  </div>

                  <div className="col m6 s12">
                   {
                     error
                     ?
                     <Error message="No hay resultados" />
                     :
                     <WeatherInfo 
                        weatherData={weatherData}
                      />
                   }
                  </div>
              </div>
          </div>
      </div>
    </>
  );
}

export default App;
