define(['jquery', 
        'underscore', 
        'backbone', 
        'app/views/customer', 
        'app/views/property_info', 
        'app/views/marketing', 
        'app/views/payment_schedule', 
        'app/models/customer',
        'app/models/property',
        'app/collections/brokers', 
        'app/collections/states', 
        'app/collections/space_types', 
        'app/collections/countries'], function($, _, Backbone) {
    // Populate the states drop down
  $(document).ready(function() {
    SaleFormView = Backbone.View.extend({
      initialize: function(options) {
        var saleForm = this;
        var states = new States();
        states.fetch({success: function() {
          $('#bill-state').append(states.optionList().join(""));
          $('#purchaser-state').append(states.optionList().join(""));
          $('#property-state').append(states.optionList().join(""));
        }});

        //Populate the countries drop down
        var countries = new Countries();
        countries.fetch({success: function() {
          $('#bill-country').append(countries.optionList().join(""));  
          $('#purchaser-country').append(countries.optionList().join(""));  
          $('#property-country').append(countries.optionList().join(""));  
        }});

        //Populate the countries drop down
        var spaceTypes = new SpaceTypes();
        spaceTypes.fetch({success: function() {
          $('#space-type').append(spaceTypes.optionList().join(""));  
        }});
    
        var brokers = new Brokers; 
        brokers.fetch({
          success: function (collection, resp, options) {
             $('#broker-list-btn').append(brokers.optionList().join(""));
             $('#deal-main-broker').append(brokers.optionList().join(""));
          },
          error: function() {
          }
        });
    
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
        // End Bind
    
        // Co-broker event
        $('#activate-create-co-broker').click(function() {
          if ($(this).is(':checked')) {
            $('#new-co-broker').removeAttr('disabled');
            $('#co-broker-select').attr('disabled', 'disabled');
          } else {
            $('#co-broker-select').removeAttr('disabled');
            $('#new-co-broker').attr('disabled', 'disabled');
          }
        })
        // End Co-broker Event
    
        $('.clear-form').click(function() {
        });
    
        $('.submit-form').click(function() {
          var errors = [];
          var saleInfoErr = {'title': 'Sale Info Errors', 'errors': []}
          if ($('#deal-main-broker').val() == undefined) {
            saleInfoErr['errors'].push("No Broker Selected");
          }

          if ($('#kda_comm').val() == "") {
            saleInfoErr['errors'].push("Total Commission needs to be filled");
          }

          if (saleInfoErr['errors'].length > 0) {
            errors.push(saleInfoErr);
          }

          var billCustomerErrors = saleForm.options['billCustomer'].validateForm();
          if (billCustomerErrors.length > 0) {
            errors.push({'title': 'Bill Customer Errors', 'errors': billCustomerErrors});
          }

          var purchaserCustomerError = saleForm.options['purchaserCustomer'].validateForm();
          if (purchaserCustomerError.length > 0) {
            errors.push({'title': 'Purchase Customer Errors', 'errors': purchaserCustomerError });
          }

          var propertyErrors = saleForm.options['propertyInfo'].validateForm();
          if (propertyErrors.length > 0) {
            errors.push({'title' : 'Property Info Errors', 'errors': propertyErrors});
          }

          if (errors.length > 0) {
            saleForm.populateErrorMsg(errors);
          } else {
            saleForm.submitForm();
          }
        });
      },
      submitForm: function() {
        var saleForm = this;
        var saleParams = {'dealType': 'sale',
                          'mainBroker': $('#deal-main-broker').val(),
                          'totalDueToKDA': $('#kda_comm').val()
                         };
        $.extend(saleParams, {'billCustomer': saleForm.options['billCustomer'].getValues()});
        $.extend(saleParams, {'purchaserCustomer': saleForm.options['purchaserCustomer'].getValues()});
        $.extend(saleParams, {'propertyInfo': saleForm.options['propertyInfo'].getValues()});
        $.extend(saleParams, {'marketingValues': saleForm.options['marketing'].getValues()});
        $.extend(saleParams, {'marketingValues': saleForm.options['paymentSchedule'].getValues()});
 
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

        $.ajax({
          url: '/deals/submit',
          data: saleParams,
          success: function(data) {
            $('#message-container').removeClass('error-container')
                       .addClass('success-well')
                       .html("The deal has been saved.  Your deal id is " + data.dealId);
          }
        });
      },
      getScheduleValues: function() {
        var payments = [];
        for(var i=0;i<$('#payment-schedule-table tr').length; i++) {
          if ($('#paymentDate' + i).val() != "") {
            payments.push({'paymentDate': $('#paymentDate' + i).val(), 'paymentDue': $('#paymentDue' + i).val()});
          }
        } 
        return payments;
      },
      populateErrorMsg: function(errorMsg) {
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

    var billCustomerView = new CustomerView({formType: 'bill', el: $('#bill-info-container')});
    var purchaserCustomerView = new CustomerView({formType: 'purchaser', el: $('#purchaser-info-container')});
    var propertyView = new PropertyView();
    var marketingView = new MarketingView();
    var paymentScheduleView = new PayoutView();
    saleForm = new SaleFormView({'el': '#deals-form-container', 'billCustomer': billCustomerView, 'purchaserCustomer': purchaserCustomerView, 'propertyInfo': propertyView, 'marketing': marketingView, 'paymentSchedule': paymentScheduleView});
  });
});
