define(["jquery"], function($) {

  return {

    postMovie: function(title) {

      $.ajax({
        url: "http://www.omdbapi.com/?t="+title,
        }).done(function(movie) {
          console.log(movie);

         var movieObj = {
          
          "title": movie.Title,
          "year": movie.Year,
          "rated": movie.Rated,
          "actors": movie.Actors,
          "rating": movie.Rating,
          "genre": movie.Genre,
          "watched": false,
          "poster": movie.Poster

         };


          console.log(movieObj);

          $.ajax ({
            url: "https://refactormovie.firebaseio.com/movies.json",
             method: "POST", 
             data: JSON.stringify(movieObj)
           }).done(function() {
              console.log("posted");
           });
        });
    }
  };
});

