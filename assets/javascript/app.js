var topics = ["wrc", "lfc", "rallycross", "drifting", "imsa", "mr-robot"]

$(document).ready(function () {

  for (i = 0; i < topics.length; i++) {
    newButton = $("<button>");
    console.log(newButton);
    // add topic to id attribute
    newButton.attr("id", topics[i]);
    // add bootstrap btn class
    newButton.addClass("btn btn-info");
    // add the topic name to the button
    newButton.text(topics[i]);
    // Lastly append the new button to #gifs
    $("#topics").append(newButton);
    console.log("added button "+topics[i]);
  }
  
  

  $(".btn").on("click",function () {
    var baseURL = "https://api.giphy.com/v1/gifs/search?api_key=OXaAQusBTQE0O5Sl8XgfGrioVNpsQBj3&limit=10&q=";
  
    var queryURL = baseURL + this.id;
  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
  
      var data = response.data;
  
      for (i = 0; i < data.length; i++) {
        var staticGIF = data[i].images.fixed_height_still.url;
        var animatedGIF = data[i].images.fixed_height.url;
  
        // create gif element
        var newGif = $("<img>").attr("data-state","still")
        newGif.attr("src", staticGIF);
        newGif.attr("data-static",staticGIF);
        newGif.attr("data-animated",animatedGIF);
  
        newGif.appendTo("#gifs");
      }
  
    });
  });







});
