import React, {Component} from "react";
import WeatherInfo from "./components/weather-info";
import "./bootstrap.min.css"
import WeatherService from "./services/WeatherService";
import WeatherContent from "./components/weather-content";
import "./app.css";

class App extends Component {

    state = {
        weather_info: [],
        current: localStorage.getItem('current') || 0,
        metric:  localStorage.getItem('metric') || "c",
        weatherListLoading: true
    }

    weatherapi = new WeatherService();

    componentDidMount() {
        this.weatherapi.getWeeklyWeather("Lviv").then((data) => {
            this.setState({
                weather_info: data,
                weatherListLoading: false
            })
        })
    }

    renderTemperature(data) {
        switch (this.state.metric) {
            case "c":
                return Math.round(data - 273)
                break
            case "f":
                return Math.round(data)
                break
        }
    }

    setMetric(data) {
        this.setState({
            metric: data
        })
        localStorage.setItem('metric', data)
    }

    setCurrent(date) {
        this.setState({
            current: date
        })
        localStorage.setItem('current', date)
    }

    render() {
        return (
            <div className="container-fluid d-flex justify-content-between min-vh-100">
                <WeatherInfo currentweatherinfo={this.state.weather_info}/>

                <WeatherContent weatherListLoading={this.state.weatherListLoading}
                                currentmetric={this.state.metric}
                                rendertemperature={this.renderTemperature.bind(this)}
                                onmetricchange={this.setMetric.bind(this)} ondaychange={this.setCurrent.bind(this)}
                                currentweather={this.state.current} weatherinfo={this.state.weather_info}/>
            </div>
        );
    }

}

export default App;
