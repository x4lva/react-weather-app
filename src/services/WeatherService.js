export default class WeatherService{

    _base = "http://api.openweathermap.org/data/2.5/weather";
    _api = "&appid=b970beef087700bc68bf69be68023073";

    async getResource(url){
        const res = await fetch(`${this._base}${url}${this._api}`);

        if (!res.ok){
            throw new Error("Could not connect with API");
        }

        return await res.json();
    }

    getCurrentWeather = (city) => {
        this.getResource(`?q=${city}`).then((data) => {
            console.log(this._weatherInfoTransform(data))
        });
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
            wind_direction: weather_info.wind.deg
        }
    }

}


