
//Subscriber to Orders collection
Meteor.subscribe("Orders");
Meteor.subscribe("Requests");

Template.routerTemplate.orderPage = function() {
   return Session.get("current_page") === "orders";
}

Template.routerTemplate.requestsPage = function() {
   return Session.get("current_page") === "requests";
}

Template.ordersList.orders = function() {
   return Orders.find({requestId:Session.get("request_id")});
}

Template.ordersList.request = function() {
   return Requests.findOne({_id:Session.get("request_id")});
}

Template.newOrder.existingOrder = function() {
   return Orders.findOne({userId:Meteor.userId(), requestId:Session.get("request_id")});
}

Template.requestsList.requests = function() {
   return Requests.find({userId:Meteor.userId()});
}

Template.newRequest.events({

   'click #create' : function (event, template) {
      console.log("Create new request");
      createRequest(template);
   },

   'click #clear' : function(event, template) {
      console.log("Clear order form");
      clearRequestForm(template);
   },
});

Template.request.events({

   'click #delete' : function(event, template) {
      console.log("Deleting request, id : " + this._id);
      deleteRequest(this._id);
   },
});

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

//Create request
function createRequest(template) {

   var title = template.find("#title").value;
   var due = template.find("#due").value;
   var fields = parseFields(template.find("#fields").value);
   var userId = Meteor.userId();

   console.log(title);
   console.log(due);
   console.log(fields);
   console.log(userId);

   // Check if user is logged id
   if (!userId) {
      console.log("User must be logged in");
      return;
   }

   // Validate inputs
   if (title.length && due.length && fields.length) {
      clearRequestForm(template);
      Meteor.call("createRequest", {
         title : title,
         due : due,
         userId: userId,
         fields: fields
      }), function(error, order) {
         if (!error) {
            console.log("Sucessfully completed operation");
         } else {
            console.log("Error in creating the request");
         }
      }
   } else {
      console.log("Invalid inputs");
   }
}

/**
 * Split by commas.
 * Trim fields.
 * Remove duplicates.
 * return an array.
 */
function parseFields(fields) {
   fieldsList = fields.split(",");
   resultList = [];
   for (var i=0; i < fieldsList.length; i++) {

      field = $.trim(fieldsList[i]);
      if (field.length && 
          $.inArray(field, resultList) == -1) {
         resultList.push(field);
      }
   }
   return resultList;
}

//Clear input form
function clearRequestForm(template) {
   template.find("#title").value = "";
   template.find("#due").value = "";
   template.find("#fields").value = "";
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
   console.log(name);
   console.log(count);
   console.log(userId);
   console.log(requestId);

   // Validate inputs
   if (name.length && count.length) {
      clearForm(template);
      Meteor.call(operation, {
         name : name,
         count : count,
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
   template.find("#name").value = "";
   template.find("#count").value = "";
}


// Router

var ButlerRouter = Backbone.Router.extend({
   routes: {
      "requests/:request_id": "orders",
      "requests": "requests"
   },

   orders: function (request_id) {
      console.log("setting request_id in session");
      Session.set("request_id", request_id);
      Session.set("current_page", "orders");
   },

   requests: function () {
      Session.set("current_page", "requests");
   },

   setList: function (request_id) {
      this.navigate("requests/" + request_id, true);
   }
});

Router = new ButlerRouter;

Meteor.startup(function () {
   Backbone.history.start({pushState: true});
});
