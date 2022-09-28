//Variables
let searchbtn=document.getElementById("search_button")
let inputbox=document.getElementById("city_input")
let singledayforecast=document.getElementById("singledayforecast")

// function for fetch data from the openweathermap
function fetchCityData(event){
    event.preventDefault();
    let cityName=inputbox.value;
    console.log(cityName)
    let requestUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a813d1d337bb33fb9ed8d531e77212c8`
    let currentDayWeather=fetch(requestUrl).then(response =>response.json()).then(data=>{
        console.log(data)
        let latitude=data.coord.lat
        let longitude=data.coord.lon
        let cityname=data.name
        let temp=data.main.temp
        let wind=data.wind.speed
        let humidity=data.main.humidity
        let h1El=document.createElement("h1")
        h1El.innerHTML=cityname
        let temp_p=document.createElement("p")
        temp_p.innerHTML=temp
        let wind_p=document.createElement("p")
        wind_p.innerHTML=wind
        let humidity_p=document.createElement("p")
        humidity_p.innerHTML=humidity
        singledayforecast.append(cityname,temp_p,wind_p,humidity_p)
        generateForecast(cityname,latitude,longitude)
    })
}

// function for generating the forecast
function generateForecast(cityname,lat,lon){
let forecastvalue=fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=a813d1d337bb33fb9ed8d531e77212c8`)
                  .then(res=>res.json())
                  .then(data=>{
                  console.log(data)
                  let list=data.list
                  let index=0;
                  console.log(list)
                  for(let i=0;i<list.length;i+=8){
                    index++;
                console.log(index)
                    document.getElementsByClassName(`forecast_${index}`).innerHTML=list[i].dt_txt.split(" ")[0]

                  }
})
}
searchbtn.addEventListener("click",fetchCityData)
