
// Define Orders collection
Orders = new Meteor.Collection("Orders")

Meteor.methods({

   // Create an order with name and count.
   createOrder: function (options) {
      return Orders.insert({
         name: options.name,
         count: options.count
      });
   }
   
});