
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

      if (name.length && count.length) {
         Meteor.call('createOrder', {
            name : name,
            count : count
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