/*global Diamond, Backbone*/

Diamond.Models = Diamond.Models || {};

(function () {
    'use strict';

    Diamond.Models.About = Backbone.Model.extend({

        url: '',

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
