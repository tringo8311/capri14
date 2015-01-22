/*global Diamond, Backbone, JST*/

Diamond.Views = Diamond.Views || {};

(function () {
    'use strict';

    Diamond.Views.PortfolioModalView = Backbone.View.extend({
        template: JST['app/scripts/templates/portfolio_modal_view.ejs'],
        tagName: 'div',
        id: '',
        className: '',
        events: {
            "click a.next": "nextPage"
        },
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },
        render: function () {
            var self  = this;
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        nextPage: function(e){
            e.stopImmediatePropagation();
            return false;
        }
    });
})();
