/*global Diamond, Backbone, JST*/
Diamond.Views = Diamond.Views || {};
(function () {
    'use strict';
    Diamond.Views.TeamView = Backbone.View.extend({
        template: JST['app/scripts/templates/team_view.ejs'],
        tagName: 'div',
        id: '',
        className: '',
        events: {
            "click .zoom-in": "moreDetail"
        },
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.model.fetch({
                success: function (collection, response) {
                    //console.log(response);
                },
                error: function(collection, response){
                    //console.log(response);
                }
            });
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },
        moreDetail: function(e){
            var self = this, obj = e.target, content = "", memberId = $(obj).data("id");
            var memberModel = _.filter(this.model.get('team'), function(member){
                return member.id == memberId;
            })[0];
            var teamModal = new Diamond.Views.TeamModalView({model: new Diamond.Models.Member(memberModel), el: "#teamModal"});
            if($('#teamModal').data('bs.modal') && $('#teamModal').data('bs.modal').isShown){

            }else{
                $('#teamModal').modal();
                $('#teamModal').find(".modal-dialog").delay(1000).addClass("animated rollIn");
            }
            //this.model.collection.setElement(this.model);
            //content = this.templateModal(this.model.toJSON());

        }
    });
})();
