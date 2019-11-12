//Search history------------------------------------------------------

// Initial array of cities
var cities = [];
// Generic function for capturing the city name from the data-attribute
function alertCityName() {
  var city;
}

// Function for displaying city data
function renderButtons() {
  // Deleting the cities prior to adding new cities
  // this is necessary otherwise we will have repeat buttons
  $("#history").empty();
  // Looping through the array of cities
  for (var i = 0; i < cities.length; i++) {
    // Then dynamicaly generating buttons for each city in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag.
    var a = $("<div>");
    // Adding a class
    a.addClass("city");
    // Added a data-attribute
    a.attr("data-name", cities[i]);
    // Provided the initial text
    a.text(cities[i]);
    // Added the text to the HTML
    $("#history").append(a);
  }
}

// This function handles events where one button is clicked
$("#search").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the input
  var city = $("#city-input")
    .val()
    .trim();
  // The city from the input is then added to our array
  cities.push(city);

  // Calling renderButtons which handles the processing of cities array
  renderButtons();
});
// Function for displaying the movie info
// We're adding a click event listener to all elements with the class "movie"
// We're adding the event listener to the document itself because it will
// work for dynamically generated elements
// $(".movies").on("click") will only add listeners to elements that are on the page at that time
$(document).on("click", ".city", alertCityName);
// Calling the renderButtons function to display the initial buttons
renderButtons();

//---------------------------------------------------------------
//Current weather

// This .on("click") function will trigger the AJAX Call
$("#search").on("click", function(event) {
  // Preventing the submit button from trying to submit the form
  // We're optionally using a form so the user may hit Enter to search instead of clicking the button
  event.preventDefault();
  document.getElementById("searchForm").style.width = "30%";
  // =================================================================
  var APIKey = "9d42ed92b9ec7b3834d7b7be7c880a20";
  // Here we grab the text from the input box
  var cityInput = $("#city-input").val();
  //____________________________________________

  // Here we are building the URL we need to query the database(WEATHER)
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityInput +
    "&units=imperial&appid=" +
    APIKey;

  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // Log the resulting object
    console.log(response);

    cityView.style.display = "block";

    $(".city-name").html("<h2>" + response.name + "</h2>");
    $(".icon").attr(
      "src",
      "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
    );

    $(".temp").text("Temperature: " + response.main.temp + " F");
    $(".hum").text("Humidity: " + response.main.humidity + " %");
    $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
    // UV index
    var lat = response.coord.lat;
    var lon = response.coord.lon;

    var queryURL =
      "http://api.openweathermap.org/data/2.5/uvi?appid=" +
      APIKey +
      "&lat=" +
      lat +
      "&lon=" +
      lon;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      $(".uv").text("UV index: " + response.value);
      var uvi = response.value;
      if (uvi > 6) {
        $(".uv").attr("style", "background: red");
      } else if (uvi < 3) {
        $(".uv").attr("style", "background: green");
      } else {
        $(".uv").attr("style", "background: yellow");
      }
    });
  });
  //_____________________________
  // Here we are building the URL we need to query the database(FORECAST FOR 5 DAYS)
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityInput +
    "&units=imperial&appid=" +
    APIKey;

  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // Log the resulting object
    console.log(response);
    //new ajax
    cityView.style.display = "block";

    $(".dateOne").text(response.list[5].dt_txt); //WITH TIME
    $(".iconOne").attr(
      "src",
      "http://openweathermap.org/img/w/" +
        response.list[5].weather[0].icon +
        ".png"
    );

    $(".tempOne").text("Temp: " + response.list[5].main.temp + " F");
    $(".humOne").text("Humidity: " + response.list[5].main.humidity + " %");
    $(".dateTwo").text(response.list[13].dt_txt); //WITH TIME
    $(".iconTwo").attr(
      "src",
      "http://openweathermap.org/img/w/" +
        response.list[13].weather[0].icon +
        ".png"
    );
    $(".tempTwo").text("Temp: " + response.list[13].main.temp + " F");
    $(".humTwo").text("Humidity: " + response.list[13].main.humidity + " %");
    $(".dateThree").text(response.list[21].dt_txt); //WITH TIME
    $(".iconThree").attr(
      "src",
      "http://openweathermap.org/img/w/" +
        response.list[21].weather[0].icon +
        ".png"
    );
    $(".tempThree").text("Temp: " + response.list[21].main.temp + " F");
    $(".humThree").text("Humidity: " + response.list[21].main.humidity + " %");
    $(".dateFour").text(response.list[29].dt_txt); //WITH TIME
    $(".iconFour").attr(
      "src",
      "http://openweathermap.org/img/w/" +
        response.list[29].weather[0].icon +
        ".png"
    );
    $(".tempFour").text("Temp: " + response.list[29].main.temp + " F");
    $(".humFour").text("Humidity: " + response.list[29].main.humidity + " %");
    $(".dateFive").text(response.list[37].dt_txt); //WITH TIME
    $(".iconFive").attr(
      "src",
      "http://openweathermap.org/img/w/" +
        response.list[37].weather[0].icon +
        ".png"
    );
    $(".tempFive").text("Temp: " + response.list[37].main.temp + " F");
    $(".humFive").text("Humidity: " + response.list[37].main.humidity + " %");
  });
  // =================================================================
});
