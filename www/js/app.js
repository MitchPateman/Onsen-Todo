window.myApp = {};

document.addEventListener('init', function(event) {
  var page = event.target;

  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  }

  // Fill the lists with initial data when the pages we need are ready.
    //This only happens once at the beginning of the app.
    if (page.id === 'menuPage' || page.id === 'pendingTasksPage') {
      if (document.querySelector('#menuPage') && document.querySelector('#pendingTasksPage')) {
        // Attach an asynchronous callback to read the data at our posts reference
        db.on("value", function(snapshot) {
          console.log(snapshot.val());
          //var fillData = snapshot.val();
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
        snapshot.val().forEach(function(data) {
          myApp.services.tasks.create(data);
        });
      }
    }



});
