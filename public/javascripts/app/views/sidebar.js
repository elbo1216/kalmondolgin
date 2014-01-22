define(['jquery', 'underscore', 'backbone', 'app/router'], function($, _, Backbone, AppRouter) {
  SidebarView = Backbone.View.extend({
    el: $('#main-nav'),
    
    initialize: function() {
      this.controller = document.URL.split('/')[3];
      this.submenu = document.URL.split('/')[4];
      this.render();

      $('#deals-menu').click(function() {
        var glyph = $($(this).find('i'));
        if (glyph.hasClass('glyphicon-chevron-right')) {
          glyph.removeClass('glyphicon-chevron-right');
          glyph.addClass('glyphicon-chevron-down');
        } else {
          glyph.removeClass('glyphicon-chevron-down');
          glyph.addClass('glyphicon-chevron-right');
        }
        $($('#deals').find("ul")).slideToggle();
      });
    
      $('.main-nav-li').each(function() { $(this).removeClass('active') });
      $('#' + this.controller).addClass('active');
      if (this.controller == 'deals') {
        $('#deals').children('ul').show();
        $('#deals li').each(function() { $(this).removeClass('active') });
        $('#' + this.submenu).addClass('active');
      } else {
        $('#deals').children('ul').hide();
      }
    }, 

    render: function() {
    var html = "<ul class='menu'>" + 
          "<li id='dashboard' class='main-nav-li'><a href='/dashboard'>Home</a></li>" + 
          "<li id='deals' class='submenu main-nav-li'>" +
            "<a id='deals-menu' href='#'>" + 
              "<span>Deals</span>" + 
              "<i class='arrow glyphicon glyphicon-chevron-right'></i>" + 
            "</a>" +
            "<ul>" +
              "<li id='sale' class='bt-border new-deal'>" +
                "<a href='/deals/sale'>Sale</a>" +
              "</li>" +
              "<li id='lease' class='bt-border new-deal'>" +
                "<a href='/deals/lease'>Lease</a>" +
              "</li>" +
              "<li id='appraisal' class='bt-border new-deal'>" +
               "<a href='/deals/appraisal'>Appraisal</a>" +
              "</li>" +
              "<li id='tax_protest' class='new-deal'>" +
                "<a href='/deals/tax_protest'>Tax Protest</a>" +
              "</li>" +
            "</ul>" +
          "</li>" +
          "<li id='brokers' class='main-nav-li'><a href='/brokers'>Brokers</a></li>" +
          "<li id='reports' class='main-nav-li'><a href='/reports'>Reports</a></li>" +
          "<li id='invoices' class='main-nav-li'><a href='/invoices'>Invoice</a></li>" +
        "</ul>";

      this.$el.html(html);
      return this;
    },
    
  });
});
