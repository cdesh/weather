// Required functions
const request = require('request')
const chalk = require('chalk')


// Forecast function

const forecast = (lat, long, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=8eccf49678d81a5ddeb7899138aa8c28&units=f&query=' + long + ',' + lat + '&units=f'
    request({url, json: true}, (error, {body}) => {
        
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location.  Try another search.', undefined)
        } else {
            callback(undefined, 'The current temperature in ' + body.location.name + ' is ' + body.current.temperature + ' and it is ' + body.current.weather_descriptions[0])

        }
    })
}

// Export the necessary functions: forecast
module.exports = forecast