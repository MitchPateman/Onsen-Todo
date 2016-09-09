myApp.services = {
  tasks: {
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

    },
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
