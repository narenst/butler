
Template.routerTemplate.orderPage = function() {
   return Session.get("current_page") === "orders";
}

Template.routerTemplate.requestsPage = function() {
   return Session.get("current_page") === "requests";
}

Template.routerTemplate.homePage = function() {
   return Session.get("current_page") === "home";
}


// Router
var ButlerRouter = Backbone.Router.extend({
   routes: {
      "requests/:request_id": "orders",
      "requests": "requests",
      "requests/": "requests",
      "": "home",
   },

   home: function () {
      Session.set("current_page", "home");
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