import React, {Component} from "react";
import WeatherInfo from "./components/weather-info";
import "./bootstrap.min.css"
import WeatherService from "./services/WeatherService";

class App extends Component{

    state = {
        weather_info: []
    }

    weatherapi = new WeatherService();

    componentDidMount() {
        this.weatherapi.getCurrentWeather("Lviv").then((data) => {
            this.setState({
                weather_info: data
            })
        })
    }

    render(){
        return (
            <div className="container-fluid d-flex justify-content-between">
                <WeatherInfo weatherinfo={this.state.weather_info} />
            </div>
        );
    }

}

export default App;
