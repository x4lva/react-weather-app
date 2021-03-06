import React, { Component } from "react";
import WeatherList from "../weather-list";
import WeatherLoading from "../weather-loading";
import WeatherCurrentInfo from "../weather-current-info/weather-current-info";
import WeatherHeader from "../weather-header/weather-header";
import "./weather-content.css";

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
            { name: "°C", label: "c" },
            { name: "°K", label: "k" },
        ];

        const renderButtons = metricButtons.map((el, index) => {
            const isActive = currentmetric === el.label;

            let className =
                "weather-content-navigation-metric-item ms-2 d-flex justify-content-center align-items-center bg-secondary";

            if (isActive) className += " metric-active";

            return (
                <div
                    key={index}
                    onClick={() => onmetricchange(el.label)}
                    className={className}
                >
                    {el.name}
                </div>
            );
        });

        const metricClassName =
            "weather-content-navigation-metric-item ms-2 d-flex justify-content-center align-items-center";

        let renderWetaherList = <WeatherLoading />;
        let renderWetaherCurrent = <WeatherLoading />;

        if (!weatherListLoading) {
            renderWetaherList = (
                <WeatherList
                    rendertemperature={rendertemperature}
                    ondaychange={ondaychange}
                    weathercurrent={currentweather}
                    weatherinfo={weatherinfo}
                />
            );
        }
        if (!weatherListLoading) {
            renderWetaherCurrent = (
                <WeatherCurrentInfo
                    rendertemperature={rendertemperature}
                    weatherInfo={weatherinfo}
                    currentWeather={currentweather}
                />
            );
        }

        return (
            <div className="weather-content d-flex flex-column p-5 pt-4 pb-0">
                <WeatherHeader city={this.props.city} />
                <div className="weather-content-navigation d-flex justify-content-between w-100 mt-3">
                    <div className="weather-content-navigation-type d-flex">
                        <div className="weather-content-navigation-type-item me-2 fw-bolder position-relative">
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
