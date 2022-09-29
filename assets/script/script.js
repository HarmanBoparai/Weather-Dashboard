//Variables
let searchbtn = document.getElementById("search_button")
let inputbox = document.getElementById("city_input")
let singledayforecast = document.getElementById("singledayforecast")
let history = [];

//Adding eventlistener to the searchbtn
searchbtn.addEventListener("click", function(event){
    event.preventDefault();
    let cityName = inputbox.value;
    fetchCityData(cityName);
})

// function for fetch data from the openweathermap

function fetchCityData(cityName) {
   saveLocal(cityName);
    getLocal();
    console.log(cityName)
    let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a813d1d337bb33fb9ed8d531e77212c8`
    let currentDayWeather = fetch(requestUrl).then(response => response.json()).then(data => {
        console.log(data)
        $("#singledayforecast").children().remove();
        let latitude = data.coord.lat
        let longitude = data.coord.lon
        let cityname = data.name
        let temp = data.main.temp
        let wind = data.wind.speed
        let humidity = data.main.humidity
        const h2= document.createElement("h2");
        const textNode = document.createTextNode("Today Weather Forecast");
        h2.appendChild(textNode); 
        let h1El = document.createElement("h1")
        h1El.innerHTML = cityname
        let temp_p = document.createElement("p")
        temp_p.innerHTML = temp
        let wind_p = document.createElement("p")
        wind_p.innerHTML = wind
        let humidity_p = document.createElement("p")
        humidity_p.innerHTML = humidity
       
        
        singledayforecast.append(h2,h1El, temp_p, wind_p, humidity_p)
        generateForecast(cityname, latitude, longitude)
    })
}

// function for generating the forecast
function generateForecast(cityname, lat, lon) {
    let forecastvalue = fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=a813d1d337bb33fb9ed8d531e77212c8`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let list = data.list
            let index = 0;
            console.log(list)
            for (let i = 0; i < list.length; i = i + 8) {
                index++;
                console.log(index)
                console.log(list[i].dt_txt.split(" ")[0]);
                console.log($(`#forecast_${index}`));
                $(`#forecast_${index}`).text(list[i].dt_txt.split(" ")[0]);
                // document.getElementsByClassName(`forecast_${index}`).innerHTML=list[i].dt_txt.split(" ")[0]
                $(`#temp${index}`).text(list[i].main.temp);
                $(`#wind${index}`).text(list[i].wind.speed);
                $(`#humi${index}`).text(list[i].main.humidity);

            }
        })
}

// Saving the cityname to the local storage
function saveLocal(city) {
    if(history.length>5){
        history.pop();
    }
    history.push(city);
    localStorage.setItem("historyKey", JSON.stringify(history));
}

//Getting the names of the cities stored from the history array
function getLocal() {

    history = JSON.parse(localStorage.getItem("historyKey"));
    if (history == null) {
        history = [];
    }
    $("#history-box").children().remove();
    for (let i = 0; i < history.length; i++) {
       let liEl =  $("<li>").addClass("btn btn-primary").text(history[i])
        $("#history-box").append(liEl);  
    }
}

getLocal();

$("#history-box").on("click",".btn",function(event) {
    let city = $(event.target).text();
    fetchCityData(city);

});



