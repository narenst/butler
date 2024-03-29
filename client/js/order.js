
//Subscriber to Orders collection
Meteor.subscribe("Orders");

Template.ordersList.orders = function() {
   return Orders.find({requestId:Session.get("request_id")});
}

Template.ordersList.request = function() {
   return Requests.findOne({_id:Session.get("request_id")});
}

Template.newOrder.currentRequest = function() {
   return Requests.findOne({_id:Session.get("request_id")});
}

Template.newOrder.existingOrder = function() {
   return Orders.findOne({userId:Meteor.userId(), requestId:Session.get("request_id")});
}

Template.newOrder.existingOrderFieldValues = function() {
   order = Orders.findOne({userId:Meteor.userId(), requestId:Session.get("request_id")});
   request = Requests.findOne({_id:Session.get("request_id")});

   var fieldValues = [];

   for (var i=0; i<order.values.length; i++) {
      var fieldValue = {"field" : request.fields[i],
                        "value" : order.values[i]};
      fieldValues.push(fieldValue);
   }
   return fieldValues;
}

//delete request
function deleteRequest(id) {

   Meteor.call("deleteRequest", {
      id : id
   }), function(error) {
      if (!error) {
         console.log("Sucessfully completed operation");
      } else {
         console.log("Error in deleting the request");
      }
   }
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

   fields = template.findAll(".values");
   values = [];
   for (var i=0; i < fields.length; i++) {
      var value = fields[i].value;
      if (value.length) {
         values.push(value);
      }
   }

   // var name = template.find("#name").value;
   // var count = template.find("#count").value;
   var userId = Meteor.userId();
   var requestId = Session.get("request_id");

   //Check if request id is valid
   if (requestId) {
      var request = Requests.findOne({_id:requestId});
      if (!request) {
         console.log("Valid request Id must be specified");
         return;
      }
   } else {
      console.log("Request id not in session");
      return;
   }

   // Check if user is logged id
   if (!userId) {
      console.log("User must be logged in");
      return;
   }

   console.log("operation : " + operation);
   // console.log(name);
   // console.log(count);
   console.log(values);
   console.log(userId);
   console.log(requestId);

   // Validate inputs
   if (values.length) {
      // clearForm(template);
      Meteor.call(operation, {
         values: values,
         userId: userId,
         requestId: requestId
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
   fields = template.findAll(".values");
   for (var i=0; i < fields.length; i++) {
      fields[i].value = "";
   }
}

