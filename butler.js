
// Define Orders collection
Orders = new Meteor.Collection("Orders")

Meteor.methods({

   // Create an order
   // name : item name
   // count : count of items
   // userId : user id
   // userName : user name
   createOrder: function (options) {

      //Find User info from Meteor.users
      var user = Meteor.users.findOne({_id:options.userId});
      var userName = user.emails[0].address;

      return Orders.insert({
         name: options.name,
         count: options.count,
         userId: options.userId,
         userName: userName
      });
   }
});