//Test the client in this example
Meteor = {
	'is_client': true,
	'is_server': false,
   'startup': function (val) {
   }
};

// Create dummy objects
Template = {
	'routerTemplate': {}
};

Backbone = {
   'Router': {
      extend : function(methods) {
         return function() {
            return methods;
         }
      }
   },
   'history' : {
      start : function(state) {
      }
   }
}

/**
 * Mock Session
 */
var values = {};
Session = {

   set: function(key, value) {
      values[key] = value;
   },

   get: function(key) {
      return values[key];
   }
}

// Stub the console.log() function so we can check what it's called with
sinon.stub(console, 'log');

describe('Butler client code', function(){

	describe('Router Tests', function(){


		describe('homePage', function(){

			it('check session for home page', function(){
            Session.set("current_page", "home")
            chai.assert.ok(Template.routerTemplate.homePage());
			});

         it('router sets home page to session', function() {
            Router.home();
            chai.assert.equal("home", Session.get("current_page"));
         });
		});


      describe('orderPage', function(){

         it('check session for order page', function(){
            Session.set("current_page", "orders")
            chai.assert.ok(Template.routerTemplate.orderPage());
         });

         it('router sets order page to session', function() {
            Router.orders();
            chai.assert.equal("orders", Session.get("current_page"));
         });
      });


      describe('requestsPage', function(){

         it('check session requests page', function(){
            Session.set("current_page", "requests")
            chai.assert.ok(Template.routerTemplate.requestsPage());
         });

         it('router sets request page to session', function() {
            Router.requests();
            chai.assert.equal("requests", Session.get("current_page"));
         });
      });


      describe('verifyRoutes', function(){

         it('check routes map', function(){

            var routes = Router.routes;
            chai.assert.equal("orders", routes["requests/:request_id"]);
            chai.assert.equal("requests", routes["requests/"]);
            chai.assert.equal("requests", routes["requests"]);
            chai.assert.equal("home", routes[""]);
         });

      });

	});
});
