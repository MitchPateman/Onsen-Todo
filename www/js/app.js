window.myApp = {};

document.addEventListener('init', function(event) {
  var page = event.target;

  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  }
//THIS IS THE REF TO THE FIREBASE

  // CREATE-Fill the lists with data when the pages we need are ready.
    if (page.id === 'menuPage' || page.id === 'pendingTasksPage') {
      if (document.querySelector('#menuPage') && document.querySelector('#pendingTasksPage')) {

          // Attach an asynchronous callback to read the data at our posts reference
          db.on("child_added", function(snapshot) {
            var fillData = snapshot.val();
              var data = fillData.data;
              console.log(data);
            //POPULATE THE LIST
            var pendingList = document.querySelector('#pending-list');
            var listItemCenter = pendingList.querySelectorAll('.center.list__item__center');
            if (listItemCenter[0]){
              if (data.title !== listItemCenter[listItemCenter.length].innerHTML) {
                myApp.services.tasks.create(data);
              };
            }
            else {
              myApp.services.tasks.create(data);
            }
            //firebase read error msg
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });

          // REMOVE FROM THE LIST IF ITS DELETED FROM FIREBASE
          db.on("child_removed", function(snapshot) {
            // Get the data on a post that has been removed
            var deletedTask = snapshot.val();
            console.log("The task titled '" + deletedTask.data.title + "' has been deleted from firebase");

            //Get the matching task list Item to the firebase task
            var pendingList = document.querySelector('#pending-list');
            var listItemCenter = pendingList.querySelectorAll('.center.list__item__center')

            //Loop through the listItems and remove if they are the same
            for (var i = 0; i < listItemCenter.length; i++) {
              if (listItemCenter[i].innerHTML !== deletedTask.data.title){
                console.log(listItemCenter[i].innerHTML);
              }
              else {
                console.log("TITLES ARE THE SAME, REMOVING \"" + listItemCenter[i].innerHTML + "\" FROM APP NOW!")
                //Remove the task item that matches this data
                var taskItem = listItemCenter[i].lastChild.parentNode.parentNode
                myApp.services.tasks.remove(taskItem);
              };
            };
          });
      };
    };

});
