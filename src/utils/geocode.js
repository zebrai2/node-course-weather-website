const request = require('request')

const geocode = (address, callback) => {
  const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?'
                  +'access_token=pk.eyJ1IjoiemVicmFpMiIsImEiOiJja3MwdjhxdGEwMXdoMm9vM3J5bWFwOGZkIn0.5MbDE1rnfHdHA9AV6OE2fg'
                  +'&limit=1'
  request({url, json: true }, (error, {body}) => {
    if(error) {
      callback('Unable to connect to location services!')
    }
    else if(!body.features || body.features.length === 0) {
      callback('Unable to find location')
    } else {
      callback(undefined, {
        logitude: body.features[0].center[0], 
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode