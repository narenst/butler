
//Subscriber to Orders collection
Meteor.subscribe("Orders");

Template.ordersList.orders = function() {
   return Orders.find();
}

Template.newOrder.existingOrder = function() {
   return Orders.findOne({userId:Meteor.userId()});
}

Template.newOrder.events({

   'click #create' : function (event, template) {
      console.log("Create new order");
      crud(template, 'createOrder')
   },

   'click #update' : function(event, template) {
      console.log("Updating order");
      crud(template, 'updateOrder');
   },

   'click #clear' : function(event, template) {
      console.log("Clear order form");
      clearForm(template);
   },

   'click #delete' : function(event, template) {
      console.log("Deleting order");
      crud(template, 'deleteOrder');
   },
});

//Create or update 
//Second param defines the operation
function crud(template, operation) {

   var name = template.find("#name").value;
   var count = template.find("#count").value;
   var userId = Meteor.userId();

   // Check if user is logged id
   if (!userId) {
      console.log("User must be logged in");
      return;
   }

   // Validate inputs
   if (name.length && count.length) {
      clearForm(template);
      Meteor.call(operation, {
         name : name,
         count : count,
         userId: userId
      }), function(error, order) {
         if (!error) {
            console.log("Sucessfully completed operation");
         } else {
            console.log("Error in create/editing the order");
         }
      }
   } else {
      console.log("Invalid inputs");
   }
}

//Clear input form
function clearForm(template) {
   template.find("#name").value = "";
   template.find("#count").value = "";
}