const request = require('request')

const geoCode = (searchTerm, callback) => {
    const token = "pk.eyJ1Ijoicm9oaXRzaW5naDI0NyIsImEiOiJjazdkNTVwYnUxbHRmM2ZudXJrcXpzc2IwIn0.E2e_db55u-1if9lDIJNm1A"
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchTerm)}.json?access_token=${token}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location services.", undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search.", undefined)
        } else {
            const lat = body.features[0].center[1]
            const long = body.features[0].center[0]
            const location = body.features[0].place_name
            const data = { lat, long, location }

            callback(undefined, data)
        }
    })
}

module.exports = geoCode