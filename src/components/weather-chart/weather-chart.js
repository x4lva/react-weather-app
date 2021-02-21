import React, {Component} from "react"
import {Axis, Chart, Path, Point} from "bizcharts";

export default class WeatherChart extends Component{
    render() {
        const label = {
            textStyle: {
                textAlign: "center",
                fill: "#404040",
                fontSize: "12",
                fontWeight: "bold",
                textBaseline: "top",
            },
        };

        const axis = this.props.hourlyWeather.slice(0, 7).map((el, idx) => {
            return (
                <div className="weather-chart-axis-item text-white" key={idx}>
                    {el.date}:00
                </div>
            );
        });

        return(
            <div className="weather-chart rounded-2 p-1 mt-3">
                <Chart
                    padding={[5, 0]}
                    autoFit
                    height={150}
                    data={this.props.hourlyWeather.slice(0, 7)}
                >
                    <Point
                        color="#fff"
                        shape="circle"
                        position="date*temperature"
                        size={2}
                    />
                    <Path
                        shape="smooth"
                        point
                        area
                        position="date*temperature"
                        tooltip={[
                            "temperature",
                            (temperature) => {
                                // array
                                return {
                                    title: "",
                                    value:
                                        "Temperature: " +
                                        temperature +
                                        " °C",
                                };
                            },
                        ]}
                        color="#fff"
                    />
                    <Axis name="temperature" visible={false} />
                    <Axis name="date" visible={false} />
                </Chart>
                <div className="weather-chart-axis ms-1 me-1 mt-2 rounded-2">
                    <div className="d-flex justify-content-between rounded-2">
                        {axis}
                    </div>
                </div>
            </div>
        )
    }
}