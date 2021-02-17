import React, {Component} from "react";
import "./weather-list.css";
import WeatherService from "../../services/WeatherService";

export default class WeatherList extends Component {


    weatherapi = new WeatherService()

    renderDay(unix) {
        const date = new Date(unix * 1000).toLocaleString().split(',')[0].split('.')

        return `${date[0]}.${date[1]}`
    }

    render() {

        const {weathercurrent, ondaychange, rendertemperature} = this.props

        const weather_list = this.props.weatherinfo.map((el) => {
            let classname = "weather-list-item shadow d-flex flex-column align-items-center justify-content-center";

            if (el.date == weathercurrent) classname += " weather-list-current"

            return (
                <div key={el.date}
                     className={classname} onClick={() => ondaychange(el.date)}>
                    <div className="weather-content-list-item-day">{this.renderDay(el.date)}</div>
                    <div className="weather-content-list-item-icon">{this.weatherapi.getWeatherIcon(el.icon)}</div>
                    <div className="weather-content-list-item-temperature">{rendertemperature(el.temperature_max)}° <span className="text-secondary">{rendertemperature(el.temperature_min)}°</span></div>
                </div>
            )
        })


        return (
            <div className="weather-list d-flex justify-content-between mt-3">
                {weather_list}
            </div>
        );
    }

}
