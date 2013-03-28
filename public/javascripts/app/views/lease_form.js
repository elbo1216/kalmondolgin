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
    var leaseForm = new DealFormView(
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
    leaseForm.initialize();
    leaseForm.populateStatesOptions(['bill_state', 'purchaser-state', 'property-state']);
    leaseForm.populateCountryOptions(['bill-country', 'purchaser-country', 'property-country']);
    leaseForm.populateSpaceTypeOptions(['space-type']);
    leaseForm.populateBrokersOptions(['broker-list-btn', 'deal-main-broker']);
    
    $('.submit-form').click(function() {
      var errors = leaseForm.validateForm();
      if (errors.length > 0) {
        populateErrorMsg(errors);
      } else {
        var leaseParams = {'dealType': 'lease',
                          'mainBroker': $('#deal-main-broker').val(),
                          'totalDueToKDA': $('#kda_comm').val()
                         };
        // Get Co-Broker name
        if ($('#activate-create-co-broker:checked').val() != undefined) {
          $.extend(leaseParams, {'coBroker': $('#new-co-broker').val()});
        } else {
          $.extend(leaseParams, {'coBroker': $('#co-broker-select').val()});
        }

        // Get Co-Broker Percentage
        $.extend(leaseParams, {'coBrokerPer': $('#co_broker_per').val()});

        // Get All of the other brokers on the lease
        var otherBrokers = [];
        $('input[name="other-broker-list"]').each(function (index, input) {
          otherBrokers.push($(input).val());
        });
        
        if (otherBrokers.length > 0) { $.extend(leaseParams, {'otherBrokers' : otherBrokers}) } 
        // Add the message container to send success message
        $.extend(leaseParams, {'messageContainer': 'message-container'})
        leaseForm.submitForm(leaseParams);
      }
    });
  });

  function populateErrorMsg(errorMsg) {
    var ul = $('<ul>');
    for( var i=0; i<errorMsg.length; i++) {
      var ul2 = $('<ul>').css('float', 'none');
      ul2.append($('<li>').html(errorMsg[i]['title'])
                          .addClass('error-title'));
      for (var j=0; j<errorMsg[i]['errors'].length; j++) {
        ul2.append($('<li>').html(errorMsg[i]['errors'][j])
                            .addClass('error-msg'));
      }
      ul.append($('<li>').append(ul2));
    }
    $('input').removeClass('input-error');
    $('#message-container').addClass('error-container')
                           .empty()
                           .append(ul)
                           .show();
  }
});
