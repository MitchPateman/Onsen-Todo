myApp.services = {

  /////////////////
  // Task Service //
  /////////////////
  tasks: {

    // Creates a new task and attaches it to the pending task list.
    create: function(data) {
      // Task item template.
      var template = document.createElement('div');
      template.innerHTML =
        '<ons-list-item tappable category="' + myApp.services.categories.parseId(data.category)+ '">' +
          '<label class="left">' +
           '<ons-input type="checkbox"></ons-input>' +
          '</label>' +
          '<div class="center">' +
            data.title +
          '</div>' +
          '<div class="right">' +
            '<ons-icon style="color: grey; padding-left: 4px" icon="ion-ios-trash-outline, material:md-delete"></ons-icon>' +
          '</div>' +
        '</ons-list-item>'
      ;

      // Takes the actual task item.
      var taskItem = template.firstChild;
      // Store data within the element.
      taskItem.data = data;

      // Add 'completion' functionality when the checkbox changes.
      taskItem.data.onCheckboxChange = function(event) {
        myApp.services.animators.swipe(taskItem, function() {
          var listId = (taskItem.parentElement.id === 'pending-list' && event.target.checked) ? '#completed-list' : '#pending-list';
          document.querySelector(listId).appendChild(taskItem);
        });
      };

      taskItem.addEventListener('change', taskItem.data.onCheckboxChange);

      // Add button functionality to remove a task.
      taskItem.querySelector('.right').onclick = function() {
        myApp.services.tasks.remove(taskItem);
      };

      // Add functionality to push 'details_task.html' page with the current element as a parameter.
      taskItem.querySelector('.center').onclick = function() {
        document.querySelector('#myNavigator')
          .pushPage('html/details_task.html',
            {
              animation: 'lift',
              data: {
                element: taskItem
              }
            }
          );
      };

      // Check if it's necessary to create new categories for this item.
     myApp.services.categories.updateAdd(taskItem.data.category);

     // Add the highlight if necessary.
     if (taskItem.data.highlight) {
       taskItem.classList.add('highlight');
     }

     // Insert urgent tasks at the top and non urgent tasks at the bottom.
     var pendingList = document.querySelector('#pending-list');
     pendingList.insertBefore(taskItem, taskItem.data.urgent ? pendingList.firstChild : null);

    }, //end of create task
    update: function() {},
    // ...
  },
  categories: {
    create: function() {},
    // ...
  },
  animators: {
    // ...
  },
  // ...
};
