const request = require ('request')

const forecast = (longitude,latitude,callback) => {
const url ='http://api.weatherstack.com/current?access_key=0bd33409b21af42b14b4a079b86bb0ad&query=' +latitude+ ',' + longitude+''
request({ url: url , json: true }, (error, { body }) => {
       if(error)
       {
           callback('Unable to connect to weather service',undefined)
       } else if(body.error) {
           callback('Unable to find location.')
       } else{
           callback(undefined, body.current.weather_descriptions[0] +' : It is currently ' +body.current.temperature +' degrees out. But it feels like '+body.current.feelslike +' degrees if the humidity is '+body.current.humidity +' %. And there is '+body.current.precip +'% chance of rain.' )
       }
    })
}   
    module.exports = forecast