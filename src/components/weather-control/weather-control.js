import React, {Component} from "react";
import "./weather-control.css"

export default class WeatherControl extends Component{

    state = {
        city: ""
    }

    onSubmit = e => {
        e.preventDefault()
        this.props.onCityChange(this.state.city)
    }

    onLabelChange = e => {
        this.setState({
            city: e.target.value
        })
    }

    render(){
        return(
            <form className="d-flex p-3" onSubmit={this.onSubmit}>
                <input value={this.state.city} onChange={this.onLabelChange} className="form-control me-2" type="text" placeholder="Search" aria-label="Search"/>
                <button className="weather-find-button btn" type="submit">
                    <i className="fas fa-search"/>
                </button>
            </form>
        );
    }
}