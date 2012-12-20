define(['jquery', 'underscore', 'backbone', 'lib/jquery-ui-1.10.1.custom'], function($, _, Backbone) {
    PayoutView = Backbone.View.extend({
       initialize: function(options) {
         $('#add-payment-row').click(function() {
           var index = $('input[name="paymentDate"]').length + 1;
           var inputDate = $('<input>').attr('type', 'text')
                                       .attr('id', 'paymentDate' + index)
                                       .attr('name', 'paymentDate')
                                       .addClass('medium-input')
                                       .datepicker({});
           var inputPayment = $('<input>').attr('type', 'text')
                                         .attr('id', 'paymentDue' + index)
                                         .attr('name', 'paymentDue')
                                         .addClass('medium-input');
           var tr = $('<tr>')
              .append($('<td>').append(inputDate))
              .append($('<td>').append(inputPayment))

           $('#payment-schedule-table tbody').append(tr);
         });
          
         $('input[name="paymentDate"]').each(function() {
            $(this).datepicker({});
         });
       },
       getPaymentValues: function() {
         var payments = [];
         $('#payment-schedule-table tr').each(function(index, row) {
           payments.push({'date': $('#paymentDate' + index.toString()).val(),
                          'paymentDue': $('#paymentDue' + index.toString()).val()});
         });
         return payments;
       }
    });

    var payoutView = new PayoutView();
});
