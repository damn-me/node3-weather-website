import request from 'request'
var city = 'Delhi'

export const forecast=(address, callback)=>{
    const url2 = 'http://api.weatherstack.com/current?access_key=ca14ffb17bfc9fe2db71b2691808a2ea&query='+address+'&units=m'
    console.log(url2)
    request({url:url2, json:true}, (error, response)=>{
        if(error!=undefined){
            console.log('Unable to reach the location servers')
        }
        else if(response.success === false){
            console.log('Invalid Coordinates')
        }
        else{
            const dataCurrent = response.body.current
            const dataLocation = response.body.location 
            var temp=dataCurrent.temperature
            var unit = ' C'
            switch(url2[url2.length-1]){
                case 's':
                    unit=" Kelvin"
                    break;
                case 'f':
                    unit=" Degree F"
                    break;
                default:
                    unit=" Degree C"
                    break
            }
            callback(undefined, {
                temperature: temp,
                units: unit 
            })
        }
    })
}


// forecast(city, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
//  })