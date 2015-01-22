/*global Diamond, Backbone*/

Diamond.Models = Diamond.Models || {};

(function () {
    'use strict';

    Diamond.Models.Portfolio = Backbone.Model.extend({
        url: '/',
        initialize: function() {
        },
        defaults: {
            title: "ABC 12", type: "branding", type_name: "Branding", author: 'Minh Tri',
            client: 'Company XYZ 1', url: 'google.com', thumb: '/images/portfolio/thumb1.jsp',
            content: 'lorem lorem lorem lorem lorem lorem lorem'
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
