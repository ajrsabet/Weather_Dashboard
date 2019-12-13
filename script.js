// working test API
// https://api.openweathermap.org/data/2.5/forecast?q=phoenix&appid=6ed65cedaa6283adec9d58e044c97bf1

var currentCity = "Seattle";
var APIKey = "6ed65cedaa6283adec9d58e044c97bf1";
// Here we are building the URL we need to query the database
displayCity();

///////// Add new city //////////////
// Validate City
// function citySearch() {
// 	$.ajax({
// 			url: queryURL,
// 			method: "GET"
// 		})

// 		.then(function (response) {

// 			// Log the resulting object
// 			// console.log(response);
// 		})
// }

// Add new City button
$("#addCityBtn").click(function () {
	event.preventDefault();
	// run citySearch to validate city

	// If city is valid then create button
	if ($(this).prev().val()) {
		// currentCity = "";
		var cityBtn = $("<div>");
		cityBtn.addClass("list-group-item list-group-item-action");
		cityBtn.text($(this).prev().val());
		$(".list-group").append(cityBtn);
		currentCity = ($(this).prev().val())

		$(".currentCity").html(response.city.name + " Weather Details")

		console.log(currentCity);
		displayCity();

		// Update currentCity

	} else {
		alert("City not found, please try again")
	}
});

// Load buttons from local storage



///////// Display Weather Data ////////
$(".cityBtn").click(function () {
	currentCity = ($(this).val())
	console.log(currentCity);

	displayCity();
});
// Here we run our AJAX call to the OpenWeatherMap API
function displayCity() {
	var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&appid=" + APIKey;

	$.ajax({
			url: queryURL,
			method: "GET"
		})

		.then(function (response) {

			// Log the resulting object
			console.log(response);

			// var n;
			// var timeForcastArr = [];
			
			// for (let i = 0; i < response.list.length; i++) {
			// 	timeForcastArr.push().response.list[i].dt

			// }
				
			// console.log(timeForcastArr);

				// Transfer content to HTML
				$(".currentCity").html(response.city.name + " Weather Details");
				
				$(".wind").text("Wind Speed: " + response.list[0].wind.speed);
				
				$(".humidity").text("Humidity: " + response.list[0].main.humidity);
				
				$(".temp").text("Temperature: " + ((response.list[0].main.temp - 273.15) * (1.80 + 32)).toFixed() + " F / " + (response.list[0].main.temp - 273.15).toFixed() + " C");

				$(".uvIndex").text("UV Index: " + response.list[0].main.temp);


			// Converts the temp to Kelvin with the below formula
			// var tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
			// $(".tempF").text("Temperature (Kelvin) " + tempF);

			// Log the data in the console as well
			// console.log("Wind Speed: " + response.wind.speed);
			// console.log("Humidity: " + response.main.humidity);
			// console.log("Temperature (F): " + response.main.temp);
		})

};