// working test API
// https://api.openweathermap.org/data/2.5/forecast?q=phoenix&appid=6ed65cedaa6283adec9d58e044c97bf1
var data;
var searchHist = [];
var currentCity;
// "Seattle", "Holbrook", "Phoenix", "Durango"




// var currentCity = searchHist[0];
var APIKey = "6ed65cedaa6283adec9d58e044c97bf1";



///////// Add new city //////////////
// Add new City button
var newCity;
$("#addCityBtn").click(function () {
	event.preventDefault();
	// run citySearch to validate city
	currentCity = $(this).prev().val();
	// $(this).prev().text();
	$(this).val("");
	getCity();

});

// Load buttons from local storage



///////// Display Weather Data ////////
$(".cityBtn").click(function () {
	currentCity = ($(this).val())
	console.log(currentCity);

	getCity();
});


////////// Fetch Data from server /////////////////////
// Here we run our AJAX call to the OpenWeatherMap API
function getCity() {
	var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&appid=" + APIKey;

	$.ajax({
		url: queryURL,
		method: "GET",
		// dataType: "json",
		success: function (data) {

			// Update current city
			currentCity = data.city.name;
			console.log("get city:  " + currentCity)
			console.log(data);

			/////////Create Button///////////
			// If city is valid then create button
			if (!data.city.name) {
				alert("City not found, please try again")

				// if search is already a button then just display without making a new button
			} else if (searchHist.includes(currentCity)) {
				displayCity()

			} else {

				// Create button
				var cityBtn = $("<button>");
				cityBtn.addClass("list-group-item list-group-item-action cityBtn");
				cityBtn.text(data.city.name);
				cityBtn.text(newCity);
				$(".list-group").append(cityBtn);

				// Store search in local storage
				searchHist.push(currentCity);
				localStorage.setItem("storeHist", JSON.stringify(searchHist))
				displayCity()
			}

			/////////////// Display Current Weather /////////////////
			function displayCity() {
				for (let i = 0; i < data.list.length/8; i++) {
					var d = 0;
														
					$(".currentCity"+ (i+1)).html(data.city.name + " Weather Details");
					$(".wind"+ (i+1)).text("Wind Speed: " + data.list[d].wind.speed);
					$(".humidity"+ (i+1)).text("Humidity: " + data.list[d].main.humidity);
					$(".temp"+ (i+1)).text("Temperature: " + (((data.list[d].main.temp - 273.15) * 1.80) + 32).toFixed() + " F");
					$(".uvIndex"+ (i+1)).text("UV Index: " + data.list[d].main.temp);
					d=d+8
				}

				$(".currentCity6").html(data.city.name + " Weather Details");
					$(".wind6").text("Wind Speed: " + data.list[39].wind.speed);
					$(".humidity6").text("Humidity: " + data.list[39].main.humidity);
					$(".temp6").text("Temperature: " + (((data.list[39].main.temp - 273.15) * 1.80) + 32).toFixed() + " F");
					$(".uvIndex6").text("UV Index: " + data.list[39].main.temp);
					d=d+8
			}
		}
	})
}


// if (localStorage.getItem(searchHist) !== null) {
	
	var storeHist = JSON.parse(localStorage.getItem("storeHist"))
	for (let i = 0; i < storeHist.length; i++) {
		currentCity = storeHist[i]
		getCity();
	}
	currentCity = storeHist[0]
	