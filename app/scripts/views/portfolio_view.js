/*global Diamond, Backbone, JST*/

Diamond.Views = Diamond.Views || {};

(function () {
    'use strict';

    Diamond.Views.PortfolioView = Backbone.View.extend({
        template: JST['app/scripts/templates/portfolio_view.ejs'],
        templateModal: JST['app/scripts/templates/portfolio_modal_view.ejs'],
        tagName: 'div',
        className: '',
        events: {
            "click span.zoom-in": "moreDetail"
        },
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        moreDetail: function(e){
            var self = this, obj = e.target, content = "";
            //var valId = $(obj).data("id");
            Backbone.trigger('changeActive', this.model);
            //this.model.collection.setElement(this.model);
            //content = this.templateModal(this.model.toJSON());

        }
    });
})();
