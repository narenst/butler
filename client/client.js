
//Subscriber to Orders collection
Meteor.subscribe("Orders");

Template.ordersList.orders = function() {
   return Orders.find();
}

Template.newOrder.events({

   'click #create' : function (event, template) {

      console.log("Create new order");
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
         Meteor.call('createOrder', {
            name : name,
            count : count,
            userId: userId
         }), function(error, order) {
            if (!error) {
               console.log("Sucessfully created order : " + order);
            } else {
               console.log("Error creating the order");
            }
         }
      } else {
         console.log("Invalid inputs");
      }
   }
});