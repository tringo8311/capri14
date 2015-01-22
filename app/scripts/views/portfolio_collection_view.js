/*global Diamond, Backbone, JST*/

Diamond.Views = Diamond.Views || {};

(function () {
    'use strict';

    Diamond.Views.PortfolioCollectionView = Backbone.View.extend({
        el: '#portfolioSection',
        template: JST['app/scripts/templates/portfolio_collection_view.ejs'],
        tagName: 'div',
        id: '',
        className: '',
        events: {

        },
        initialize: function () {
            var self = this;
            this.filterType = [];
            this.listenTo(this.collection, 'change', this.render);
            Backbone.on('changeActive', this.changeActive, this);
			this.collection.fetch({
                success: function (collection, response) {
                    self.render();
                },
                error: function (collection, response) {
                    console.log(response);
                }
            });
        },
        render: function () {
            var d = this;
            this.filterType.push({label: "Show All", filter: "*", "class" : "selected"});
            d.collection.map(function (itemModel){
                var exist = _.findWhere(d.filterType, {filter: itemModel.get("type")});
                if(exist==undefined){
                    d.filterType.push({label: itemModel.get("type_name"), filter: itemModel.get("type"), class: ''});
                }
            });
            this.$el.html(this.template({filter: this.filterType}));
            this.$el.find("#portfolioInner").append(this.collection.map(function (item){
                var itemModel = item;
                if(!(item instanceof Diamond.Models.Portfolio)){
                    itemModel = new Diamond.Models.Portfolio(item);
                }
                return new Diamond.Views.PortfolioView({model: itemModel, className: 'col-sm-6 col-md-4 item ' + itemModel.get('type')}).render().$el;
            }));
            var $containerRow = this.$el.find("#portfolioInner").isotope({
                itemSelector: '.item',
                layoutMode: 'fitRows'
            });
            // filter items on button click
            this.$el.find('#filter').on('click', 'a', function() {
                var filterValue = $(this).attr('data-filter');
                if(filterValue != "*")
                    filterValue = "." + filterValue;
                d.$el.find('#filter li a').removeClass('selected');
                $(this).addClass('selected');
                $containerRow.isotope({ filter: filterValue });
            });
			return this;
        },
        changeActive: function(modelActive) {
            var d = this, sizeOf = this.collection.length;
            d.collection.setElement(modelActive);
            var currentIndex = this.collection.getCurrentIndex();
            var portfolioModal = new Diamond.Views.PortfolioModalView({model: modelActive, el: "#portfolioModal"});
            if($('#portfolioModal').data('bs.modal') && $('#portfolioModal').data('bs.modal').isShown){
                $('#portfolioModal').removeClass("animated pulse").empty();
                portfolioModal.render().$el;
                $('#portfolioModal').find(".modal-dialog").delay(1000).addClass("animated pulse");
            }else{
                portfolioModal.render().$el;
                $('#portfolioModal').modal();
            }
            if(currentIndex == 0){
                $('#portfolioModal').find("a.prev").addClass("disabled");
            }else{
                $('#portfolioModal').find("a.prev").removeClass('visibility', 'visible');
            }
            if(sizeOf == (currentIndex+1)){
                $('#portfolioModal').find("a.next").addClass("disabled");
            }else{
                $('#portfolioModal').find("a.next").removeClass("disabled");
            }
            $('#portfolioModal').find("a.next").on("click", function(evt){
                return d.nextPage(evt);
            });
            $('#portfolioModal').find("a.prev").on("click", function(evt){
                return d.prevPage(evt);
            });
            // this.collection.getCurrentIndex()
        },
        nextPage: function(evt){
            evt.stopImmediatePropagation();
            this.collection.next();
            var modelActive = this.collection.getElement();
            this.changeActive(modelActive);
            return false;
        },
        prevPage: function(evt){
            evt.stopImmediatePropagation();
            this.collection.prev();
            var modelActive = this.collection.getElement();
            this.changeActive(modelActive);
            return false;
        }
    });

})();
