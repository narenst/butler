
// Define Orders collection
Orders = new Meteor.Collection("Orders")
Requests = new Meteor.Collection("Requests")

Meteor.methods({

   // Create an order
   // values: list of values for the fields in request
   // requestId: request id
   // userId : user id
   // userName : user name
   createOrder: function (options) {

      // Find User info from Meteor.users
      var user = Meteor.users.findOne({_id:options.userId});
      var userName = user.emails[0].address;

      // Verify if request exists.
      var request = Requests.findOne({_id:options.requestId});

      if (request) {
         return Orders.insert({
            values: options.values,
            userId: options.userId,
            userName: userName,
            requestId: options.requestId
         });
      } else {
         console.log("Request no longer exists");
         return null;
      }
   },

   updateOrder: function (options) {

      return Orders.update(
         { userId: options.userId, requestId: options.requestId }, 
         {
            $set: {
               values: options.values,
            }
         }
      );
   },

   deleteOrder: function (options) {
      
      return Orders.remove(
         { userId: options.userId, requestId: options.requestId }
      );
   },


   // Create a request
   // title : request title
   // due : due date and time
   // userId : owner user id
   // fields : list of fields 
   createRequest: function (options) {

      return Requests.insert({
         title: options.title,
         due: options.due,
         userId: options.userId,
         fields: options.fields
      });
   },

   deleteRequest: function (options) {
      return Requests.remove(
         { _id: options.id }
      );
   }
});