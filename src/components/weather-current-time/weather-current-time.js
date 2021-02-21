import React, {Component} from "react"
import "./weather-current-time.css"

export default class WeatherCurrentTime extends Component{

    state = {
        time: ''
    }

    componentDidMount() {
        this.setState({time: this.renderTime()})
        this.intervalID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick() {
        this.setState({
            time: this.renderTime(),
        });
    }

    renderTime(){
        let d = new Date();

        let utc = d.getTime() + (d.getTimezoneOffset() * 60000);

        let res = new Date(utc + (this.props.timeZone*1000));

        return `${("0" + res.getHours()).slice(-2)}:${("0" + res.getMinutes()).slice(-2)}:${("0" + res.getSeconds()).slice(-2)}`
    }

    render() {
        return(
            <div className="current-time p-2 rounded-2 text-white d-flex align-items-center font-monospace fs-5 justify-content-center text-center">
                <span className="font-monospace">{this.state.time}</span>
            </div>
        )
    }
}