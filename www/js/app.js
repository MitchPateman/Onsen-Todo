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

          // REMOVE FROM THE LIST IF ITS DELETED FROM FIREBASE
          db.on("child_removed", function(snapshot) {
            // Get the data on a post that has been removed
            var deletedTask = snapshot.val();
            console.log("The task titled '" + deletedTask.data.title + "' has been deleted from firebase");
            console.log(deletedTask.data);

            //Get the matching task list Item to the firebase task
            var pendingList = document.querySelector('#pending-list');
            var listItemCenter = pendingList.querySelectorAll('.center.list__item__center')
            console.log(pendingList);

            for (var i = 0; i < listItemCenter.length; i++) {
              console.log(listItemCenter[i]);
            }


            var taskItem = deletedTask.data;

            //Remove the task item that matches this data
            //myApp.services.tasks.remove(taskItem);
          });
      };
    };

});
