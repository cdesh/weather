// Required functions
const request = require('request')



// Geocode function
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2Rlc2gxIiwiYSI6ImNrOWRob2VjNzAzdHMzbXA2ZHh1bXNjemMifQ.5NVSmWC9rm4LiVN-36lRtw&limit=1'
    request({ url, json: true}, (error, {body}) => {
        
        if (error) {
            callback('Unable to connect to location services!')
        } else if (body.features.length === []) {
            callback('Unable to find location.  Try another search.', undefined) // there is an error here, this else is not executed if no address, fix later
        } else {
            callback(undefined, {
                lat: body.features[0].center[0],
                long: body.features[0].center[1],
                loc: body.features[0].place_name
            })

        }
    })
}


// Export the necessary functions: geocode
module.exports = geocode