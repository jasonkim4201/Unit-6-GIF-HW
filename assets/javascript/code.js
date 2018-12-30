// create an array of strings and save to variable called topics
//app should take the topics in this array and create buttons in HTML. Try using a loop that appends a button for each string in the array.
//When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
//When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
// Under every gif, display its rating (PG, G, so on).
//Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.


//GLOBAL VARIABLES
var food = ["taco", "pancakes", "pizza"];
console.log(food);

//search food button
$("#searchBtn").on("click", function(event) {
console.log("clicked.");
event.preventDefault();

var foodSearched = $("#food-input").val();
food.push(foodSearched);

});


//rendered buttons function
function renderButtons() {
  $("#foodButtonArea").empty();

  for (var i = 0; i < food; i++) {
    var foodButton = $("<button>");
    foodButton.addClass();
    foodButton.attr();
    foodButton.text(food[i]);
    $("#foodButtonArea").append(foodButton);

  }
}






