
export default class CityService {

    getCityImage = async (city) => {
        const res = await fetch(`https://api.teleport.org/api/urban_areas/slug:${city.toLowerCase()}/images/`)

        if (!res.ok){
            return {image: ""}
        }

        const data = await res.json();
        return this._cityImageTransform(data)
    }


    _cityImageTransform(city){
        return {
            image: city.photos[0].image.web
        }
    }

}