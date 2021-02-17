import React, {Component} from "react";

export default class WeatherLoading extends Component{
    render() {
        return(
            <div className="d-flex mt-5 w-100 justify-content-center">
                <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
}
