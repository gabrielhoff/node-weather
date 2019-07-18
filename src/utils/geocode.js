const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ2FicmllbGhvZmYiLCJhIjoiY2p4eHhhdmtnMDRiODNjbnp2cGtqNWpoMSJ9.kN8rBfTnEiLjp7KohH7Orw&limit=1'
    request( {url, json: true }, (error, {body}) => {
        const {features} = body
        if(error) {
            callback('Unable to connect to location services')
        }
        else if (features.length === 0) {
            callback('Unable to find location. Try another search')
        }
        else {
            callback(null , {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode