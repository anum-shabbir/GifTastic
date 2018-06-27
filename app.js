var gifs_arr = ["Sleepy", "Angry", "Happy", "Smiley", "Sad", "Crying", "Tired", "Cheerful", "Bored", "Annoyed"];

console.log(gifs_arr);

$(document).ready(function () {

    //add buttons for gifs 
    function renderbuttons() {
        $("#gif-view").empty();
        for (var i = 0; i < gifs_arr.length; i++) {
            var g = $("<button>");
            g.addClass("gifs-button");
            g.attr("data-gifname", gifs_arr[i]);
            g.text(gifs_arr[i]);
            $("#gif-view").append(g);
        } //for loop ends
    }//function renderbuttons ends

    // Function on click event from user to add gifs
    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        var user_gif = $("#user-input").val().trim();
        gifs_arr.push(user_gif);
        renderbuttons();
    }); //click function for user input ends


    // Function to display gifs by calling GIPHY API
    function displayGif() {
        var gifs = $(this).attr("data-gifname");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=oJot5ZluQ4czJyHv5X5VB6I8Dg5omVLN&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;
                console.log(response);
                $("#gifs-appear-here").empty();
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='item'>");
                    var rating = results[i].rating;
                    var p = $("<rating>").html("Rating:" + rating);
                    p.addClass("rating");
                    // var p = $("<p>")
                    var imgstill = results[i].images.fixed_height_still.url;
                    var imganimate = results[i].images.fixed_height.url;
                    console.log(imgstill);
                    var gifImage = $("<img>");
                    gifImage.attr("src", imgstill);
                    gifImage.attr("state", "still");
                    gifImage.attr("still", results[i].images.fixed_height_still.url);
                    gifImage.attr("animate", results[i].images.fixed_height.url);
                    gifImage.addClass("gifImage");
                    gifDiv.prepend(p);
                    gifDiv.prepend(gifImage);

                    $("#gifs-appear-here").prepend(gifDiv);
                    console.log(gifDiv);
                    console.log(gifImage);
                    console.log(rating);
                    //clicl class inside function
                }//for ends

                //Function for click event to toggle still and animate
                $(".gifImage").on("click", function () {
                    var state = $(this).attr("state");
                    if (state === "still") {
                        $(this).attr("state", "animate");
                        $(this).attr("src", $(this).attr("animate"));
                    }//if statement ends
                    else if (state === "animate") {
                        $(this).attr("state", "still");
                        $(this).attr("src", $(this).attr("still"));
                    }//else if statement ends

                });//gif image click function ends

            })//response function ends 

    } //function displaygifs ends


    $(document).on("click", ".gifs-button", displayGif);

    renderbuttons();
}); // function jQuery Ready ends