define(['jquery', 'underscore', 'backbone', 'app/collections/properties'], function($, _, Backbone) {
  PropertyView = Backbone.View.extend({
    initialize: function(options) {
      var view = this;
      
      $('#property-new-form').click(function() {
        $('#property-search').hide();
        $('#property-new').show();
        $('#property-new-form').addClass('selected');
        $('#property-search-form').removeClass('selected');
      });

      $('#property-search-form').click(function() {
        $('#property-search').show();
        $('#property-new').hide();
        $('#property-new-form').removeClass('selected');
        $('#property-search-form').addClass('selected');
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
                                              $('#property-selected-street1').html(model.get('street_line1'));
                                              $('#property-selected-street2').html(model.get('street_line2'));
                                              $('#property-selected-city').html(model.get('city'));
                                              $('#property-selected-state').html(model.get('state'));
                                              $('#property-selected-zip').html(model.get('zip'));
                                              $('#property-selected-country').html(model.get('country'));
                                              $('#property-selected-space-type').html(model.get('space_type'));
                                              $('#property-selected-sale-price').html(model.get('sale_price'));
                                          });
                        tbody.append(tr);
                      })

                      $('#property-search-wait').fadeOut(400, function() {
                        table.fadeIn();
                      });
                    }});
        
      });

      $('#property-sale-price').blur(function() {
        var size = $('#property-size').val();
        if (parseInt(size) > 0 && parseInt($(this).val()) > 0 ) {
          $('#sqft').html('($' + parseInt($(this).val())/parseInt(size) + '/sqft)');
        }
      })

      $('#property-size').blur(function() {
        var sale_price = $('#property-sale-price').val();
        if (parseInt(sale_price) > 0 && parseInt($(this).val()) > 0 ) {
          $('#sqft').html('($' + parseInt(sale_price)/parseInt($(this).val()) + '/sqft)');
        }
      })
      
    },
    validateForm: function() {
      var errorMsg = [];
      //Validate values here
      if ($('#property-new-form').hasClass('selected')) {
        // Street Address must be valid
        if (!$('#property_street1').val()) {
          errorMsg.push("Property street 1 cannot be blank")
          $('#property_street1').addClass('error-input');
        }
  
        if (!$('#property_city').val()) {
          errorMsg.push("Property city cannot be blank")
          $('#property_city').addClass('error-input');
        }
  
        if (!$('#property_state').val()) {
          errorMsg.push("Property state cannot be blank")
          $('#property_state').addClass('error-input');
        }
  
        if (!$('#property_zip').val()) {
          errorMsg.push("Property zip cannot be blank")
          $('#property_zip').addClass('error-input');
        }
  
        if (!$('#space_type').val()) {
          errorMsg.push("Space Type cannot be blank");
          $('#space_type').addClass('error-input');
  
        }

        if (!$('#property-size').val()) {
          errorMsg.push("Property size cannot be blank");
          $('#property_size').addClass('error-input');
  
        }

        if (!$('#property-sale-price').val()) {
          errorMsg.push("Property sale price cannot be blank");
          $('#property-sale-price').addClass('error-input');
  
        }
      } else {
        if (!$('#property-customer-id').val()) {
          errorMsg.push("No property has been selected");
        }
      }
      return errorMsg;
    },
    getPropertyValues: function() {
      var params = {};
      if ($('#property-new-form').hasClass('selected')) {
        $.extend(params, {'street1': $('#property_street1').val(),
                          'street2': $('#property_street2').val(),
                          'city': $('#property_city').val(),
                          'state': $('#property_state').val(),
                          'zip': $('#property_zip').val(),
                          'spaceType': $('#space_type').val(),
                          'salePrice': $('#property-sale-price').val(),
                          'size': $('#property_size').val(),
                          'buyerUse': $('#buyer_use').val(),
                          'attorney': $('#property_attorney').val(),
                          'size': $('#property_size').val()});

      } else {
       $.extend(params, {'propertyId': $('#property-id').val()});
      }
      return params;
    }
  });
});
