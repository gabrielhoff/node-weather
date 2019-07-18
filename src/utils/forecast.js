const request = require('request')

const forecast = (latitude, longitude, callback) => {
    url = 'https://api.darksky.net/forecast/7fc6b950b5daa6c1935506a072f6f087/' + latitude + ',' + longitude + '?units=si'
    request( {url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service')
        }
        else {
            const {currently, daily, error} = body

            const {temperature, precipProbability} = currently;
            if(error) {
                callback('Unable to find location')
            }
            else {
                callback(null, daily.data[0].summary + " It is currently " + temperature + ". There is a " + precipProbability + "% chance of rain ")
            }
        }
    })
}

module.exports = forecast