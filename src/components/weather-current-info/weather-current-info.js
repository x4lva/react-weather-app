import React, {Component} from "react";
import "./weather-current-info.css"
import CityError from "../city-error/city-error";

export default class WeatherCurrentInfo extends Component{

    renderTime(unix){
        const date = new Date(unix*1000)
        return `${date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`

    }

    renderUviIndex(uvi){
        return {
            color: `rgb(${uvi*28},0,0)`
        }
    }

    renderDay(unix) {
        const date = new Date(unix * 1000).toLocaleString().split(',')[0].split('.')

        return `${date[0]}.${date[1]}`
    }

    render() {

        const {rendertemperature} = this.props
        let renderWeatherInfo = this.props.weatherInfo.find(el => this.renderDay(el.date) === this.renderDay(this.props.currentWeather)) || ""

        if (this.props.weatherInfo[0].status === "error") return (<CityError/>)

        return(
            <div className="weather-content-current-list w-100 d-flex flex-wrap justify-content-between">
                <div className="weather-content-current-list-item p-2 ps-3 shadow">
                    <div className="weather-content-current-list-item-header d-flex text-secondary">
                        Wind Status
                    </div>
                    <div
                        className="weather-content-current-list-item-content d-flex justify-content-between align-items-center h-100">
                        <h2>{renderWeatherInfo.wind_speed} <span className="info-metric">m/s</span></h2>
                        <div className="weather-content-current-list-item-wind-direction ">
                            <i style={{transform: `rotate(${renderWeatherInfo.wind_direction}deg)`}} className="fas fa-location-arrow"></i>
                        </div>
                    </div>
                </div>

                <div className="weather-content-current-list-item p-2 ps-3 shadow">
                    <div className="weather-content-current-list-item-header d-flex text-secondary">
                        Sunrise
                    </div>
                    <div
                        className="weather-content-current-list-item-content d-flex justify-content-between align-items-center h-100">
                        <h2>{this.renderTime(renderWeatherInfo.sunrise)}</h2>
                    </div>
                </div>
                <div className="weather-content-current-list-item p-2 ps-3 shadow">
                    <div className="weather-content-current-list-item-header d-flex text-secondary">
                        Sunset
                    </div>
                    <div
                        className="weather-content-current-list-item-content d-flex justify-content-between align-items-center h-100">
                        <h2>{this.renderTime(renderWeatherInfo.sunset)}</h2>
                    </div>

                </div>
                <div className="weather-content-current-list-item p-2 ps-3 shadow">
                    <div className="weather-content-current-list-item-header d-flex text-secondary">
                        Pressure
                    </div>
                    <div
                        className="weather-content-current-list-item-content d-flex justify-content-between align-items-center h-100">
                        <h2>{renderWeatherInfo.pressure} <span className="info-metric">hPa</span></h2>
                    </div>
                </div>
                <div className="weather-content-current-list-item p-2 ps-3 shadow">
                    <div className="weather-content-current-list-item-header d-flex text-secondary">
                        Humidity
                    </div>
                    <div
                        className="weather-content-current-list-item-content d-flex justify-content-between align-items-center h-100">
                        <h2>{renderWeatherInfo.humidity} <span className="info-metric fw-bold">%</span></h2>
                    </div>
                </div>
                <div className="weather-content-current-list-item p-2 ps-3 shadow">
                    <div className="weather-content-current-list-item-header d-flex text-secondary">
                        UVI index
                    </div>
                    <div
                        className="weather-content-current-list-item-content d-flex justify-content-between align-items-center h-100">
                        <h2 style={this.renderUviIndex(renderWeatherInfo.uvi)}>{renderWeatherInfo.uvi} <span className="info-metric">points</span></h2>
                    </div>
                </div>
            </div>
        )
    }
}