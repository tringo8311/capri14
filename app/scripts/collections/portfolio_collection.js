/*global Diamond, Backbone*/

Diamond.Collections = Diamond.Collections || {};

(function () {
    'use strict';

    Diamond.Collections.PortfolioCollection = Backbone.Collection.extend({
        url: '/portfolio.json',
        model: Diamond.Models.Portfolio,
        default: {
            currentElement: null
        },
        comparator: function (model) {
            return model.get("id");
        },
        getCurrentIndex: function(){
            if(this.getElement()!=null)
                return this.indexOf(this.getElement());
            return null;
        },
        getElement: function () {
            return this.currentElement;
        },
        setElement: function (model) {
            this.currentElement = model;
        },
        next: function () {
            this.setElement(this.at(this.indexOf(this.getElement()) + 1));
            return this;
        },
        prev: function () {
            this.setElement(this.at(this.indexOf(this.getElement()) - 1));
            return this;
        }
    });

})();
