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



  







requirejs(["jquery", "lodash", "firebase", "hbs", "bootstrap", "getMovies", "templates", "addToFirebase"], 
  function($, _, _firebase, Handlebars, bootstrap, movies, template, addToFirebase) {
  var myFirebaseRef = new Firebase("https://refactormovie.firebaseio.com/movies");

        myFirebaseRef.on("value", function(snapshot){

          var allMovies = snapshot.val();
          var moviesArray = [];
            for (var i in allMovies) {moviesArray[moviesArray.length] = allMovies[i];}
          var allMoviesObj = {movies: moviesArray};


        require(['hbs!../templates/movie'], function(movieTemplate) {
        $("#movieContent").html(movieTemplate(allMoviesObj));


                  ///styling effects for movie containers ////
                    $('button').on('click',function(){
                      $(this).children('span').toggleClass('glyphicon-star-empty').toggleClass(' glyphicon-star');
                      });
                        //// shadow on movie-content ////
                    $('.movie-content').on('mouseover', function(){
                        $(this).addClass('shadow');
                      });
                    $('.movie-content').on('mouseout', function(){
                      $(this).removeClass('shadow');
                    });
                      //// remove hidden to show delete /// 
                     $('.movie-content').on('mouseover', function(){
                        $(this).find('.del').removeClass('hidden');
                        $('.del').addClass('btnPosition');

                      });
                    $('.movie-content').on('mouseout', function(){
                      $('.del').addClass('hidden');
                      $('.del').removeClass('btnPosition');
                    });

                    $('.watchbtn').on('click', function(){
                      ('.movie-sec').removeClass();
                    });




    });
  });



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



        $("#watched-link").click(function() {
              var watchedArray = [];
              var watchedObject = {};

            myFirebaseRef.on("child_added", function(snapshot) {
              if (snapshot.val().watched === true) {
                watchedArray.push(snapshot.val());
                  }
            watchedObject = {movies: watchedArray};
                  });
                
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

                require(['hbs!../templates/movie'],
                  function(wishTemplate) {
                  $("#movieContent").html(wishTemplate(wishObject));
                });
            });

});










