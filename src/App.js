import React, { Component } from "react";
import WeatherInfo from "./components/weather-info";
import WeatherService from "./services/WeatherService";
import WeatherContent from "./components/weather-content";
import "./bootstrap.min.css";
import "./app.css";

class App extends Component {
    weatherapi = new WeatherService();

    state = {
        weather_info: [],
        current: localStorage.getItem("current") || parseInt(new Date().getTime() / 1000).toFixed(0),
        metric: localStorage.getItem("metric") || "c",
        weatherListLoading: true,
        city: localStorage.getItem("city") || "Lviv",
        hourly: [],
        air: [],
        timeZone: 0,
        airLoading: true
    };

    componentDidMount() {
        this.updateCity(this.state.city);
    }

    updateCity(city) {
        this.setState({
            weatherListLoading: true,
            airLoading: true
        });
        this.weatherapi.getWeeklyWeather(city).then((data) => {
            this.setState({
                weather_info: data,
                weatherListLoading: false,
            });
        });
        this.weatherapi.getHourlyWeather(city).then((data) => {
            this.setState({
                hourly: data,
            });
        });
        this.weatherapi.getWeatherAir(city).then((data) => {
            this.setState({
                air: data,
                airLoading: false
            });
        });
        this.weatherapi.getCityCoords(city).then((data) => {
            this.setState({
                timeZone: data.timezone,

            });
        });
    }

    renderTemperature(data) {
        switch (this.state.metric) {
            case "c":
                return Math.round(data - 273);
            case "k":
                return Math.round(data);
        }
    }

    setMetric(data) {
        this.setState({
            metric: data,
        });
        localStorage.setItem("metric", data);
    }

    setCurrent(date) {
        this.setState({
            current: date,
        });
        localStorage.setItem("current", date);
    }

    onCityChange(city) {
        this.updateCity(city);
        this.setState({
            city: city,
        });
        localStorage.setItem("city", city);
    }

    render() {
        return (
            <div className="d-flex min-vh-100 position-relative">
                <WeatherInfo
                    airQuality={this.state.air}
                    onCityChange={this.onCityChange.bind(this)}
                    currentweatherinfo={this.state.weather_info}
                    hourlyWeather={this.state.hourly}
                    airLoading={this.state.airLoading}
                    timeZone={this.state.timeZone}
                />

                <WeatherContent
                    weatherListLoading={this.state.weatherListLoading}
                    currentmetric={this.state.metric}
                    rendertemperature={this.renderTemperature.bind(this)}
                    onmetricchange={this.setMetric.bind(this)}
                    ondaychange={this.setCurrent.bind(this)}
                    currentweather={this.state.current}
                    city={this.state.city}
                    weatherinfo={this.state.weather_info}
                />
            </div>
        );
    }
}

export default App;
