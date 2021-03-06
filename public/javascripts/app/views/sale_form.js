define(['jquery', 
        'underscore', 
        'backbone', 
        'app/views/customer', 
        'app/views/payment_schedule', 
        'app/views/property_info', 
        'app/views/marketing', 
        'app/views/deal_form'], function($, _, Backbone) {
    // Populate the states drop down
  $(document).ready(function() {
    // TODO: Need a better way to do this...
    var dealData = $('#deals-data').html();

    // Bind change event to broker selection 
    $('#broker-list-btn').change(function() {
      var value = $(this).val();
      $(this).find("option").each(function(index, item) {
        if ($(item).val() == value) {
          var container = $('#broker-list');
          var closeSpan = $('<span>')
                       .addClass('remove')
                       .html('&#10006;')
                       .click(function() {
                         $(this).parent().remove();
                         $('#broker-list-btn').append("<option value='" + value + "'>" + $(item).html() + "</option>");
                       });
           var li = $('<li>')
                    .append("<span>" + $(item).html() + "</span>")
                    .append("<input type='hidden' name='other-broker-list' value='" + value + "' />")
                    .append(closeSpan);
          container.append(li);  
          $(this).remove();
        }
      });
    });

    // Co-broker event
    $('#activate-create-co-broker').click(function() {
      if ($(this).is(':checked')) {
        $('#new-co-broker').removeAttr('disabled');
        $('#co-broker-select').attr('disabled', 'disabled');
      } else {
        $('#co-broker-select').removeAttr('disabled');
        $('#new-co-broker').attr('disabled', 'disabled');
      }
    });
    // End Co-broker Event

    var billCustomerView = new CustomerView({formType: 'bill', el: $('#bill-info-container')});
    var purchaserCustomerView = new CustomerView({formType: 'purchaser', el: $('#purchaser-info-container')});
    var propertyView = new PropertyView();
    var marketingView = new MarketingView();
    var paymentScheduleView = new PayoutView();
    var saleForm = new DealFormView(
             {'el': '#deals-form-container',
              'registeredForms': [
                   {
                     'name': 'billCustomer', 
                     'title' : 'Bill Customer',
                     'viewObj': billCustomerView
                   }, 
                   {
                      'name': 'purchaserCustomer', 
                      'title' : 'Purchaser Customer',
                      'viewObj': purchaserCustomerView
                   },
                   {
                      'name': 'propertyInfo',
                      'title' : 'Property Info',
                      'viewObj': propertyView
                   },
                   {
                      'name': 'marketing',
                      'title' : 'Marketing Info',
                      'viewObj': marketingView
                   }, 
                   {
                      'name': 'paymentSchedule',
                      'title' : 'Payment Schedule',
                      'viewObj': paymentScheduleView
                   }
              ]
             });
    saleForm.initialize();
    saleForm.populateStatesOptions(['bill_state', 'purchaser-state', 'property-state']);
    saleForm.populateCountryOptions(['bill-country', 'purchaser-country', 'property-country']);
    saleForm.populateSpaceTypeOptions(['space-type']);
    
    $('.submit-form').click(function() {
      var errors = saleForm.validateForm();
      if (errors.length > 0) {
        saleForm.populateErrorMsg('message-container', errors);
      } else {
        var saleParams = {'dealType': 'sale',
                          'mainBroker': $('#deal-main-broker').val(),
                          'totalDueToKDA': $('#kda_comm').val()
                         };
        // Get Co-Broker name
        if ($('#activate-create-co-broker:checked').val() != undefined) {
          $.extend(saleParams, {'coBroker': $('#new-co-broker').val()});
        } else {
          $.extend(saleParams, {'coBroker': $('#co-broker-select').val()});
        }

        // Get Co-Broker Percentage
        $.extend(saleParams, {'coBrokerPer': $('#co_broker_per').val()});

        // Get All of the other brokers on the sale
        var otherBrokers = [];
        $('input[name="other-broker-list"]').each(function (index, input) {
          otherBrokers.push($(input).val());
        });
        
        if (otherBrokers.length > 0) { $.extend(saleParams, {'otherBrokers' : otherBrokers}) } 
        // Add the message container to send success message
        $.extend(saleParams, {'messageContainer': 'message-container'})
        saleForm.submitForm(saleParams);
      }
    });
  });

});
