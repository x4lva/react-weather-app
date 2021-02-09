import React, {Component} from "react";
import "./weather-info.css";
import WeatherService from "../../services/WeatherService"

export default class WeatherInfo extends Component{

    weatherapi = new WeatherService();

    state = {
        weather_info: null
    }


    componentDidMount() {
        this.weatherapi.getCurrentWeather("Lviv");
        this.weatherapi.getWeeklyWeather("Lviv");
    }

    render() {
        return (

            <React.Fragment>
                <h1>qdad</h1>
            </React.Fragment>

        );
    }
}

