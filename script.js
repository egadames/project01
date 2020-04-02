$.ajax({
    url: 'https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200155036-c334b90049b4ac69e75e7d51788d225f',
    method: "GET"
  }).then(function(response) {
    console.log(response);
});

$.ajax({
    url: 'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&postalCode=94702&apikey=9mKYubHvysymdsPpXe7Pq2sxKvRleMXG',
    method: "GET"
  }).then(function(response) {
    console.log(response);
});

$.ajax({
    url: 'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&postalCode=94702&apikey=9mKYubHvysymdsPpXe7Pq2sxKvRleMXG',
    method: "GET"
  }).then(function(response) {
    console.log(response);
});