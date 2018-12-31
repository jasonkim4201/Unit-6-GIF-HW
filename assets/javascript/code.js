// create an array of strings and save to variable called topics. DONE
//app should take the topics in this array and create buttons in HTML. Try using a loop that appends a button for each string in the array. DONE
//When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page. DONE kinda...
// Under every gif, display its rating (PG, G, so on).
//Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.


//GLOBAL VARIABLES
var food = ["taco", "pancakes", "pizza"];
console.log(food);
renderButtons();

//search food button
$("#searchBtn").on("click", function(event) {
event.preventDefault();

var foodSearched = $("#foodInput").val().trim();
if (foodSearched === "") {
  false;
} else {
food.push(foodSearched);
console.log(food);
renderButtons();
$('input[type="text"]').val("");
}
});

//clear button
$("#clearAll").on("click", function() {
  $("#foodButtonArea").empty();
  $("#foodGifArea").empty();
  food.length = 0;
});

//rendered buttons function
function renderButtons() {
  $("#foodButtonArea").empty();

  for (var i = 0; i < food.length; i++) {
    var foodButton = $("<button>");
    foodButton.addClass("btn btn-primary btn-lg gifBtn");
    foodButton.attr("data-name", food[i]);
    foodButton.text(food[i]);
    $("#foodButtonArea").append(foodButton);
  }
}

//displayFood function
function displayFood() {
  $("#foodGifArea").empty();
  
  var foodType = $(this).attr("data-name");
  var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + foodType + "&api_key=RLHE1XgeOLJ2GDhYIp7941B9xDiXzHdf&limit=10";
  
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var results = response.data;

    for (var j = 0; j < results.length; j++) {
      var gifDiv = $("<div>");
      var p = $("<p>");
      p.text("Rating: " + results[j].rating);
      var foodImage = $("<img>");
      foodImage.attr("src", results[j].images.original_still.url);
      foodImage.attr("data-still", results[j].images.original_still.url);
      foodImage.attr("data-animate", results[j].images.original.url);
      foodImage.attr("data-state", "still");
      foodImage.addClass("gif");
      gifDiv.append(p);
      gifDiv.append(foodImage);
      $("#foodGifArea").prepend(gifDiv);
    }
  });  
}

//When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
$(document).on("click", ".gif", function() {
  var state = $(this).attr("data-state");
  console.log(state);
  if (state === "still") {
    var source = $(this).attr("data-animate");
    $(this).attr("src", source);
    $(this).attr("data-state", "animate");
  }
  if (state === "animate") {
    var source = $(this).attr("data-still");
    $(this).attr("src", source);
    $(this).attr("data-state", "still");
  }
});



$(document).on("click", ".gifBtn", displayFood);
