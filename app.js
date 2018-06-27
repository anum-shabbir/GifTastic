var gifs_arr = ["The Matrix", "The Lion King"];

console.log(gifs_arr);

$(document).ready(function () {


    function renderbuttons() {

        $("#gif-view").empty();

        for (var i = 0; i < gifs_arr.length; i++) {

            var g = $("<button>");
            // Adding a class
            g.addClass("gifs-button");

            g.attr("data-gifname", gifs_arr[i]);

            g.text(gifs_arr[i]);

            $("#gif-view").append(g);
        } //for loop ends
    }//function renderbuttons ends

    $("#add-gif").on("click", function (event) {
        event.preventDefault();

        var user_gif = $("#user-input").val().trim();

        gifs_arr.push(user_gif);

        renderbuttons();

    }); //click function for user input ends



    function displayGif() {

        var gifs = $(this).attr("data-gifname");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=oJot5ZluQ4czJyHv5X5VB6I8Dg5omVLN&limit=2";


        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;
                console.log(response);
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='item'>");

                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
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





                }//for ends

            })//response function ends 



    } //function displaygifs ends


    $(document).on("click", ".gifs-button", displayGif);

    renderbuttons();
}); // function jQuery Ready ends
