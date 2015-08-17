define(["jquery"], function($) {

  return {


    getMovie: function(title) {
      
      $.ajax({
        url: "http://www.omdbapi.com/?s="+title,
        }).done(function(movies) {
            console.log(movies);


            require(['hbs!../templates/modal'],
            function(modalTemplate) {
              $(".main").html(modalTemplate(movies.Search));
            });
          });

        
    }
  };
});

