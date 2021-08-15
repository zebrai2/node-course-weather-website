const request = require('request')

const forecast = (longitude, latitutde, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=c7b056c191908f6cc540e7688cccb7b3&query=' + latitutde + ',' + longitude +'&units=f'
  request({url, json: true }, (error, {body}) => {
    if(error){
      callback("Unable to connect to weather service!")
    } else if(body.error) {
      callback('Unable to find location')
    } else {
      const temperature = body.current.temperature
      const feelsLike = body.current.feelslike
      const pressure = body.current.pressure

      callback(undefined, body.current.weather_descriptions[0] + '.  It is currently ' + temperature + ' degrees out.  It feels like ' + feelsLike + ' degrees out. The current atmospheric pressure is ' + pressure)
    }
  })
}

module.exports = forecast