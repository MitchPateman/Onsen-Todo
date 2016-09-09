myApp.controllers = {
  // ...,

  newTaskPage: function(page) {

    page.querySelector('[component="button/save-task"]').onclick = function() {
      var newTitle = page.querySelector('#title-input').value;

      if (newTitle) {

        myApp.services.tasks.create(
          {
            title: newTitle,
            category: page.querySelector('#category-input').value,
            description: page.querySelector('#description-input').value,
            highlight: page.querySelector('#highlight-input').checked,
            urgent: page.querySelector('#urgent-input').checked
          }
        );

        // ...

      } else {
        ons.notification.alert('You must provide a task title.');
      }
    };
  },

  // ...
};
