define(["jquery"], function($) {

  return {

    getMovie: function(title) {

      
      
      $.ajax({
        url: "http://www.omdbapi.com/?s="+title+"&type=movie",
        }).done(function(movies) {
            console.log(movies);

            require(['hbs!../templates/modal'],
            function(modalTemplate) {
              $("#movieContent").html(modalTemplate(movies.Search));
            });
          });

      // $('body').on("click", '.omdb-movies', function() {
      //   var thisMovie = $(this).text();
      //   console.log(thisMovie);
      
      //   $.ajax({
      //     url: "http://www.omdbapi.com/?t="+thisMovie,
      //     }).done(function(movie) {
      //       console.log(movie);

      //       newMovie.title = movie.Title;
      //       newMovie.year = movie.Year;
      //       newMovie.rated = movie.Rated;
      //       newMovie.actors = movie.Actors;
      //       newMovie.plot = movie.Plot;
      //       newMovie.poster = movie.Poster;
      //       newMovie.rating = userRating;
      //       newMovie.watched = false;

      //       console.log(newMovie);

      //       $.ajax ({
      //         url: "https://refactormovie.firebaseio.com/movies.json",
      //          method: "POST", 
      //          data: JSON.stringify(newMovie)
      //        }).done(function() {
      //        });

      //     });

      // });
        
    }
  };
});

