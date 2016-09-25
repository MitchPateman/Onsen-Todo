window.myApp = {};

document.addEventListener('init', function(event) {
  var page = event.target;

  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  }

  // Fill the lists with initial data when the pages we need are ready.
    //This only happens once at the beginning of the app.
    // if (page.id === 'menuPage' || page.id === 'pendingTasksPage') {
    //   if (document.querySelector('#menuPage') && document.querySelector('#pendingTasksPage')) {
    //     myApp.services.fixtures.forEach(function(data) {
    //       myApp.services.tasks.create(data);
    //     });
    //   }
    // }

});
