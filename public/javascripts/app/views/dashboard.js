define(['jquery', 'underscore', 'backbone', 'datatables'], function($, _, Backbone) {
  var dashboardView = Backbone.View.extend({
    initialize: function() {
      var dealListoTable = $('#deal-list-table').dataTable({
                         "bPaginate": false,
                         "bInfo": false
                    });
      $('#deal-list-table-search').keyup(function(obj) {
        dealListoTable.fnFilter($(this).val());
      });
      
      var dealPastDueoTable = $('#deal-past-due-table').dataTable({
                         "bPaginate": false,
                         "bInfo": false
                    });
      $('#deal-past-due-table-search').keyup(function(obj) {
        dealPastDueoTable.fnFilter($(this).val());
      });
  
      var dealUpcomingoTable = $('#deal-upcoming-option-table').dataTable({
                         "bPaginate": false,
                         "bInfo": false
                    });
      $('#deal-upcoming-option-table-search').keyup(function(obj) {
        dealUpcomingoTable.fnFilter($(this).val());
      });
    
      function closeTable(tableId) {
        $('#' + tableId + '_wrapper').slideUp(500, function() {
          $('#' + tableId + '-title .border').css('border-bottom-left-radius', '5px');
          $('#' + tableId + '-title .border').css('border-bottom-right-radius', '5px');
          $('#' + tableId + '-toggle').html('+');
          $('#' + tableId + '-toggle').attr('href', 'javascript:openTable("' + tableId + '")');
        });
      }
    
      function openTable(tableId) {
        $('#' + tableId + '-title .border').css('border-bottom-left-radius', '');
        $('#' + tableId + '-title .border').css('border-bottom-right-radius', '');
        $('#' + tableId + '_wrapper').slideDown(500, function() {
          $('#' + tableId + '-toggle').html('-');
          $('#' + tableId + '-toggle').attr('href', 'javascript:closeTable("' + tableId + '")');
         });
      }
    }
  });

  var dV = new dashboardView();
  dV.initialize();
});
