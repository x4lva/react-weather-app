import React, {Component} from "react";
import "./weather-info.css";
import WeatherService from "../../services/WeatherService"
import WeatherList from "../wather-list";
import WeatherHeader from "../weather-header";
import WeatherControl from "../waether-control/weather-control";

export default class WeatherInfo extends Component{

    render() {

        const { type, icon }  = this.props.weatherinfo

        return (
            <div className="d-flex flex-column weather-info">
                <WeatherHeader type={type} icon={icon}/>
                <WeatherControl/>
                <WeatherList/>
            </div>
        );
    }
}

