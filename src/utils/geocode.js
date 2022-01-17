import request from 'request'
var city = 'Kolkata'



export const geoCode=(address, callback)=>{
    const url1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZGFtYW5kb3RwZSIsImEiOiJja3lhMGUzNHMwMHczMm9saXBzMmppYjd2In0.ki2lA6yNuHwKNBJTJbk3Ew&limit=1&worldview=in'
    request({url: url1, json:true}, (error, response)=>{
        var lon
        var loc
        var lat
        if(error){
            callback('Unable to connect to location sevices')
        }
        else if(response.body.features.length===0){
            callback('Unable to find location', undefined)
        }
        else{
        const data = response.body.features
        lon= data[0].geometry.coordinates[0]
        lat=data[0].geometry.coordinates[1]
        loc=data[0].place_name
        callback(undefined, {
            latitude: lat, 
            longitude: lon, 
            location: address
        })
        }
    })
}
// geoCode(city, (error, data)=>{
//     console.log('Error', error)
//     console.log('Data', data)
// })