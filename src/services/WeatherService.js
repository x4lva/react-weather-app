export default class WeatherService{

    _base = "http://api.openweathermap.org/data/2.5";
    _api = "&appid=b970beef087700bc68bf69be68023073";

    async getResource(url){
        const res = await fetch(`${this._base}${url}${this._api}`);

        if (!res.ok){
            throw new Error("Could not connect with API");
        }

        return await res.json();
    }

    getCurrentWeather = async (city) => {
        const res = await this.getResource(`/weather?q=${city}`);
        return this._weatherInfoTransform(res);
    }

    getWeeklyWeather = async (city) => {
        const {lat, lon} = await this.getCurrentWeather(city);
        const res = await this.getResource(`/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely`).then((data) => {
            return data.daily.map(this._weeklyWeatherTransform)
        });
        return res;
    }

    _weatherInfoTransform(weather_info){
        return {
            city: weather_info.name,
            country: weather_info.sys.country,
            temperature: weather_info.main.temp,
            temperature_min: weather_info.main.temp_min,
            temperature_max: weather_info.main.temp_max,
            pressure: weather_info.main.pressure,
            humidity: weather_info.main.humidity,
            wind_speed: weather_info.wind.speed,
            wind_direction: weather_info.wind.deg,
            lat: weather_info.coord.lat,
            lon: weather_info.coord.lon
        }
    }

    _weeklyWeatherTransform(weather_info){
        return {
            date: weather_info.dt,
            humidity: weather_info.humidity,
            pressure: weather_info.pressure,
            temperature: weather_info.temp.day,
            temperature_min: weather_info.temp.min,
            temperature_max: weather_info.temp.max,
            wind_speed: weather_info.wind_speed,
            wind_direction: weather_info.wind_deg
        }
    }

}
