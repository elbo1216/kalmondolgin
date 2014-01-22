define(['jquery', 
        'underscore', 
        'backbone',
        'app/helper'
        ], function($, _, Backbone) {
    BrokerDropDownView = Backbone.View.extend({
      initialize: function(option) {
        this._brokerData = option.brokerData;
        this._unselectedList = option.brokerData;
        this._selectedList = [];
        this.el = option.el;
        this._id = option.id;
        this._btnTxt = option.buttonText;
        this._selContainer = option.selectedContainer;
        this.render();
      },
      setBrokerData: function(data) { this._brokerData =  data },
      render: function() {
        var dd = this;
        var id = this._id;
        Helper.createDropDown(id, dd._btnTxt, dd._unselectedList)
        if (dd._selContainer != undefined) { 
          $('#' + id + '-list').on('click', 'li', function() { dd.addAdditionalBrokers($(this).attr('id'), $(this).html()) });
        }
      },
      addAdditionalBrokers: function(brokerId, value) {
        var container = $('#' + this._selContainer);
        var closeSpan = $('<span>').addClass('remove')
                                   .html('&#10006;')
                                   .click(function() {
                                       $(this).parent().remove();
                                   });
         var li = $('<li>').append("<span>" + value + "</span>")
                           .append("<input id='" + brokerId + "' type='hidden' name='other-broker-list' value='" + brokerId + "' />")
                           .append(closeSpan);
         this.render();
         container.append(li);  
      }
    });
});
