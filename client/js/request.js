
//Subscribe
Meteor.subscribe("Requests");

Template.requestsList.requests = function() {
   return Requests.find({userId:Meteor.userId()});
}

Template.requestsList.entries = function() {
   return Orders.find({requestId:this._id}).count();
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

