import React, {Component} from "react";
import "./weather-info.css";
import WeatherControl from "../weather-control/weather-control";
import {Axis, Chart, LineAdvance, Path, Point} from "bizcharts";

export default class WeatherInfo extends Component{



    render() {
        const {onCityChange} = this.props

        console.log(this.props.hourlyWeather.slice(0, 23))

        const label = {
            textStyle: {
                textAlign: 'center',
                fill: '#404040',
                fontSize: '12',
                fontWeight: 'bold',
                textBaseline: 'top'
            }
        }

        const axis = this.props.hourlyWeather.slice(0,7).map((el, idx) => {

           return(
                <div className="weather-chart-axis-item text-white">{el.date}:00</div>
            )
        })


        return (
            <div className="weather-info d-flex flex-column min-vh-100 position-fixed justify-content-between">
                <WeatherControl onCityChange={onCityChange}/>
                <div className="weather-chart p-2">
                    <Chart padding={[5,0]} autoFit height={150} data={this.props.hourlyWeather.slice(0, 7)} >
                        <Point color="#fff"
                               shape='circle'
                               position="date*temperature"
                               size={2}/>
                        <Path
                            shape="smooth"
                            point
                            area
                            position="date*temperature"
                            tooltip={['temperature', (temperature)=>{ // array
                                return {
                                    title: '',
                                    value: 'Temperature: '+temperature + ' °C'
                                }
                            }]}
                            color="#fff"
                        />
                        <Axis name="temperature" visible={false} />
                        <Axis name="date" visible={false} />
                    </Chart>
                    <div className="weather-chart-axis mt-2">
                        <div className="d-flex justify-content-between">
                            {axis}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

