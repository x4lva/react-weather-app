import React, {Component} from "react";
import "./weather-content.css"
import WeatherList from "../weather-list";
import WeatherLoading from "../weather-loading";
import WeatherCurrentInfo from "../weather-current-info/weather-current-info";

export default class WeatherContent extends Component {

    render() {

        const {
            ondaychange,
            onmetricchange,
            rendertemperature,
            currentmetric,
            currentweather,
            weatherinfo,
            weatherListLoading
        } = this.props;

        const metricButtons = [
            {name: "°C", label: "c"},
            {name: "°F", label: "f"}
        ]

        const renderButtons = metricButtons.map((el) => {
            const isActive = currentmetric === el.label

            let className = "weather-content-navigation-metric-item ms-2 d-flex justify-content-center align-items-center bg-secondary"

            if (isActive) className += " metric-active"

            return (
                <div
                    onClick={() => onmetricchange(el.label)}
                    className={className}>
                    {el.name}
                </div>
            )

        })

        const metricClassName = "weather-content-navigation-metric-item ms-2 d-flex justify-content-center align-items-center"

        let renderWetaherList = <WeatherLoading/>;
        let renderWetaherCurrent = <WeatherLoading/>;

        if (!weatherListLoading) {
            renderWetaherList = <WeatherList rendertemperature={rendertemperature}
                                             ondaychange={ondaychange}
                                             weathercurrent={currentweather}
                                             weatherinfo={weatherinfo}/>
        }
        if (!weatherListLoading) {
            renderWetaherCurrent = <WeatherCurrentInfo rendertemperature={rendertemperature}
                                                    weatherInfo={weatherinfo}
                                                    currentWeather={currentweather}/>

        }

        return (
            <div className="weather-content d-flex flex-column p-5 pt-4">
                <div className="weather-content-navigation d-flex justify-content-between w-100">
                    <div className="weather-content-navigation-type d-flex">
                        <div
                            className="weather-content-navigation-type-item me-2 fw-bolder position-relative">
                            Week
                        </div>
                    </div>
                    <div className="weather-content-navigation-metric d-flex">
                        {renderButtons}
                    </div>
                </div>

                {renderWetaherList}

                <div className="weather-content-current d-flex flex-column">
                    <div className="weather-content-current-header fw-bolder mb-3 ">
                        Current weather info
                    </div>
                </div>

                {renderWetaherCurrent}

            </div>
        );
    }
}