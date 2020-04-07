// Variable to display current date
var date = moment().format('MMMM Do YYYY');

// Logs time to Jumbotron area
$("#currentDay").text(date);

for(i=1; i <= 24; i++){
    //grab the local storage array
    inputVal = localStorage.getItem(i);

    // Creates a p tag based that will contain the time
    var pEl = $("<p>").addClass("col-2 hour");
    // if statement that will check if in the morning or afternoon
    if(i <= 12){
    // if morning it will produce a string that contains "AM"
        pEl.text(i + "AM")
    }else{
    // if afternoon it will produce a string that contains "PM"
        pEl.text(i - 12 + "PM")
    }
    
    // This creates the text area and add the classes, data indexes and loads the input values
    var inputEl = $("<textarea>").addClass("col-8 description").attr("data-index", i).val(inputVal);

    // This creates the button. It adds the classes and data indexes.
    var buttonEl = $("<button>").addClass("col-2 saveBtn").text('Update').attr("id", i);

    // This function checks the time and add the past, present or future class for the CSS file
    timeTenses(i);

    // This creates a div that contains the row within the container
    var rowEl = $("<div>");
    // This add the class so it can be identified in the CSS style file.
    rowEl.addClass("time-block row");
    // This appends the time, text area, and button to the div created.
    rowEl.append(pEl,inputEl,buttonEl);
    // This appends the rowEl to the container class
    $(".container").append(rowEl);
}

// This is the event listener for the button
$(".saveBtn").on("click", function(){
    // This is a variable that contains the ID of the button clicked.
    var buttonIndex = $(this).attr("id");
    // This is a variable that user's input for the button.
    var inputUpdate = $("textarea[data-index = "+ buttonIndex +"]").val();
    // This sends the updated response into local storage
    localStorage.setItem(buttonIndex,inputUpdate);
});

// This is the function that will the check the time and assigned a class
function timeTenses(index){
    if (index > moment().hours()){
        inputEl.addClass("future");
    } else if (index < moment().hours()) {
        inputEl.addClass("past");
    } else if (index == moment().hours()) {
        inputEl.addClass("present")
    }
}

