var topics = ["wrc", "lfc", "rallycross", "drifting", "imsa", "mr-robot"]

function loadTopics() {
  $("#topics").empty();
  for (i = 0; i < topics.length; i++) {
    newButton = $("<button>");
    // add topic to id attribute
    newButton.attr("id", topics[i]);
    // add bootstrap btn class
    newButton.addClass("btn btn-info");
    // add the topic name to the button
    newButton.text(topics[i]);
    // Lastly append the new button to #gifs
    $("#topics").append(newButton);
  }

  $("#gif-search").on("click", function () {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var topic = $("#gif-search").val().trim();

    // The movie from the textbox is then added to our array
    topics.push(topic);

    // Calling renderButtons which handles the processing of our movie array
    loadTopics();

  });
}

$(document).ready(function () {

  loadTopics(); // loads initial topics

  $(".btn").on("click", function () {
    var baseURL = "https://api.giphy.com/v1/gifs/search?api_key=OXaAQusBTQE0O5Sl8XgfGrioVNpsQBj3&limit=10&q=";
    var queryURL = baseURL + this.id;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

      var data = response.data;

      for (i = 0; i < data.length; i++) {
        var stillGIF = data[i].images.fixed_height_still.url;
        var animatedGIF = data[i].images.fixed_height.url;

        // create gif element
        var newGif = $("<img>");
        newGif.attr("data-state", "still");
        newGif.attr("src", stillGIF); // image on page is static by default
        newGif.attr("data-still", stillGIF); // source url of static image
        newGif.attr("data-animated", animatedGIF); // source url of animated image
        newGif.addClass("gif") // add the gif class to the image
        newGif.appendTo("#gifs"); // add to the gifs w
      }

      $(".gif").on("click", function () {
        var gif = $(this);
        var animated = gif.attr("data-animated");
        var still = gif.attr("data-still");

        if (gif.attr("data-state") === "still") {
          gif.attr("src", animated);
          gif.attr("data-state", "animated");
        } else {
          gif.attr("src", still);
          gif.attr("data-state", "still");
        }
      });


    });


  });
});

