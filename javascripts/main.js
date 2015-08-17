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
requirejs(["jquery", "lodash", "firebase", "hbs", "bootstrap", "getMovies", "templates"], 
  function($, _, _firebase, Handlebars, bootstrap, movies, template){
  var myFirebaseRef = new Firebase("https://refactormovie.firebaseio.com/");
  var retrievedMoviesObj = {};
  var movie = {};
  var newMovie = {};
  var _baseFirebaseObject;


  myFirebaseRef.child("movies").on("value", function(snapshot) {
    // console.log($.extend({}, _.sortBy(snapshot.val(), "title")));
    // console.log(snapshot.val());

    _baseFirebaseObject = snapshot.val();

    retrievedMoviesObj = $.extend({}, _.sortBy(snapshot.val(), "title"));
    

    actorArrayMoviesObj = $.extend({}, _.sortBy(snapshot.val(), "title"));
    console.log("actorArrayMoviesObj", actorArrayMoviesObj);

    // Convert Firebase's object of objects into an array of objects
   
      for (var key in _baseFirebaseObject) {
        var movieWithId = _baseFirebaseObject[key];
        movieWithId.key = key;
        retrievedMoviesObj[retrievedMoviesObj.length] = movieWithId;
        console.log("_baseFirebaseObject[key]", _baseFirebaseObject[key]);
        //  console.log("movieWithId.key", movieWithId.key);
      
      }


     
        // Delete Movie Button (From Firebase)
      $(document).on("click", ".del", function() {
        var movieKey = $(this).parents(".movie-sec").attr("key");
            myFirebaseRef.child("movies").child(movieKey).set(null);
              console.log("movieKey", movieKey);
      
      });

    // for(var key in actorArrayMoviesObj) {
    //   actorArrayMoviesObj[key].actors = actorArrayMoviesObj[key].actors.split(", ");
    // }
    $(".main").html(template.movie({Movie:_baseFirebaseObject}));

    var allMovies = $(".movie-sec");

    // for(var i=0; i<allMovies.length; i++) {
    //   var thisMovieKey = $(allMovies[i]).attr("key");
    //   console.log("thisMovieKey", thisMovieKey);

    //   var isWatched = retrievedMoviesObj[thisMovieKey].watched;
    //   console.log("isWatched", isWatched);
      
    //   var $thisMovieWatchButton = $(allMovies[i]).find(".watchToggle");
    //   console.log("$thisMovieWatchButton", $thisMovieWatchButton);
    //   // if(isWatched) {
    //   //   $thisMovieWatchButton.html("Watched");
    //   //   $thisMovieWatchButton.removeClass("btn-danger");
    //   //   $thisMovieWatchButton.addClass("btn-success");
    //   // } else {
    //   //   $thisMovieWatchButton.html("Unwatched");
    //   //   $thisMovieWatchButton.removeClass("btn-success");
    //   //   $thisMovieWatchButton.addClass("btn-danger");
    //   // }
    // }


  ///styling effects for movie containers ////
  $('.ratingRow').on('click',function(){
    $(this).find('span').toggleClass('glyphicon-star-empty').toggleClass(' glyphicon-star');
    });
    
                //// shadow on movie-content ////
            $('.movie-content').on('mouseover', function(){
                $(this).addClass('shadow');
              });
            $('.movie-content').on('mouseout', function(){
              $(this).removeClass('shadow');
            });
  
  
              //// remove hidden to show delete /// 
             $('.movie-sec').on('mouseover', function(){
                $('.del').removeClass('hidden');
                $('.del').addClass('btnPosition');
  
              });
            $('.movie-sec').on('mouseout', function(){
              $('.del').addClass('hidden');
              $('.del').removeClass('btnPosition');
            });
      

  
    });
  


  var show = function(showMovie) {
    movie = showMovie;
    console.log("movies", showMovie);
          
    newMovie.title = movie.Title;
    newMovie.year = movie.Year;
    newMovie.actors = movie.Actors;
    newMovie.plot = movie.Plot;
    newMovie.poster = movie.Poster;
    newMovie.rating = 5;
    newMovie.watched = false;
    console.log("newMovie", newMovie);

    $.ajax ({
      url: "https://refactormovie.firebaseio.com/movies.json",
       method: "POST", 
       data: JSON.stringify(newMovie)
     }).done(function(NewType) {
       console.log("New Movie");
     });
  
  };

//Add Movie Button    

  $('#addMoviebtn').click(function() {
    console.log("click");
    var addMovie = $("#addMovie").val();
    console.log("addMovie", addMovie);
    $("#addMovie").val("");
    movies.getMovie(addMovie, show);
  });


  // Remove Movie Button (Not Firebase)

  // $(document).on("click", ".rmv", function() {
  //   $(this).parent().remove();
  //   console.log("confirmed remove button working");
  // });

//Radio bar for rating the movies

  $("#range").on( "change", ".rating", function(e) {
    var movieKey = $(this).parents(".movie-sec").attr("key");
    var movieWithNewRating = retrievedMoviesObj[movieKey];
    movieWithNewRating.rating = $(this).val();
    myFirebaseRef.child("movies").child(movieKey).set(movieWithNewRating);
  });

//Search through firebase database

  $('#search').click(function() {
    
    
    var searchMovie = $('.search').val().toLowerCase();
    $('.search').val("");

    console.log("search Movie", searchMovie);
    console.log("firebase obj",retrievedMoviesObj);

    var filteredMovies = {};
    filteredMovies = _.findKey(actorArrayMoviesObj, function(movie) {
      if ((movie.title.toLowerCase().split(" ").indexOf(searchMovie) !== -1 || movie.title.toLowerCase() === searchMovie) || movie.year === searchMovie) {
        return true;
      } else {
        return false;
      }
    });  

    
    console.log("filter", filteredMovies);
    console.log("actorArrayMoviesObj.filteredMovies", actorArrayMoviesObj[filteredMovies]);
    var finalFilteredMovie = {};
    finalFilteredMovie[filteredMovies] = actorArrayMoviesObj[filteredMovies];
    $(".main").html(template.movie({Movie:finalFilteredMovie}));
    
  });

// Toggleclass button for watched/unwatched movies

  $(document).on("click", ".watchToggle", function(e) {
    e.preventDefault();
    var movieKey = $(this).parents(".movie-sec").attr("key");
    console.log("movieKey",movieKey);
    var movieWithNewWatched = _baseFirebaseObject[movieKey];

    console.log("movieWithNewWatched",movieWithNewWatched);

    if(movieWithNewWatched.watched) {
      movieWithNewWatched.watched = false;
    } else {
      movieWithNewWatched.watched = true;
    }
    myFirebaseRef.child("movies").child(movieKey).set(movieWithNewWatched);
  }); 
    
     
});














