let todayData = document.getElementById("today-data")
let todayName = document.getElementById("today-date-day-name")
let todayNumber = document.getElementById("today-date-day-number")
let todayMonth = document.getElementById("today-date-month")
let todayLocation = document.getElementById("today-location")
let todayTemp = document.getElementById("today-temp")
let todayConditionImg = document.getElementById("today-condition-img")
let todayConditionText = document.getElementById("today-condition-text")
let today =document.getElementById("today")
let humidity =document.getElementById("humidity")
let wind =document.getElementById("wind")
let windDirection =document.getElementById("wind-direction")
let weatherData
// next day
let nextDay = document.getElementsByClassName("next-day-name")
let nextConditionImg = document.getElementsByClassName("next-condition-img")
let nextMaxTemp = document.getElementsByClassName("next-max-temp")
let nextMinTemp = document.getElementsByClassName("next-min-temp")
let nextConditionText = document.getElementsByClassName("next-condition-text")
// search
let searchInput = document.getElementById("search")





 async function getWeatherData(cityName){
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1439b310d19042f4a2f170331242501&q=${cityName}&days=3`)
    let weatherData = await weatherResponse.json()
    return weatherData
}


function displayDataToday(data){
    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-us" , {weekday:"long"})
    todayNumber.innerHTML = todayDate.getDate()
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-us" , {month:"long"})

    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayConditionImg.setAttribute("src",data.current.condition.icon)
    todayConditionText.innerHTML=data.current.condition.text
    humidity.innerHTML = data.current.humidity
    wind.innerHTML = data.current.wind_kph
    windDirection.innerHTML = data.current.wind_dir
}
function displayNextDay(data){
    let forcastDay = data.forecast.forecastday
    for (let i = 0; i < 2 ; i++) {
        let nextDate = new Date(forcastDay[i+1].date)
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-us" ,{weekday:"long"})
        nextMaxTemp[i].innerHTML = forcastDay[i+1].day.maxtemp_c
        nextMinTemp[i].innerHTML = forcastDay[i+1].day.mintemp_c
        nextConditionText[i].innerHTML = forcastDay[i+1].day.condition.text
        nextConditionImg[i].setAttribute("src",forcastDay[i+1].day.condition.icon)
    }
}





async function startApp(city="cairo"){
    let weatherData = await getWeatherData(city)
    if(!weatherData.error){
        displayDataToday(weatherData)
        displayNextDay(weatherData)

    }
}
searchInput.addEventListener("input" , function(){
    startApp(searchInput.value)
})
startApp()




 