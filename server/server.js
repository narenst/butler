
Meteor.startup(function () {
   console.log("Starting up server");

   //Load default values (for debugging)
   if (Orders.find().count() == 0) {
      console.log("Empty orders collection, adding default orders");
      Orders.insert({
         name:"Chicken Burrito", count:"2"
      });
   }
});