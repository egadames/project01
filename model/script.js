import kjk  from '../assets'

function ticketmasterApi(city) {
  $.ajax({
    url: 'https://app.ticketmaster.com/discovery/v2/events.json?city='+city+'&apikey=9mKYubHvysymdsPpXe7Pq2sxKvRleMXG&sort=date,asc',
    method: "GET"
  }).then(function(response) {
    console.log(response)
    for(i=0; i < 4; i++){
      eventName    = $("<h5>").text(response._embedded.events[i].name);
      eventImg     = $("<img>").attr('src', response._embedded.events[i].images[0].url);
      eventDate    = $("<p>").text('Date: ' + moment(response._embedded.events[i].dates.start.localDate).format("MM-DD-YYYY"));
      eventLink    = $("<a>").attr('href', response._embedded.events[i].url).text("Ticketmaster Link");
      $("#eventImg" + i).append(eventImg);
      $("#eventContent" + i).append(eventName, eventDate);
      $("#eventLink" + i).prepend(eventLink);
    }
  });
}

function yelpApi(city) {
  $.ajax({
    url: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location='+city,
    method: "GET",
    headers: {"Authorization": "Bearer WZ2AxfTlxGblUeRS9GeYIz5mgsyqXVRehqpuvlvbt7JgftNVQphJM1nfG5_iQgMkBkNrUQzwZL7phChkPMbDrDzFscB5XPScjfxZ92yHENRNJmaQw1Sk-W_6kIGHXnYx"}
  }).then(function(response) {
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

function zomatoLocationApi(city) {
  $.ajax({
    url: 'https://developers.zomato.com/api/v2.1/locations?query='+city,
    method: "GET",
    headers: {"user-key": "0b9e3b638ba97d52057928d7ce2e70ae"},
    success: hikingprojectApi
  })

  function hikingprojectApi(response) {
    userLat  = response.location_suggestions[0].latitude;
    userLong = response.location_suggestions[0].longitude;
    $.ajax({
      url: `https://www.hikingproject.com/data/get-trails?lat=${userLat}&lon=${userLong}&sort=distance&maxDistance=10&key=200722236-c9d334b7b0746d576ba7bf0ccbffafea`,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      console.log(response.trails[0].difficulty);
      for(i=0; i < 4; i++){
        campName = $("<h5>").text(response.trails[i].name);
        campDifficulty = $("<p>").text('Length : ' + response.trails[i].length + ' Miles');
        campRating = $("<p>").text(response.trails[i].stars + ' stars');
        campImg    = $("<img>").attr('src', response.trails[i].imgMedium);
        campLink  = $("<a>").attr('href', response.trails[i].url).text(response.trails[i].name);
        $("#campImg" + i).append(campImg);
        $("#campContent" + i).append(campName, campDifficulty, campRating);
        $("#campLink" + i).prepend(campLink);
      }
    });
  }
}

// Event handler for user clicking the search button
$("#button").on("click", function(event) {
 
  // Storing the city from the user
  var cityInput = $("#city").val().trim();

  // Updating the links into the Navbar
  $("#eatLink").attr('href', `https://www.yelp.com/search?find_desc=&find_loc=${cityInput}&ns=1`);

  $("#showLink").attr('href', 'https://www.ticketmaster.com/');

  $("#outdoorLink").attr('href', 'https://www.hikingproject.com/search?q=' + cityInput);

  // This activates the function to load the card
  ticketmasterApi(cityInput);
  zomatoLocationApi(cityInput);
  yelpApi(cityInput);

  // This clears the search area
  $(".searchContainer").empty();

  });

