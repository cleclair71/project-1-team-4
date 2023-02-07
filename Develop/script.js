//variables
var apikey = "2699b95b9f3bb5523129bfe9fb508790";
var searchBtn = document.querySelector("#submit-selection");
var playlist = document.querySelector(".displayed-playlists");
playlist.style.display = "none";
var input = document.querySelector("#city-input");
var currentTemp = document.querySelector("#temperature");
var currentCity = document.querySelector("#city-name");
var weather = document.querySelector("#weather-description");
var weatherModal = document.querySelector("#myModal")
weatherModal.style.display = "block"
var changeCityBtn = document.querySelector("#change-city")
//fardina's code
//autocomplete function using previously searched cities
function displayWeather(city) {
  input.value = ""
  //card to display playlist when city is selected
    playlist.style.display = "block";
    // fetches current weather
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + 
        city + 
        "&appid=" + 
        apikey + 
        "&units=imperial"
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //name of the city
            currentCity.innerHTML = data.name;
            //weather description
            weather.innerHTML = "Description: " + (data.weather[0].main);
            //temperature
            currentTemp.innerHTML = "Temperature: " + Math.floor(data.main.temp) + `&#8457`;
        })
}

let savedCities = JSON.parse(localStorage.getItem("city")) || []

//event listener
searchBtn.addEventListener("click", function () {
  //close modal on submit
  weatherModal.style.display = "none";
  var searchValue = input.value 
  displayWeather(searchValue);
  savedCities.push(searchValue);
  localStorage.setItem("city", JSON.stringify(savedCities));
  renderSearch()
  getPlaylist();
});
localStorage.clear()

//saving searched cities
function renderSearch(){
  var ul = document.querySelector(".city-list")
  for (var i =0; i< savedCities.length; i++) {
    var storedCities = savedCities[i]
    var storedList = document.createElement('li')
    storedList.classList.add("stored-list")
    storedList.textContent = storedCities
    // to display weather for stored list cities
    storedList.addEventListener("click", function(){
      displayWeather(storedList.textContent)
    })
  }
  //append list to ul element
  ul.appendChild(storedList)
}

//event listener to open modal once change city button is selected
changeCityBtn.addEventListener("click", function (){
  weatherModal.style.display = "block";
})






    

//jackson's code 
var key = "AIzaSyBDMCgP5fKCMZ7RcyVVZL0XPJuQuuNZqLQ"

function getPlaylist() {
  //Splice to remove "Description: " from the text content and return the weather condition 
  var currentWeather = weather.textContent.slice(13);
  
  var genre = document.querySelector("#genre-dropdown").value;
  switch (currentWeather) {
    case "Rain":
    case "Drizzle":
      mood = ["Sad", "Lonely", "Rainy Day", "Cry", "Chill"];
      break;
    case "Clear":
      mood = ["Happy", "Sunny", "Cheerful", "Smile", "Sunshine"];
      break;
    case "Thunderstorm":
      mood = ["Depressed", "Sadness", "Stormy", "Downhearted", "Despair"];
      break;
    case "Snow":
      mood = ["Snowy", "Cold", "Winter", "Mellow", "Chilly"];
      break;
    case "Cloudy":
      mood = ["Cloudy", "Uncertain", "Hazy", "Overcast", "Moody"];
  }

  /* 
  Call to Youtube's API to get 5 playlist results using 'mood' based on the weather and 'genre' 
  from the user's selection to form a search along the lines of 'playlist music sad country' 
  to find a playlist for 5 different key words of 'mood' to produce 1 playlist for each
  */
  for (var i=0; i<5; i++) {
    fetch ('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=playlist&q=music ' + mood[i] + ' ' + genre + '&key=' + key)
      .then (function (response) {
        return response.json();
      })
      .then (function (data) {
        var id = data.items[0].id.playlistId;
    });
  }
}

//rajvir's code