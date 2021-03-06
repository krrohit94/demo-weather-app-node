const request = require('request')

const forecast = ({ lat, long }, callback) => {
        const url = `https://api.darksky.net/forecast/847b3a280f778f119badb0a9a9eb894b/${ lat },${ long }/`
        request({ url, json: true }, (error, { body }) => {
            if (error) {
                callback("Unable to connect to Weather Services.")
            } else if (body.error) {
                callback("Unable to find location")
            } else {
                const currentData = body.currently
                const forecast = {
                    summary: currentData.summary,
                    temperature : `It is currently ${currentData.temperature} degrees.`, 
                    humidity: currentData.humidity,
                    forecast: `There is ${currentData.precipProbability}% chance of rain.`,
                    daily_summary: body.daily.summary
                }
                callback(undefined, forecast)
            }
        })
}

module.exports = forecast