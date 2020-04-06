function ticketmasterApi(city,state) {
  var queryURL = 
  'https://app.ticketmaster.com/discovery/v2/events.json?city='+city+'&state='+state+'&countryCode=US&apikey=9mKYubHvysymdsPpXe7Pq2sxKvRleMXG';
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
  console.log(response._embedded.events);
  // Empty the contents of the artist-div, append the new artist content
  //   $("#artist-div").empty();
  //   $("#artist-div").append(artistURL, artistImage, trackerCount, upcomingEvents, goToArtist);
  });
}

function zomatoApi(city) {
  var zomatoQueryURL = 
  'https://developers.zomato.com/api/v2.1/search?sort=rating?query='+city;
  $.ajax({
    url: zomatoQueryURL,
    method: "GET",
    headers: {"user-key": "0b9e3b638ba97d52057928d7ce2e70ae"}
  }).then(function(response) {
    console.log(response);
    // userLat  = [response.location_suggestions[0].latitude,response.location_suggestions[0].longitude];
    // userLong = response.location_suggestions[0].longitude;

  });
}



  // Event handler for user clicking the select-artist button
$("#select-artist").on("click", function(event) {
  // Preventing the button from trying to submit the form
  event.preventDefault();
  // Storing the artist name
  var cityInput = $("#city-input").val().trim();
  var stateInput = $("#state-input").val().trim();
  // var zipCodeInput = $("#zip-input").val().trim();
  // Running the ticketmasterApi function(passing in the artist as an argument)
  ticketmasterApi(cityInput,stateInput);
  zomatoApi(cityInput);
  });