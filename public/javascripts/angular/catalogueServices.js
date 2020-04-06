'use strict';


// Demonstrate how to register services
// In this case it is a simple constant service.

var services = angular.module('practitionerPortal.services', []).
  value('version', '0.1');

services.factory('practitionerData', function($rootScope) {
    var practitionerData = {};

    practitionerData.data = {};

    practitionerData.prepForBroadcast = function(data) {
        this.data = data;
        this.broadcastItem();
    };

    practitionerData.broadcastItem = function() {
        $rootScope.$broadcast('handleBroadcast');
    };

    return practitionerData;
});


services.factory('TokenHandler', function() {
  var tokenHandler = {};
  var token = "none";

  tokenHandler.set = function( newToken ) {
    token = newToken;
  };

  tokenHandler.get = function() {
    return token;
  };

  // wrap given actions of a resource to send auth token with every
  // request
  tokenHandler.wrapActions = function( resource, actions ) {
    // copy original resource
    var wrappedResource = resource;
    for (var i=0; i < actions.length; i++) {
      tokenWrapper( wrappedResource, actions[i] );
    };
    // return modified copy of resource
    return wrappedResource;
  };

  // wraps resource action to send request with auth token
  var tokenWrapper = function( resource, action ) {
    // copy original action
    resource['_' + action]  = resource[action];
    // create new action wrapping the original and sending token
    resource[action] = function( data, success, error){
      return resource['_' + action](
        angular.extend({}, data || {}, {access_token: tokenHandler.get()}),
        success,
        error
      );
    };
  };

  return tokenHandler;
});