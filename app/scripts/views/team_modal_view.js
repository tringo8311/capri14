/*global Diamond, Backbone, JST*/

Diamond.Views = Diamond.Views || {};

(function () {
    'use strict';

    Diamond.Views.TeamModalView = Backbone.View.extend({
        template: JST['app/scripts/templates/team_modal_view.ejs'],
        tagName: 'div',
        id: '',
        className: '',
        events: {
        },
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

})();
