import Parser from "rss-parser";

export default class WeatherService {
    _base = "https://api.openweathermap.org/data/2.5";
    _api = "&appid=48b9e43bcf4ceb09bc49daf4ca9d2223";

    async getResource(url) {
        const res = await fetch(`${this._base}${url}${this._api}`);

        if (!res.ok) {
            return { status: "error" };
        }

        return await res.json();
    }

    getCityCoords = async (city) => {
        const res = await this.getResource(`/weather?q=${city}`);

        if (res.status === "error") return { status: "error" };

        return this._currentWeatherTransform(res);
    };

    getWeatherAir = async (city) => {
        const { lat, lon } = await this.getCityCoords(city);

        if (lat === undefined) return [{ status: "error" }];

        const res = await this.getResource(
            `/air_pollution/forecast?lat=${lat}&lon=${lon}`
        ).then((data) => {
            return this._airQualityTransform(data);
        });

        return res;
    };

    getWeeklyWeather = async (city) => {
        const { lat, lon } = await this.getCityCoords(city);

        if (lat === undefined) return [{ status: "error" }];

        const res = await this.getResource(
            `/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely`
        ).then((data) => {
            return data.daily.map(this._weeklyWeatherTransform);
        });

        return res;
    };

    getHourlyWeather = async (city) => {
        const { lat, lon } = await this.getCityCoords(city);

        if (lat === undefined) return [{ status: "error" }];

        const res = await this.getResource(
            `/onecall?lat=${lat}&lon=${lon}&exclude=daily,minutely`
        ).then((data) => {
            return data.hourly.map(this._hourlyWeatherTransform);
        });
        return res;
    };

    getWeatherIcon = (weather) => {
        switch (weather) {
            case "Clear":
                return <i className="fas fa-sun" />;
            case "Snow":
                return <i className="far fa-snowflake" />;
            case "Clouds":
                return <i className="fas fa-cloud-sun" />;
            case "Rain":
                return <i className="fas fa-cloud-showers-heavy" />;
            default:
                return <i className="fas fa-sun" />;
        }
    };

    _currentWeatherTransform(weather_info) {
        return {
            lat: weather_info.coord.lat,
            lon: weather_info.coord.lon,
            timezone: weather_info.timezone
        };
    }

    _weeklyWeatherTransform(weather_info) {
        return {
            date: weather_info.dt,
            icon: weather_info.weather[0].main,
            humidity: weather_info.humidity,
            pressure: weather_info.pressure,
            temperature: weather_info.temp.day,
            temperature_min: weather_info.temp.min,
            temperature_max: weather_info.temp.max,
            wind_speed: weather_info.wind_speed,
            wind_direction: weather_info.wind_deg,
            sunset: weather_info.sunset,
            sunrise: weather_info.sunrise,
            feels_like: weather_info.feels_like.day,
            uvi: weather_info.uvi,
        };
    }

    _hourlyWeatherTransform(weather_info) {
        const data = new Date(weather_info.dt * 1000);
        return {
            date: ("0" + data.getHours()).slice(-2),
            temperature: Math.round((weather_info.temp - 273) * 10) / 10,
        };
    }

    _airQualityTransform(weather_info) {
        const data = weather_info.list

        const date = parseInt(new Date().getTime()/1000)

        const currentData = data.find((el) => {
            if (el.dt - date <= 3600 && el.dt - date > 0) return el.components
        })

        let res = []


        for (let values in currentData.components){
            res.push({name: values, value: currentData.components[values]})
        }

        return res
    }
}
