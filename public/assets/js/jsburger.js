// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".devourBtn").on("click", event => {
    var id = $(event.target).data("id");
    var newDevour = $(event.target).data("newdevour");

    var newDevourState = {
      devoured: newDevour,
    };

    // Send the PUT request
    $.ajax("/api/burgers/id/" + id + "/isdevoured/" + (newDevour === 1 ? false : true), {
      type: "PUT",
      data: newDevourState,
    }).then(function() {
      
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      burger_name: $(".bo")
        .val()
        .trim(),
      devoured: 0,
    };
 
    
    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger,
    }).then(function() {
      
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".delete-burger").on("click", event => {
    var id = $(event.target).data("id");
    

    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE",
    }).then(function() {
      
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
