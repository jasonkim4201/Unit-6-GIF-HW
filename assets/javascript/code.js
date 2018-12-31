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
  $("#gifInstruction").empty();
  $("#gifInstruction").removeClass("alert alert-warning text-center text-dark");
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
      gifDiv.addClass("col");
      var p = $("<p>");
      p.addClass("cssPFix");
      p.text("Rating: " + results[j].rating);
      var foodImage = $("<img>");
      foodImage.attr("src", results[j].images.original_still.url);
      foodImage.attr("data-still", results[j].images.original_still.url);
      foodImage.attr("data-animate", results[j].images.original.url);
      foodImage.attr("data-state", "still");
      foodImage.addClass("gif");
      gifDiv.append(foodImage);
      gifDiv.append(p);
      $("#foodGifArea").prepend(gifDiv);
    }
  });  

  $("#gifInstruction").addClass("alert alert-warning text-center text-dark");
  $("#gifInstruction").attr("role", "alert");
  $("#gifInstruction").text("🥙🍗🥖Click on the gifs to see the magic!🥐🍖🥗"); 
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
