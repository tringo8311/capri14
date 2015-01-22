/*global Diamond, Backbone*/

Diamond.Models = Diamond.Models || {};

(function () {
    'use strict';

    Diamond.Models.Team = Backbone.Model.extend({
        url: '/team.json',
        initialize: function() {
        },
        defaults: {
        },
        validate: function(attrs, options) {
            return true;
        },
        parse: function(response, options)  {
            return response;
        }
    });
})();
