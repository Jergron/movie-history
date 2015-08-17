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

        
    }
  };
});

