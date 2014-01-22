define(['jquery', 'underscore', 'backbone', 'lib/jquery-ui-1.10.1.custom', 'app/views/baseview'], function($, _, Backbone) {
  PayoutView = BaseViewForm.extend({
     initialize: function(options) {
       var _dd = this;
       $('#add-payment-row').click(function() {
         var index = $('input[name="paymentDate"]').length + 1;
         $('#payment-schedule-list').append(_dd.createNewRow(index));
         $('#paymentDate'+index).datepicker({dateFormat: "yy-mm-dd"});
       });
        
       $('input[name="paymentDate"]').each(function() {
          $(this).datepicker({dateFormat: "yy-mm-dd"});
       });
     },
     createNewRow: function(index) {
       var row ="<input id='paymentDate" + index + "' name='paymentDate' type=text class='form-control medium-input'>" + 
                 "<span>" + 
                 "<span class='input-group-addon'>$</span>" + 
                 "<input id='paymentDue" + index + "' type=text class='form-control medium-input addon-left'>" + 
                 "<span>" + 
                 "<div class='clear'></div>";
       return $('<li>').html(row);
     },
     getValues: function() {
       var payments = [];
       $('#payment-schedule-list li').each(function(index, row) {
        if ($('#paymentDate' + index).val() != "") {
          payments.push({'paymentDate': $('#paymentDate' + index).val(), 'paymentDue': $('#paymentDue' + index).val()});
        }
       });
       return payments;
     },
     validateForm: function() {
      // Remove all previous errors
       $('#payment-schedule-list input').removeClass('input-error');

       var errorMsg = [];
       if (!$('#paymentDate1').val()) {
         errorMsg.push("First Payment Date cannot be blank")
         $('#paymentDate1').addClass('input-error');
       }

       if (!$('#paymentDue1').val()) {
         errorMsg.push("First Payment Due cannot be blank")
         $('#paymentDue1').addClass('input-error');
       }

       // Check to make sure the paymentDue are integers
       var listCount = $('#payment-schedule-list li').length;
       for (var i=1;i<=listCount;i++) {
         var pDue = $('#paymentDue' + i);
         if (isNaN(pDue.val())) {
         errorMsg.push('Payment ' + i + ' must be a number')
         pDue.addClass('input-error');
         }
       }

       return errorMsg;
     },
     clearForm: function() {
       $('#payment-schedule-list li').each(function(index, obj) {
         if (index > 2) { $(obj).remove(); }
         $(obj).find('input').val('');
       });
     }
  });
});
