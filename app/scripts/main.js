/*global Diamond, $*/

_.mixin(_.str.exports());
window.Diamond = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        var $this = this;
        $(".linked").pulsate({
            color: $("#cubes-wrapp .element").css("background-color"),
            reach: 15,
            speed: 600,
            pause: 0,
            glow: true,
            repeat: true,
            onHover: true
        });
        // Init About
        new $this.Views.AboutView({model: new $this.Models.About, el: '#aboutSection'});
        new $this.Views.TeamView({model: new $this.Models.Team, el: '#teamSection'});
        // JSON
        /*var portfolioJSON = [
            { title: "ABC 12", type: "branding", type_name: "Branding", author: 'Minh Tri', email: 'tri@yahoo.com',client: 'Company XYZ 1', url: 'google.com', thumb: '/images/portfolio/thumb1.jpg',content: 'lorem lorem lorem lorem lorem lorem lorem'},
            { title: "ABC 12", type: "website", type_name: "Website", author: 'Minh Tri', email: 'tri@yahoo.com', client: 'Company XYZ 2', url: 'google.com', thumb: '/images/portfolio/thumb2.jpg',content: 'lorem lorem lorem lorem lorem lorem lorem'},
            { title: "ABC 3", type: "printing", type_name: "Printing", author: 'Minh Tri', email: 'tri@yahoo.com', client: 'Company XYZ 3', url: 'google.com', thumb: '/images/portfolio/thumb3.jpg',content: 'lorem lorem lorem lorem lorem lorem lorem'},
            { title: "ABC 45", type: "printing", type_name: "Marketing", author: 'Minh Tri', email: 'tri@yahoo.com', client: 'Company XYZ 4', url: 'google.com', thumb: '/images/portfolio/thumb4.jpg',content: 'lorem lorem lorem lorem lorem lorem lorem'},
            { title: "ABC 56", type: "website", type_name: "Website", author: 'Minh Tri', email: 'tri@yahoo.com', client: 'Company XYZ 5', url: 'google.com', thumb: '/images/portfolio/thumb5.jpg',content: 'lorem lorem lorem lorem lorem lorem lorem'},
            { title: "ABC 67", type: "branding", type_name: "Branding", author: 'Minh Tri', email: 'tri@yahoo.com', client: 'Company XYZ 6', urcl: 'google.com', thumb: '/images/portfolio/thumb6.jpg',content: 'lorem lorem lorem lorem lorem lorem lorem'},
            { title: "ABC 89", type: "mobile", type_name: "Mobile", author: 'Minh Tri', email: 'tri@yahoo.com', client: 'Company XYZ 7', url: 'google.com', thumb: '/images/portfolio/thumb7.jpg',content: 'lorem lorem lorem lorem lorem lorem lorem'}
        ];*/
        new $this.Views.PortfolioCollectionView({collection: new Diamond.Collections.PortfolioCollection(), el: '#portfolioSection'});
        //new $this.Views.PortfolioView({model: new Diamond.Models.Portfolio(portfolioJSON[0]), el: '#portfolioSection'});
        /*$("#portfolioSection").append(portfolioJSON.map(function (item) {
            var itemModel = item;
            if(!(item instanceof Diamond.Models.Portfolio)){
                itemModel = new Diamond.Models.Portfolio(item);
            }
            return new Diamond.Views.PortfolioView({model: itemModel}).render();
        }));*/
        new $this.Views.ServiceView({model: new $this.Models.Service, el: '#serviceSection'});
        new $this.Views.ContactView({model: new $this.Models.Contact, el: '#contactSection'});
        //new Diamond.Views.PortfolioModalView({model: new $this.Models.Portfolio(minhtri), el: "#contactSection"}).render();
        $this.parallaxScroll("body");
        $this.initDocument();
    },
    initDocument: function(){
        var $this = this;
        if(!$this.isMobile()){
            // Tooltip
            $('.awesome-tooltip', '#dotNav').tooltip({
                placement: 'left'
            });
            $('.awesome-tooltip', '.footer').tooltip({
                placement: 'top'
            });
            $(window).bind('scroll',function(e){
                $this.dotNavigation();
            });
            $("#cubes-wrapp a").on("click", function (t) {
                var n = $(this).attr("href");
                if (n.indexOf("#") == 0) {
                    t.preventDefault();
                    $("body, html").animate({
                        scrollTop: $(n).offset().top
                    }, "slow")
                }
            });
        }
        $(".footer .scroll2Top").on("click", function (t) {
            t.preventDefault();
            $this.scrollToTop()
        });
    },
    dotNavigation: function(){
        var thisTop = 0, docTop = $(document).scrollTop(), numSections = $('#mainContainer > section').length, wHeight = $(window).height();
        $('#dotNav li a').removeClass('active').parent('li').removeClass('active');
        $('#mainContainer > section').each(function(i,item){
            var ele = $(item), nextTop;
            if (typeof ele.next().offset() != "undefined") {
                nextTop = ele.next().offset().top;
            } else {
                nextTop = $(document).height();
            }
            if (ele.offset() !== null) {
                thisTop = ele.offset().top - ((nextTop - ele.offset().top) / numSections);
            } else {
                thisTop = 0;
            }
            if(docTop >= thisTop && (docTop < nextTop)){
                $('#dotNav li').eq(i).addClass('active');
            }
        });
        if(docTop>wHeight){
            $(".footer .scroll2Top").show();
        }else{
            $(".footer .scroll2Top").hide();
        }
    },
    scrollToTop: function(){
        // Scroll to top
        $('html, body').animate({scrollTop:0}, 'slow');
    },
    parallaxScroll: function(ele){
        //$(ele).find(".parallax.testimonial-section").
        $(".parallax", ele).parallax("50%", 0.20);
    },
    followScroll: function(ele){
        var top = $(ele).offset().top - parseFloat($(ele).css('marginTop').replace(/auto/, 0));
        $(window).scroll(function (event) {
            // what the y position of the scroll is
            var y = $(this).scrollTop();
            // whether that's below the form
            if (y >= top) {
              // if so, ad the fixed class
              $(ele).addClass('isStuck');
            } else {
                // otherwise remove it
                $(ele).removeClass('isStuck');
            }
        });
    },
    isMobile : function(byWidth){
        return (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    }
};
$(document).ready(function () {
    'use strict';
    Diamond.init();
});
(function (a) {
    function g(b, c) {
        var d = new google.maps.Geocoder;
        d.geocode({
            address: c.address
        }, function (d, e) {
            if (e == google.maps.GeocoderStatus.OK) {
                var f = d[0].geometry.location;
                a.each(b, function (a, b) {
                    var d = new google.maps.Map(b, {
                        zoom: c.zoom,
                        center: f,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        scrollwheel: c.scrollwheel,
                        mapTypeControl: c.mapTypeControl
                    }), e = new google.maps.Marker({
                            map: d,
                            position: f
                        })
                })
            }
        })
    }
    var b = "__jquerygmaps__",
        c = "http://maps.google.com/maps/api/js?v=3.3&sensor=false&callback=" + b,
        d = !1,
        e = a(document);
    window[b] = function () {
        d = !0, e.trigger("gmapsloaded")
    }, a.getScript(c);
    var f = {
        zoom: 13,
        scrollwheel: !1,
        mapTypeControl: !1
    };
    a.fn.gmaps = function (b) {
        var c = a.extend({}, f, b), h = this;
        d ?
        g(h, c) : e.bind("gmapsloaded", function () {
            g(h, c)
        });
        return this;
    }
})(jQuery);

(function (a) {
    a.fn.serializeObject = function()
    {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);