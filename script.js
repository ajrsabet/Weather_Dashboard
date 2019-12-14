// working test API
// https://api.openweathermap.org/data/2.5/forecast?q=phoenix&appid=6ed65cedaa6283adec9d58e044c97bf1

var currentCity = "Seattle";


// var currentCity = searchHist[0];
var APIKey = "6ed65cedaa6283adec9d58e044c97bf1";


///////// Add new city //////////////
// Add new City button
var newCity;
$("#addCityBtn").click(function () {
	event.preventDefault();
	// run citySearch to validate city
	currentCity = $(this).prev().val();
	$(this).prev().val("");
	getCity();
	console.log(currentCity);

});


///////// Display Weather Data //////// 
$(".cityBtn").on("click",function () {
	currentCity = ($(this).val())
	// console.log(currentCity);

	getCity();
});


////////// Fetch Data from server /////////////////////
// Here we run our AJAX call to the OpenWeatherMap API
function getCity() {
	var lat;
	var lon;

	var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&appid=" + APIKey;

	// get 5 day weather
	$.ajax({
		url: queryURL,
		method: "GET",
		success: function (data) {
			lat = data.city.coord.lat
			lon = data.city.coord.lon
		
			// Update current city
			currentCity = data.city.name;
			
			/////////Create Button///////////
			// If city is valid then create button
			if (!data.city.name) {
				alert("City not found, please try again")

				// if search is already a button then just display without making a new button
			} else if (searchHist.includes(currentCity)) {
				displayCity()

			} else {
				// Create button
				var cityBtn = $("<div>");
				cityBtn.addClass("list-group-item list-group-item-action city-button");
				cityBtn.text(data.city.name);
				$(".list-group").append(cityBtn);

				// Store search in local storage
				searchHist.push(currentCity);
				localStorage.setItem("searchHist", JSON.stringify(searchHist))
				displayCity()
			}

			/////////////// Display Current Weather /////////////////
			$(".currentCity").html(data.city.name + " Weather Details");

			function displayCity() {
				for (let i = 0; i < data.list.length / 8; i++) {
					var d = 0;

					$(".wind" + (i + 1)).text("Wind Speed: " + data.list[d].wind.speed);
					$(".humidity" + (i + 1)).text("Humidity: " + data.list[d].main.humidity);
					$(".temp" + (i + 1)).text("Temperature: " + (((data.list[d].main.temp - 273.15) * 1.80) + 32).toFixed() + " F");

					d = d + 8
				}

				// Previous loup only returns 4 days. This runs to get the last data point
				$(".currentCity6").html(data.city.name + " Weather Details");
				$(".wind6").text("Wind Speed: " + data.list[39].wind.speed);
				$(".humidity6").text("Humidity: " + data.list[39].main.humidity);
				$(".temp6").text("Temperature: " + (((data.list[39].main.temp - 273.15) * 1.80) + 32).toFixed() + " F");

				// Set latitude and longitude variables for the next function
				getUV(lat, lon);
			}
		}
	})
}

// Get UV index
function getUV(lat, lon) {
	var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon
	$.ajax({
		url: queryURL2,
		method: "GET",
		success: function (data2) {
			$(".uvIndex").text("UV Index: " + data2.value);
		}
	})
}

var searchHist = [];
if (localStorage.getItem("searchHist") !== null) {

	searchHist = JSON.parse(localStorage.getItem("searchHist"))
	for (let i = 0; i < searchHist.length; i++) {
		var cityBtn = $("<div>");
		cityBtn.addClass("list-group-item list-group-item-action cityBtn");
		cityBtn.text(searchHist[i]);
		$(".list-group").append(cityBtn);
	}
	currentCity = searchHist[0]
}

getCity();