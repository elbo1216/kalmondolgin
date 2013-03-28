define(['jquery', 
        'underscore', 
        'backbone', 
        'app/views/customer', 
        'app/views/payment_schedule', 
        'app/views/property_info', 
        'app/views/marketing', 
        'app/views/deal_form'], function($, _, Backbone) {
  $(document).ready(function() {
    var billCustomerView = new CustomerView({formType: 'bill', el: $('#bill-info-container')});
    var paymentScheduleView = new PayoutView();
    var appraisalForm = new DealFormView(
             {'el': '#deals-form-container',
              'registeredForms': [
                   {
                     'name': 'billCustomer', 
                     'title' : 'Bill Customer',
                     'viewObj': billCustomerView
                   }, 
                   {
                      'name': 'paymentSchedule',
                      'title' : 'Payment Schedule',
                      'viewObj': paymentScheduleView
                   }
              ]
             });

    appraisalForm.initialize();
    appraisalForm.populateBrokersOptions(['broker-list-btn', 'deal-main-broker']);
    $('.submit-form').click(function() {
      var errors = appraisal.validateForm();
      if (errors.length > 0) {
        appraisalForm.populateErrorMsg('message-container', errors);
      } else {
        var appraisalParams = {'detailWorkPerformed' : $('#detailWorkPerformed').html(),
                               'brokerComments' : $('brokerComments').html(),
                               'mainBroker': $('#deal-main-broker').val(),
                               'totalDueToKDA': $('#kda_comm').val()
                              }
        $.extend(appraisalParams, {'messageContainer': 'message-container'})
        appraisalForm.submitForm(saleParams);
      }
    });
    
  });
});
