window.myApp = {};

document.addEventListener('init', function(event) {
  var page = event.target;

  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  }

  // Fill the lists with data when the pages we need are ready.
    if (page.id === 'menuPage' || page.id === 'pendingTasksPage') {
      if (document.querySelector('#menuPage') && document.querySelector('#pendingTasksPage')) {

          // Attach an asynchronous callback to read the data at our posts reference
          db.on("child_added", function(snapshot) {
            var fillData = snapshot.val();
              var data = fillData.data;
              console.log(data);
            //POPULATE THE LIST
              myApp.services.tasks.create(data);
            //firebase read error msg
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
      }
    }

    // REMOVE FROM THE LIST IF ITS DELETED FROM FIREBASE
    // Get the data on a post that has been removed
    db.on("child_removed", function(snapshot) {
      var deletedPost = snapshot.val();
      console.log("The task titled '" + deletedPost.data.title + "' has been deleted from firebase, and now your app!");
      console.log(deletedPost.data);
      //Remove the task item that matches this data
      myApp.services.tasks.remove(deletedPost.data.taskID);
    });

});
