// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".devourBtn").on("click", (event) => {
    var id = $(event.target).data("id");
    var newDevour = $(event.target).data("newDevour");

    var newDevourState = {
      devoured: newDevour,
    };
    
    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevourState,
    }).then(function() {
      console.log("changed devoured to", newDevour);
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      burger_name: $(".bo").val().trim(),
      devoured: 0
    };
    console.log(newBurger);
    // debugger
    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger,
    }).then(function() {
      console.log("created new burger");
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $("#deleteBtn").on("click", (event) => {
    var id = $(event.target).data("id");
    console.log(id);

    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE",
    }).then(function() {
      console.log("deleted burger", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
