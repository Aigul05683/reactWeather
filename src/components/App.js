import { useState } from "react";
import {IconButton, TextField, Typography, Grid} from '@mui/material'
import './App.css'

import {FiSearch} from 'react-icons/fi'

import clearImg from '../assets/images/clear.jpg'
import rainImg from '../assets/images/rain.jpg'
import cloudImg from '../assets/images/cloud.jpg'
import axios from 'axios';
const App = () => {
    const[weatherData, setWeatherData] = useState(null)
    const [city, setCity] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const fetchWeather = (e) => {
        e.preventDefault()
        axios(
            `https://api.openweathermap.org/data/2.5/weather?appid=053d8c76f6f4a9d1a1c372fd39214652&q=${city}&units=metric`
        )
            .then((response) => {
                setWeatherData(response.data)
                setCity('')
                setErrorMsg('')
            })
            .catch((err) =>{
                console.error(err.response, 'not found')
            setErrorMsg(err.response.data.message)
                setWeatherData(null )
    })
    }

    const searchHeandler = (e) =>{
        setCity(e.target.value)
    }

    const setImg = () =>{
        if(!weatherData) return clearImg
        switch (weatherData.weather[0].main) {
            case "Rain":
                return rainImg
            case "Clear":
                return clearImg
            case "Clouds":
                return cloudImg
            default:
                return clearImg
        }
    }

    return (
        <div className='app-container' style={{
            background: `url(${setImg()}) center / cover no-repeat`
        }}>
            <div className='app'>
                <Typography textAlign='center' variant='h1' fontSize={48} color='white'>Weather</Typography>
                <form className='form' onSubmit={fetchWeather}>
                    <div className="search-box">
                        <TextField label='search city'
                                   type='text'
                                   onChange={searchHeandler}
                                   color="primary"
                                   fullWidth
                                   value={city}
                        />
                        <IconButton className='search__btn'  variant ='contained' type='submit'>
                            <FiSearch/>
                        </IconButton>
                    </div>
                </form>
                {/*<h1>vash gorod: {weatherData?.name} </h1>*/}
                {/*<p>{Math.round(weatherData?.main?.temp)}℃</p>*/}
                {weatherData ?(
                    <div className='forecast'>
                        <Grid container flex='row' justifyContent='space-between'>
                            <Typography variant='h6'>City:</Typography>
                            <Typography variant='h5'>{weatherData.name}</Typography>
                        </Grid>
                        <Grid container flex='row' justifyContent='space-between'>
                            <Typography variant='h6'>Temperature:</Typography>
                            <Typography variant='h5'>{Math.round(weatherData.main.temp)} ℃</Typography>
                        </Grid>
                        <Grid container flex='row' justifyContent='space-between'>
                            <Typography variant='h6'>Feels like:</Typography>
                            <Typography variant='h5'>{Math.round(weatherData.main.feels_like)} ℃</Typography>
                        </Grid>
                    </div>
                ): null}
                {errorMsg ? <p>{errorMsg}</p> : null}
            </div>

        </div>
    );
};
export default App;