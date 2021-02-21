import React, { Component } from "react";
import "./weather-info.css";
import WeatherControl from "../weather-control/weather-control";
import { Axis, Chart, LineAdvance, Path, Point } from "bizcharts";
import WeatherAir from "../weather-air/weather-air";
import WeatherChart from "../weather-chart/weather-chart";
import WeatherCurrentTime from "../weather-current-time/weather-current-time";
import WeatherLoading from "../weather-loading";

export default class WeatherInfo extends Component {
    render() {
        const { onCityChange } = this.props;

        return (
            <div className="weather-info d-flex flex-column p-3 min-vh-100 position-fixed justify-content-between">
                <WeatherControl onCityChange={onCityChange} />
                <div className="d-flex flex-column">
                    <WeatherCurrentTime timeZone={this.props.timeZone}/>
                    {this.props.airLoading
                        ?
                        (<WeatherLoading/>)
                        :
                        (<WeatherAir airQuality={this.props.airQuality}/>)
                    }
                    <WeatherChart hourlyWeather={this.props.hourlyWeather}/>
                </div>

            </div>
        );
    }
}
