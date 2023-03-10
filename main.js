

let weatherInfo = document.querySelector(".weatherInfo");
let inputPlace = document.querySelector("#inputPlace");
let audio=new Audio("vibration.mp3")



let key="e08bad90f81e840e2876e904707f5b9e";


//date
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const date = new Date();


let cityName;

inputPlace.addEventListener("input", function () {
    cityName = inputPlace.value;
    localStorage.setItem("city",cityName);


});

window.addEventListener("DOMContentLoaded",function(){
    inputPlace.value=localStorage.getItem("city");
    if(inputPlace.value!=""){
    cityName=inputPlace.value;
    displayWeatherInformation();
    }else{
        cityName="Kathmandu";
        displayWeatherInformation();

    }
})
inputPlace.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        displayWeatherInformation();
    }

}
)
function displayWeatherInformation(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`)
            .then(response => response.json())
            .then((data) => {
                
                if(data.cod==404){
                    weatherInfo.innerHTML=`<p id="error">Invalid place name...</p>`
                    audio.play();
                }
               

                //function to calculate sunrise and sunset time
                function sunTime(riseSet) {
                    const result = new Date(riseSet * 1000).toLocaleString();
                    return (result.slice(11, result.length))
                }

                weatherInfo.innerHTML = `
          
            <p class="cityName">${data.name}, ${data.sys.country} </p>
           
            <div class="date">
                <p>${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()} ${days[date.getDay()]}</p>
            </div>
            <p class="temperature">${Math.round(data.main.temp - 273)}??C</p>
            <p class="description">${data.weather[0].description}</p>
            <div class="sun">
            <div class="sunrise">
                <ion-icon name="sunny" id="rise"></ion-icon>
                <p id="riseTime">${sunTime(data.sys.sunrise)}</p>
                </div>
                <div class="sunset">
                <ion-icon name="partly-sunny" id="set"></ion-icon>
                <p id="setTime">${sunTime(data.sys.sunset)}</p>
                </div>
            </div>
            <p id="note">*All times are in Nepal time</p>
            `
                if (`${Math.round(data.main.temp - 273)}` > 15) {
                    document.body.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)), url(./images/warm.jpg)"
                } else {
                    document.body.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)), url(./images/cold.jpg)"
                }


            })
            .catch(err => "error found")
}

