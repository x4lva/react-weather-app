import React, {Component} from "react";

export default class WeatherHeader extends Component{

    render() {

        const icon_url = `http://openweathermap.org/img/wn/${this.props.icon}@2x.png`;

        return(
            <div className="d-flex align-items-center flex-column">
                <h1>{this.props.type}</h1>
                <div className="weather-info-icon">
                    <img src={icon_url} alt="Weather Icon"/>
                </div>
            </div>
        );
    }
}