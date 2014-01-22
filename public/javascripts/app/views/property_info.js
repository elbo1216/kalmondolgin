define(['jquery', 'underscore', 'backbone', 'app/collections/properties', 'app/views/baseview'], function($, _, Backbone) {
  PropertyView = BaseViewForm.extend({
    initialize: function(options) {
      var view = this;
      
      $('#property-new-form').click(function() {
        $('#property-search').hide();
        $('#property-new').show();
        $('#property-new-form').addClass('active');
        $('#property-search-form').removeClass('active');
      });

      $('#property-search-form').click(function() {
        $('#property-search').show();
        $('#property-new').hide();
        $('#property-new-form').removeClass('active');
        $('#property-search-form').addClass('active');
      });

     
      $('#property-search-button').click(function() {
        var data = {address : $('#property-search-address').val(),
                    state : $('#property-search-state').val(),
                    city : $('#property-search-city').val(),
                    zip : $('#property-search-zip').val()}
        var pList = new PropertyList();
        var table = $('#property-search-results-table')
        table.hide();
        $('#property-search-wait').show();
        pList.fetch({data : data, 
                    success: function(collection, response, options) {
                      var tbody = $(table.find("tbody"));
                      tbody.html("");
                      collection.each(function(model) {
                        var tr = $('<tr>').addClass('results-row')
                                          .append('<td>' + model.get('space_type') + '</td>')
                                          .append('<td>' + model.get('street_line1') + '</td>')
                                          .append('<td>' + model.get('city') + '</td>')
                                          .append('<td>' + model.get('state') + '</td>')
                                          .append('<td>' + model.get('zip') + '</td>')
                                          .click(function() {
                                              $('#property-id').val(model.get('id'));
                                              $('#property-street1-selected').html(model.get('street_line1'));
                                              $('#property-street2-selected').html(model.get('street_line2'));
                                              $('#property-city-selected').html(model.get('city'));
                                              $('#property-state-selected').html(model.get('state'));
                                              $('#property-zip-selected').html(model.get('zip'));
                                              $('#property-country-selected').html(model.get('country'));
                                              $('#property-space-type-selected').html(model.get('space_type'));
                                              $('#property-selected').show();
                                          });
                        tbody.append(tr);
                      })

                      $('#property-search-wait').fadeOut(400, function() {
                        table.fadeIn();
                      });
                    }});
        
      });

      $('#property-price').blur(function() {
        var size = $('#property-size').val();
        if (parseInt(size) > 0 && parseInt($(this).val()) > 0 ) {
          $('#sqft').html('($' + parseInt($(this).val())/parseInt(size) + '/sqft)');
        }
      })

      $('#property-size').blur(function() {
        var sale_price = $('#property-price').val();
        if (parseInt(sale_price) > 0 && parseInt($(this).val()) > 0 ) {
          $('#sqft').html('($' + parseInt(sale_price)/parseInt($(this).val()) + '/sqft)');
        }
      })

      if (options['formType'] == 'lease') {
        $('#start-date').datepicker({dateFormat: "yy-mm-dd"});
        $('#start-date-selected').datepicker({dateFormat: "yy-mm-dd"});
      }
      
    },
    validateForm: function() {
      // Remove all previous errors
      $('#property-new-form input').removeClass('input-error');
      $('#property-state-container-button').removeClass('input-error');
      $('#space-type-button').removeClass('input-error');
      
      

      var errorMsg = [];
      var formType = this.options['type'];
      //Validate values here
      if ($('#property-new-form').hasClass('active')) {
        // Street Address must be valid
        if (!$('#property-street1').val()) {
          errorMsg.push("Property street 1 cannot be blank")
          $('#property-street1').addClass('input-error');
        }
  
        if (!$('#property-city').val()) {
          errorMsg.push("Property city cannot be blank")
          $('#property-city').addClass('input-error');
        }
  
        if (!$('#property-state').val()) {
          errorMsg.push("Property state cannot be blank")
          $('#property-state-container-button').addClass('input-error');
        }
  
        if (!$('#property-zip').val()) {
          errorMsg.push("Property zip cannot be blank")
          $('#property-zip').addClass('input-error');
        } else {
          if(isNaN($('#property-zip').val())) {
            errorMsg.push("Zip must be a number")
            $('#property-zip').addClass('input-error');
          }
        }
  
        if (!$('#space-type').val()) {
          errorMsg.push("Space Type cannot be blank");
          $('#space-type-button').addClass('input-error');
  
        }

        if (!$('#property-size').val()) {
          errorMsg.push("Property size cannot be blank");
          $('#property-size').addClass('input-error');
        } else {
          if(isNaN($('#property-size').val())) {
            errorMsg.push("Size must be a number")
            $('#property-size').addClass('input-error');
          }
        }

        if (!$('#property-price').val()) {
          errorMsg.push("Property price cannot be blank");
          $('#property-price').addClass('input-error');
        } else {
          if(isNaN($('#property-price').val())) {
            errorMsg.push("Price must be a number")
            $('#property-price').addClass('input-error');
          }
        }

        if (formType == 'lease') {
          if (!$('#start-date').val()) {
            errorMsg.push("No start date has been selected");
          }
  
          if (!$('#term-of-lease').val()) {
            errorMsg.push("No term of lease has been entered");
          }
        }
      } else {
        if (!$('#property-id').val()) {
          errorMsg.push("No property has been selected");
        }

        if (!$('#start-date-selected').val()) {
          errorMsg.push("No start date has been selected");
        }

        if (!$('#term-of-lease-selected').val()) {
          errorMsg.push("No term of lease has been entered");
        }

        if (formType == 'lease') {
          if (!$('#start-date-selected').val()) {
            errorMsg.push("No start date has been selected");
          }
  
          if (!$('#term-of-lease-selected').val()) {
            errorMsg.push("No term of lease has been entered");
          }
        }
      }

      return errorMsg;
    },
    getValues: function() {
      var params = {};
      var formType = this.options['formType'];
      if ($('#property-new-form').hasClass('active')) {
        $.extend(params, {'street1': $('#property-street1').val(),
                          'street2': $('#property-street2').val(),
                          'city': $('#property-city').val(),
                          'state': $('#property-state-container-input').val(),
                          'zip': $('#property-zip').val(),
                          'country': $('#property-country-container-input').val(),
                          'spaceType': $('#space-type-input').val(),
                          'price': $('#property-price').val(),
                          'size': $('#property-size').val(),
                          'buyerUse': $('#buyer-use').val()});
        if (formType == 'lease') {
          $.extend(params, {'startDate': $('#start-date').val(),
                            'tenantUse': $('#tenant-use').val(),
                            'security': $('#security').val(),
                            'termOfLease': $('#term-of-lease').val()});
        } else {
          $.extend(params, {'attorney': $('#property-attorney').val(),
                            'size': $('#property-size').val()});
        }
      } else {
       $.extend(params, {'propertyId': $('#property-id').val(),
                          'price': $('#property-price-selected').val(),
                          'size': $('#property-size-selected').val(),
                          'buyerUse': $('#buyer-use-selected').val()});

        if (formType == 'lease') {
          $.extend(params, {'startDate': $('#start-date-selected').val(),
                            'tenantUse': $('#tenant-use-selected').val(),
                            'security': $('#security-selected').val(),
                            'termOfLease': $('#term-of-lease-selected').val()});
        } else {
          $.extend(params, {'attorney': $('#property-attorney-selected').val(),
                            'size': $('#property-size-selected').val()});
        }
      }

      return params;
    },
    clearForm: function() {
      $('.property-info-container input').val('');
      $('#property-search-results-table').hide();
      $('#property-selected').hide();
      $('#property-state-container-button .button-text').val('Find a State');
      $('#property-country-container-button .button-text').val('Find a Country');
      $('#space-type-button .button-text').val('Select A Space Type');
    }
  });
});
