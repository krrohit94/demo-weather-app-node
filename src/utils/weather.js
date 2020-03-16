const request = require('request')

const forecast = ({ lat, long }, callback) => {
        const url = `https://api.darksky.net/forecast/847b3a280f778f119badb0a9a9eb894b/${ lat },${ long }/`
        request({ url, json: true }, (error, { body }) => {
            if (error) {
                callback("Unable to connect to Weather Services.")
            } else if (body.error) {
                callback("Unable to find location")
            } else {
                const data = body.currently
                const dailySummary = body.daily.data[0].summary
                const forecast = `${dailySummary} It is currently ${data.temperature} degrees out and there is ${data.precipProbability}% chance of rain.`
                callback(undefined, forecast)
            }
        })
}

module.exports = forecast