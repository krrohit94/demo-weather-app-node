const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const location1 = document.querySelector('#location1')
const temp = document.querySelector('#temp')
const humidity = document.querySelector('#humidity')
const forecast = document.querySelector('#forecast')
const summary = document.querySelector('#summary')
const daily_summary = document.querySelector('#daily_summary')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value

    location1.textContent = "Loading ..."
    temp.textContent = ''
    humidity.textContent = ''
    forecast.textContent = ''
    summary.textContent = ''
    daily_summary.textContent = ''

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                location1.textContent = data.error
            } else {
                location1.textContent = `Location : ${data.location.location}`
                temp.textContent = `Temperature : ${data.forecast.temperature}`
                humidity.textContent = `Humidity : ${data.forecast.humidity}`
                forecast.textContent = `Forecast : ${data.forecast.forecast}`
                summary.textContent = `Summary : ${data.forecast.summary}`
                daily_summary.textContent = `Daily Summary: ${data.forecast.daily_summary}`
            }
        })
    })

})