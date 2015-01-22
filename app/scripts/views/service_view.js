/*global Diamond, Backbone, JST*/

Diamond.Views = Diamond.Views || {};

(function () {
    'use strict';

    Diamond.Views.ServiceView = Backbone.View.extend({
        template: JST['app/scripts/templates/service_view.ejs'],
        tagName: 'div',
        className: '',
        events: {},
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.model.fetch({
                success: function (collection, response) {
                    console.log("success");
                },
                error: function(collection, response){
                    console.log("error");
                }
            });
        },
        render: function () {
            this.$el.find('.container').html(this.template(this.model.toJSON()));
        }

    });

})();
