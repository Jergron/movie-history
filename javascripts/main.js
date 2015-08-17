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
    // console.log(allMovies);

    var moviesArray = [];
    for (var i in allMovies) {
      moviesArray[moviesArray.length] = allMovies[i];
    }
    // console.log(moviesArray);

    var allMoviesObj = {movies: moviesArray};
    // console.log(allMoviesObj);

    require(['hbs!../templates/movie'],
      function(movieTemplate) {
        // console.log(allMoviesObj);
        $("#movieContent").html(movieTemplate(allMoviesObj));
      });

    

  });

//Add Movie Button    

  $('#search').click(function(e) {
    e.preventDefault();
    var addMovie = $("#addMovie").val().toLowerCase();
    console.log("Movie:", addMovie);
    $("#addMovie").val("");
    movies.getMovie(addMovie);

  // myFirebaseRef.on("child_added", function(snapshot) {
  //   if (snapshot.val().title.toLowerCase() === addMovie) {
  //     console.log(snapshot.val());
  //     $("#movieContent").html(snapshot.val().title);
  //   } else {

  //   if (snapshot.val().title.toLowerCase() !== addMovie) {
  //      console.log("not found");

  //   }
  //   }
  // });

  });

  $('body').on("click", '.omdb-movies', function() {
    var thisMovie = $(this).text();
    // console.log(thisMovie);
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
 
});














