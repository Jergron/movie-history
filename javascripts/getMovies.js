define(["jquery"], function($) {

  return {
    getMovie: function(title) {
      
    
      $.ajax({
          url: "http://www.omdbapi.com/?s="+title,     
        }).done(function(data) {
          
              require(['hbs!../templates/modal'],
      function(modalTemplate) {
       var modalBody = $("#modal-body").html(modalTemplate(data.Search));
        console.log(modalBody);
      });

       $('#addMoviebtn').on('click', function(){
        console.log('click');
         return modalBody; 
        });

});
}
};
});