const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/fe60cec6ae7778b9ad72c545c9c2a82f/'+latitude+','+ longitude
    request({url:url, json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error){
            callback('Unable to find the location', undefined)
        }else{
            callback(undefined, body.daily.data[0].summary + ' It is currently '+ body.currently.temperature + ' degrees out. There is a '+body.currently.precipProbability +' % of chance of rain.')
        }
    })
}

module.exports = forecast