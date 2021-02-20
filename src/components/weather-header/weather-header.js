import React, { Component } from "react";
import "./weather-header.css";
import CityService from "../../services/CityService";

export default class WeatherHeader extends Component {
    cityimage = new CityService();

    render() {
        const image = {
            backgroundImage: "url()",
        };

        this.cityimage.getCityImage(this.props.city).then((data) => {
            document
                .getElementById("weather-header-img")
                .setAttribute("style", `background-image: url(${data.image})`);
        });

        return (
            <div
                id="weather-header-img"
                className="weather-header container-fluid bg-dark rounded-2 shadow"
                style={image}
            >
                <div className="weather-header-title">{this.props.city}</div>
            </div>
        );
    }
}
