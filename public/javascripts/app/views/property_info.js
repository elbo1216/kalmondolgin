define(['jquery', 'underscore', 'backbone', 'app/collections/properties', 'app/views/baseview'], function($, _, Backbone) {
  PropertyView = BaseViewForm.extend({
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
                                              $('#property-selected').show();
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
          $('#property-state').addClass('input-error');
        }
  
        if (!$('#property-zip').val()) {
          errorMsg.push("Property zip cannot be blank")
          $('#property-zip').addClass('input-error');
        }
  
        if (!$('#space-type').val()) {
          errorMsg.push("Space Type cannot be blank");
          $('#space-type').addClass('input-error');
  
        }

        if (!$('#property-size').val()) {
          errorMsg.push("Property size cannot be blank");
          $('#property-size').addClass('input-error');
  
        }

        if (!$('#property-sale-price').val()) {
          errorMsg.push("Property sale price cannot be blank");
          $('#property-sale-price').addClass('input-error');
  
        }
      } else {
        if (!$('#property-id').val()) {
          errorMsg.push("No property has been selected");
        }
      }
      return errorMsg;
    },
    getValues: function() {
      var params = {};
      if ($('#property-new-form').hasClass('selected')) {
        $.extend(params, {'street1': $('#property-street1').val(),
                          'street2': $('#property-street2').val(),
                          'city': $('#property-city').val(),
                          'state': $('#property-state').val(),
                          'zip': $('#property-zip').val(),
                          'spaceType': $('#space-type').val(),
                          'salePrice': $('#property-sale-price').val(),
                          'size': $('#property-size').val(),
                          'buyerUse': $('#buyer-use').val(),
                          'attorney': $('#property-attorney').val(),
                          'size': $('#property-size').val()});

      } else {
       $.extend(params, {'propertyId': $('#property-id').val(),
                          'salePrice': $('#property-selected-sale-price').val(),
                          'size': $('#property-selected-size').val(),
                          'buyerUse': $('#selected-buyer-use').val(),
                          'attorney': $('#property-selected-attorney').val(),
                          'size': $('#property-selected-size').val()});
      }
      return params;
    }
  });
});
