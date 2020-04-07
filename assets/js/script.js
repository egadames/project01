function ticketmasterApi(city,state) {
  $.ajax({
    url: 'https://app.ticketmaster.com/discovery/v2/events.json?city='+city+'&state='+state+'&countryCode=US&apikey=9mKYubHvysymdsPpXe7Pq2sxKvRleMXG',
    method: "GET"
  }).then(function(response) {
    console.log(response)
    for(i=0; i < 4; i++){
      eventName    = $("<h5>").text(response._embedded.events[i].name);
      eventImg     = $("<img>").attr('src', response._embedded.events[i].images[0].url);
      eventDate    = $("<p>").text('Date: ' + moment(response._embedded.events[i].dates.start.localDate).format("MM-DD-YYYY"));
      eventPrice   = $("<p>").text('Price Range: $' + response._embedded.events[i].priceRanges[0].min + ' - $' + response._embedded.events[i].priceRanges[0].max);
      eventLink    = $("<a>").attr('href', response._embedded.events[i].url).text(response._embedded.events[i].name);
      $("#eventImg" + i).append(eventImg);
      $("#eventContent" + i).append(eventName, eventDate, eventPrice);
      $("#eventLink" + i).prepend(eventLink);
    }
  });
}

function zomatoLocationApi(city) {
  $.ajax({
    url: 'https://developers.zomato.com/api/v2.1/locations?query='+city,
    method: "GET",
    headers: {"user-key": "0b9e3b638ba97d52057928d7ce2e70ae"}
  }).then(function(response) {
    console.log(response);
    userLat  = response.location_suggestions[0].latitude;
    userLong = response.location_suggestions[0].longitude;
  });
}

function yelpApi(city) {
  $.ajax({
    url: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location='+city,
    method: "GET",
    headers: {"Authorization": "Bearer WZ2AxfTlxGblUeRS9GeYIz5mgsyqXVRehqpuvlvbt7JgftNVQphJM1nfG5_iQgMkBkNrUQzwZL7phChkPMbDrDzFscB5XPScjfxZ92yHENRNJmaQw1Sk-W_6kIGHXnYx"}
  }).then(function(response) {
    console.log(response);
    for(i=0; i < 4; i++){
      restName    = $("<h5>").text(response.businesses[i].name);
      restImg     = $("<img>").attr('src', response.businesses[i].image_url);
      restAddress = $("<p>").text(response.businesses[i].location.address1 +', ' + response.businesses[i].location.city +', ' + response.businesses[i].location.state);
      restRating  = $("<p>").text('Rating Score: ' + response.businesses[i].rating);
      restPrice   = $("<p>").text('Price Level: ' + response.businesses[i].price);
      restLink    = $("<a>").attr('href', response.businesses[i].url).text(response.businesses[i].name);
      $("#restaurantImg" + i).append(restImg);
      $("#restaurantContent" + i).append(restName, restAddress, restRating, restPrice);
      $("#restaurantLink" + i).prepend(restLink);
    }
  });
}

// // Event handler for user clicking the select-artist button
// $("#select-artist").on("click", function(event) {
//   // Preventing the button from trying to submit the form
//   event.preventDefault();
//   // Storing the artist name
//   var cityInput = $("#city-input").val().trim();
//   var stateInput = $("#state-input").val().trim();
//   // var zipCodeInput = $("#zip-input").val().trim();
//   // Running the ticketmasterApi function(passing in the artist as an argument)
//   ticketmasterApi(cityInput,stateInput);
//   zomatoApi(cityInput);
//   yelpAPI(city);
//   });

ticketmasterApi('oakland');
// zomatoLocationApi('oakland');
yelpApi('oakland');


