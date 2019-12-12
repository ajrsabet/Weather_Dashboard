// API Key 6ed65cedaa6283adec9d58e044c97bf1
//api.openweathermap.org/data/2.5/forecast?q=phoenix&appid=6ed65cedaa6283adec9d58e044c97bf1

var currentCity = "Seattle, Washington";
var APIKey = "6ed65cedaa6283adec9d58e044c97bf1";
// Here we are building the URL we need to query the database
var queryURL = "api.openweathermap.org/data/2.5/forecast?" +
    "q=" + currentCity +"&units=imperial&appid=" + APIKey;


$("#addCityBtn").click(function () {
    event.preventDefault();
    var cityBtn = $("<div>");
    cityBtn.addClass("list-group-item list-group-item-action");
    cityBtn.text($(this).prev().val());
    $(".list-group").append(cityBtn);
currentCity = cityBtn.text($(this).prev().val())

console.log(currentCity);

    displayCity();
});

$(".cityBtn").click(function () {

    displayCity();
});
// Here we run our AJAX call to the OpenWeatherMap API
function displayCity() {
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function (response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML

        // Transfer content to HTML
    //     $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    //     $(".wind").text("Wind Speed: " + response.wind.speed);
    //     $(".humidity").text("Humidity: " + response.main.humidity);
    //     $(".temp").text("Temperature (F) " + response.main.temp);

        // Converts the temp to Kelvin with the below formula
    //     var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    //     $(".tempF").text("Temperature (Kelvin) " + tempF);

        // Log the data in the console as well
    //     console.log("Wind Speed: " + response.wind.speed);
    //     console.log("Humidity: " + response.main.humidity);
    //     console.log("Temperature (F): " + response.main.temp);
    })

};