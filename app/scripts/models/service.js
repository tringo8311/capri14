/*global Diamond, Backbone*/

Diamond.Models = Diamond.Models || {};

(function () {
    'use strict';

    Diamond.Models.Service = Backbone.Model.extend({

        url: '/service.json',

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
