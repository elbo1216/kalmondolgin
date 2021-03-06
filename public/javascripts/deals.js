<<<<<<< HEAD
define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
  $(document).ready(function() {
    var form = document.URL.split("/")[4];
  
    if (form == 'search') {
      $('.form-buttons').hide();
    }
  
    // Get selected subnav
    $('.sub-nav-deals li').each(function(index, li) {
      $($(li).attr('class').split(' ')).each(function(index, clazz) {
        if (clazz == 'subnav-selected') {
          $(li).removeClass(clazz);
        }
      });
      if ($(li).attr('id') == form) {
        $(li).addClass('subnav-selected');
      }
    });
  
    if ($.inArray(form, ['sale', 'lease', 'appraisal', 'tax_protest']) > -1) {
      $('#new').addClass('subnav-selected');
      $('#' + form + ' span').addClass('subnav-selected');
      $('.new-deal-container').show();
      
    }
  
    $('#add-payment-row').click(function() {
      var tr = $('<tr>')
          .append($('<td>').html("<input type=text class='medium-input'>"))
          .append($('<td>').html("<input type=text class='medium-input'>"))
          .append($('<td>').html("<input type=text class='medium-input'>"))
          .append($('<td>').html("<input type=text class='medium-input'>"));
      $('#payment-schedule-table tbody').append(tr);
    });
  
    $('#new').click(function() {
      $(this).addClass('subnav-selected');
      $('.new-deal-container').slideToggle();
    });
  
  });
  
  function validateForm() {
  
  }
  
  /* Broker list selection */
  function populateBrokerList() {
    $.ajax({
      url: '/deals/get_all_brokers',
      success: function(data) {
        for (var i=0; i< data.length; i++) {
          $('#broker-list-btn').append("<option value = '" + data[i].key + "'>" + data[i].name + "</option>");
        }
      }
    });
  }
  
  /* Add Broker to list */
});
