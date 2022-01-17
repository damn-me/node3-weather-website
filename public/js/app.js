const weatherForm = document.querySelector('form')

const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

message1.textContent = 'Loading...'
message2.textContent = ''

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value

    console.log(location)
        const url = '/weather?address='+location
        console.log(url)
        fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message1.textContent = data.error
            }
            else{
                console.log(data)
                message1.textContent = data.place
                message2.textContent = data.temp + data.unit
            }
        })
    })
})