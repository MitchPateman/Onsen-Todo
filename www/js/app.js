window.myApp = {};

document.addEventListener('init', function(event) {
  var page = event.target;

  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  }
  var added = false;
  // Fill the lists with initial data when the pages we need are ready.
    //This only happens once at the beginning of the app.
    if (page.id === 'menuPage' || page.id === 'pendingTasksPage') {
      if (document.querySelector('#menuPage') && document.querySelector('#pendingTasksPage')) {
        if added == false {
          // Attach an asynchronous callback to read the data at our posts reference
          db.on("child_added", function(snapshot) {
            var fillData = snapshot.val();
            console.log(fillData);
              if (x < 1) {
                myApp.services.tasks.create(fillData);
                added = true;
              }
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
        }
      }
    }



});
