import React, {Component} from 'react'
import "./weather-air.css"

export default class WeatherAir extends Component{

    render() {

        const renderSlider = this.props.airQuality.map((el, index) => {

            let className = "carousel-item"

            if (index == 0) className+=" active"

            return(
                <div key={index} className={className}>
                    <div className="carousel-caption d-none d-md-flex" data-bs-interval="2500">
                        <h5 className="text-white">{parseFloat(el.value).toFixed(4)} μg/m3</h5>
                        <p className="text-secondary">Сoncentration of {el.name?.toUpperCase()}</p>
                    </div>
                </div>
            )
        })

        return(
            <div id="carouselExampleCaptions" className="carousel slide rounded-2 mt-3" data-bs-ride="carousel">
                <div className="carousel-inner rounded-2 w-100">
                    {renderSlider}
                </div>
                <button className="carousel-control-prev ms-3" type="button" data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"/>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next me-3" type="button" data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"/>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        )
    }
}