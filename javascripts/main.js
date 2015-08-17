// Pull in all the various javascript libraries
requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'firebase': '../bower_components/firebase/firebase',
    'lodash': '../bower_components/lodash/lodash.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});


// The main function requiring all our anciliary scripts
requirejs(["jquery", "lodash", "firebase", "hbs", "bootstrap", "getMovies", "templates", "addToFirebase"], 
  function($, _, _firebase, Handlebars, bootstrap, movies, template, addToFirebase) {
  var myFirebaseRef = new Firebase("https://refactormovie.firebaseio.com/movies");
  // var retrievedMoviesObj = {};
  // var movie = {};
  // var newMovie = {};
  myFirebaseRef.on("value", function(snapshot) {

    var allMovies = snapshot.val();
    console.log(allMovies);

    var moviesArray = [];
    for (var i in allMovies) {
      moviesArray[moviesArray.length] = allMovies[i];
    }
    console.log(moviesArray);

    var allMoviesObj = {movies: moviesArray};
    console.log(allMoviesObj);

    require(['hbs!../templates/movie'],
      function(movieTemplate) {
        console.log(allMoviesObj);
        $("#movieContent").html(movieTemplate(allMoviesObj));
      });

    // retrievedMoviesObj = snapshot.val();
    // // console.log(retrievedMoviesObj);
    // actorArrayMoviesObj = snapshot.val();
    // for(var key in actorArrayMoviesObj) {
    //   actorArrayMoviesObj[key].actors = actorArrayMoviesObj[key].actors.split(", ");
    // }
    // $(".main").html(template.movie({Movie:actorArrayMoviesObj}));
    // var allMovies = $(".movie-sec");
    // for(var i=0; i<allMovies.length; i++) {
    //   var thisMovieKey = $(allMovies[i]).attr("key");
    //   console.log("thisMovieKey", thisMovieKey);
    //   var isWatched = retrievedMoviesObj[thisMovieKey].watched;
    //   console.log("isWatched", isWatched);
    //   var $thisMovieWatchButton = $(allMovies[i]).find(".watchToggle");
    //   console.log("$thisMovieWatchButton", $thisMovieWatchButton);
    //   if(isWatched) {
    //     $thisMovieWatchButton.html("Watched");
    //     $thisMovieWatchButton.removeClass("btn-danger");
    //     $thisMovieWatchButton.addClass("btn-success");
    //   } else {
    //     $thisMovieWatchButton.html("Unwatched");
    //     $thisMovieWatchButton.removeClass("btn-success");
    //     $thisMovieWatchButton.addClass("btn-danger");
    //   }
    // }
  });
  // var show = function(showMovie) {
  //   movie = showMovie;
  //   console.log("movies", showMovie);
          
  //   newMovie.title = movie.Title;
  //   newMovie.year = movie.Year;
  //   newMovie.actors = movie.Actors;
  //   newMovie.plot = movie.Plot;
  //   newMovie.poster = movie.Poster;
  //   newMovie.rating = 5;
  //   newMovie.watched = false;

  //   console.log("newMovie", newMovie);


    

  //   $.ajax ({
  //     url: "https://refactormovie.firebaseio.com/.json",
  //      method: "POST", 
  //      data: JSON.stringify(newMovie)
  //    }).done(function(NewType) {
  //      console.log("New Movie");
  //    });
  
  // };

//Add Movie Button    

  $('#search').click(function(e) {
    e.preventDefault();
    var addMovie = $("#addMovie").val();
    console.log("Movie:", addMovie);
    $("#addMovie").val("");
    movies.getMovie(addMovie);
  });

  $('body').on("click", '.omdb-movies', function() {
    var thisMovie = $(this).text();
    console.log(thisMovie);
    addToFirebase.postMovie(thisMovie);
  });

  // myFirebaseRef.orderByChild("title").on("child_added", function(snapshot) {
  // console.log(snapshot.key() + " title is " + snapshot.val().title);
  // });  

  // myFirebaseRef.orderByChild("watched").on("child_added", function(snapshot) {
  // console.log(snapshot.key() + " watched = " + snapshot.val().watched);
  // });

$("#watched-link").click(function() {

  var watchedArray = [];
  var watchedObject = {};

  myFirebaseRef.on("child_added", function(snapshot) {
    if (snapshot.val().watched === true) {
      console.log(snapshot.val());
      watchedArray.push(snapshot.val());
    }
      watchedObject = {movies: watchedArray};
  });
      console.log(watchedArray);
      console.log(watchedObject);
      
      require(['hbs!../templates/movie'],
        function(watchedTemplate) {
        $("#movieContent").html(watchedTemplate(watchedObject));
      });
});

$("#wishlist-link").click(function() {

  var wishArray = [];
  var wishObject = {};

  myFirebaseRef.on("child_added", function(snapshot) {
    if (snapshot.val().watched === false) {
      console.log(snapshot.val());
      wishArray.push(snapshot.val());
    }
      wishObject = {movies: wishArray};
  });
      console.log(wishArray);
      console.log(wishObject);

      require(['hbs!../templates/movie'],
        function(wishTemplate) {
        $("#movieContent").html(wishTemplate(wishObject));
      });
});





  //Search Firebase for wishlist movies (watched: false)



  $("#modal-btn").click(function() {
    console.log("modal button clicked");
    //this will be Handlebar code for adding new movie to wish list
  });

  // Delete Movie Button (From Firebase)

  // $(document).on("click", ".del", function() {
  //   var movieKey = $(this).parents(".movie-sec").attr("key");
  //   myFirebaseRef.child("Movie").child(movieKey).set(null);
  // });

  // Remove Movie Button (Not Firebase)

  // $(document).on("click", ".rmv", function() {
  //   $(this).parent().remove();
  //   console.log("confirmed remove button working");
  // });

//Radio bar for rating the movies

  // $("#range").on( "change", ".rating", function(e) {
  //   var movieKey = $(this).parents(".movie-sec").attr("key");
  //   var movieWithNewRating = retrievedMoviesObj[movieKey];
  //   movieWithNewRating.rating = $(this).val();
  //   myFirebaseRef.child("Movie").child(movieKey).set(movieWithNewRating);
  // });
    
  // $('#search').click(function() {
    
    
  //   var searchMovie = $('#searchText').val();
  //   $('#searchText').val("");

  //   console.log("search Movie", searchMovie);
  //   console.log("firebase obj",retrievedMoviesObj);

  //   var filteredMovies = {};
  //   filteredMovies = _.findKey(actorArrayMoviesObj, function(movie) {
  //     if (movie.title === searchMovie || movie.year === searchMovie) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });  

    
  //   console.log("filter", filteredMovies);
  //   console.log("actorArrayMoviesObj.filteredMovies", actorArrayMoviesObj[filteredMovies]);
  //   var finalFilteredMovie = {};
  //   finalFilteredMovie[filteredMovies] = actorArrayMoviesObj[filteredMovies];
  //   $(".main").html(template.movie({Movie:finalFilteredMovie}));
    
  // });

// Toggleclass button for watched/unwatched movies
//   $(document).on("click", ".watchToggle", function(e) {
//     e.preventDefault();
//     var movieKey = $(this).parents(".movie-sec").attr("key");
//     console.log("movieKey",movieKey);
//     var movieWithNewWatched = retrievedMoviesObj[movieKey];

//     console.log("movieWithNewWatched",movieWithNewWatched);

//     if(movieWithNewWatched.watched) {
//       movieWithNewWatched.watched = false;
//     } else {
//       movieWithNewWatched.watched = true;
//     }
//     myFirebaseRef.child("movies").child(movieKey).set(movieWithNewWatched);
//   }); 
    
     
});














