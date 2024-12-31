import './App.css';
import {FaSearch, FaMapMarkerAlt, FaTint, FaWind} from 'react-icons/fa'
import { useState, useEffect } from 'react';



function App() {
  const [cityInput, setCityInput] = useState('')
  const[weatherData, setWeatherData] = useState(null)
  const[imageData, setImageData] = useState(null)
  const perPages = 1;
  const [image, setImage] = useState()

  const unplash =  process.env.REACT_APP_UNPLASH_API_KEY

  console.log('api = ' + unplash)
  console.log('API 2 = ' + process.env.REACT_APP_WEATHER_API_KEY)
  console.log(image)


  //functions

   
      const getCityImage = async() => {
        try{
        const apiUnplashUrl = `https://api.unsplash.com/photos/random?query=${cityInput}&count=${perPages}&orientation=landscape&client_id=nBUda9Z1M4Q6LcFB6BuaadmGfYfS7OqUSq42XaNYbMQ&lang=pt-br`
        const res = await fetch(apiUnplashUrl)

        if(!res.ok){
          throw new Error('Erro = ' + res.status)
        }
        const unplash_data = await res.json()
        
        setImageData(unplash_data)
        setImage(imageData? imageData[0].urls.regular : '')
        console.log(unplash_data)
        console.log(image)
      } catch(error){
        console.log(error)
      }
    }


  const getWeatherData = async() => {
    try{
      const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}&lang=pt_br`

      const apiRes = await fetch(apiWeatherUrl)
      if(!apiRes.ok){
        alert('Verifique se o nome da cidade foi digitado corretamente')
        throw new Error(`HTTP ERROR! STATUS ${apiRes.status}`);
      }
      const data = await apiRes.json();
  
      setWeatherData(data)
      console.log(data)

    } catch(error){
      console.log('Erro = ' + error)
    }
  }

  //Eventos
 
  
  
  return (
    <div className="App" style={imageData? {backgroundImage: `url(${imageData? imageData[0].urls.regular : ''})`} : {backgroundcolor: 'none'}}>

      <div className='container'>

        <h3>Confira o clima</h3>

        <div className='form-input-container'>

          <input placeholder='Nome de uma cidade...' id='city-input' autoComplete='off' onChange={(text) => (setCityInput(text.target.value))}></input>

          <button id='search' onClick={() => {getWeatherData(); getCityImage();}}>
            <FaSearch/>
          </button>

        </div>

      {weatherData && <div className='weather-data'>

        <h2>
          
          <FaMapMarkerAlt className='icon'/>

          <span id='city'> {weatherData? weatherData.name : ''} </span>

          <img src={`https://flagsapi.com/${weatherData? weatherData.sys.country : ''}/flat/64.png`} alt='Bandeira do país' id='country'/>

        </h2>

        <p id='temperatura'><span>{weatherData? parseInt(weatherData.main.temp) : ''}</span>°C</p>

        <div id='description-container'>

          <p id='description'>{weatherData? weatherData.weather[0].description : ''}</p>

          <img src={`http://openweathermap.org/img/wn/${weatherData? weatherData.weather[0].icon : ''}@2x.png`} alt='Condições do tempo' id='weather-icon'/>

        </div>

        <div id='details-container'>

          <p id='umidity'>
            <FaTint className='icon'/>
            <span>{weatherData? weatherData.main.humidity : ''}%</span>
          </p>

          <p id='wind'>
            <FaWind className='icon'/>
            <span>{weatherData? weatherData.wind.speed : ''}Km/h</span>
          </p>
          
        </div>

        </div>}

      </div>

      {/* <div style={{border: '1px solid black', height: '10rem', width: '100vh', margin: '2rem'}}>
        <p>{imageData? imageData[0].urls.regular : ''}</p>
      </div> */}
      
    </div>
  );
}

export default App;
