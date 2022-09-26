let searchbtn=document.getElementById("search_button")
let inputbox=document.getElementById("city_input")
function fetchCityData(event){
    event.preventDefault();
    let cityName=inputbox.value;
    console.log(cityName)
    let requestUrl="https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=a813d1d337bb33fb9ed8d531e77212c8"
    let currentDayWeather=fetch(requestUrl).then(response =>response.json()).then(data=>{
        console.log(data)
        let latitude=data.coord.lat
        let longitude=data.coord.lon

    })
}
searchbtn.addEventListener("click",fetchCityData)
