var topics = ["chappelle", "family guy", "saturday night live", "anchorman", "the other guys", "step brothers", "vice principals", "eastbound and down", "tropic thunder"]

$(document).ready(function () {

  // this function pulls the gifs from giphy
  function fetchGifs() {
    var topic = $(this).attr("data-topic");
    var dataOffset = $(this).attr("data-offset");
    console.log(dataOffset);
    var offset = Math.imul(parseInt(dataOffset), 10); // by default the number will be zero, but each time the button is selected, it will increment by 1, and multiple by 10.  This will allow us to pull 10 new gifs each time the same button is selected.
    var offsetStr = "&offset=" + offset;
    var baseURL = "https://api.giphy.com/v1/gifs/search?api_key=OXaAQusBTQE0O5Sl8XgfGrioVNpsQBj3&limit=10&q=";
    var queryURL = baseURL + topic + offsetStr;
    // update the data-offset field
    var newOffset = parseInt(dataOffset) + 1;
    console.log(newOffset);
    $(this).attr("data-offset", newOffset);

    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

      var data = response.data;

      for (i = 0; i < data.length; i++) {
        var stillGIF = data[i].images.fixed_height_still.url;
        var animatedGIF = data[i].images.fixed_height.url;
        var rating = data[i].rating;
        var title = data[i].title;

        if (title === "") {
          title = "None provided."
        }

        // create gif element
        var newGifDiv = $("<div>");
        var newGif = $("<img>");
        var gifDesc = $("<p>"); // gif description element
        newGif.attr("data-state", "still");
        newGif.attr("src", stillGIF); // image on page is static by default
        newGif.attr("data-still", stillGIF); // source url of static image
        newGif.attr("data-animated", animatedGIF); // source url of animated image
        newGif.addClass("gif") // add the gif class to the image

        gifDesc.html("<h4>Rating: " + rating + "<br>Title: " + title);

        gifDesc.appendTo(newGifDiv);
        newGif.appendTo(newGifDiv);
        newGifDiv.addClass("gif-div");

        newGifDiv.prependTo("#gifs"); // add to the gifs w
      }
    });

  };

  // this function allows us to toggle the gif state
  function changeGifState() {
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
  };

  // thie function just loads the buttons across the top of the screen, including new buttons.
  function loadTopics() {
    $("#topics").empty();
    for (i = 0; i < topics.length; i++) {
      newButton = $("<button>");
      // add topic to id attribute
      newButton.attr("data-topic", topics[i]);
      // add pagination incrementing
      newButton.attr("data-offset", "0")
      // add bootstrap btn class
      newButton.addClass("btn");
      // add the topic name to the button
      newButton.text(topics[i]);
      // Lastly append the new button to #gifs
      $("#topics").append(newButton);
    }
  }

  // click event for adding a new search button
  $("#add-gif").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var topic = $("#gif-search").val().trim();

    // The movie from the textbox is then added to our array
    topics.push(topic);

    // clear search bar
    $("#gif-search").val("");

    // Calling renderButtons which handles the processing of our movie array
    loadTopics();

  });

  $(document).on("click", ".btn ", fetchGifs);
  // adds the ability to toggle gif states.
  $(document).on("click", ".gif", changeGifState);


  loadTopics(); // loads initial topics

});