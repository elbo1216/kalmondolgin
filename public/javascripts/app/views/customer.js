define(['jquery', 'underscore', 'backbone', 'app/collections/customers'], function($, _, Backbone) {
  CustomerView = Backbone.View.extend({
    initialize: function(options) {
      var view = this;
      var formType = '#' + options.formType;
      $(formType + '-principal-link').click(function() {
        view.addPrincipalForm();
      });

      $(formType + '-selected-principal-link').click(function() {
        view.addPrincipalForm();
      });

      $(formType + '-new-form').click(function() {
        $(formType + '-search').hide();
        $(formType + '-new').show();
        $(formType + '-new-form').addClass('selected');
        $(formType + '-search-form').removeClass('selected');
      });

      $(formType + '-search-form').click(function() {
        $(formType + '-search').show();
        $(formType + '-new').hide();
        $(formType + '-new-form').removeClass('selected');
        $(formType + '-search-form').addClass('selected');
      });

      $(formType + '-search-button').click(function() {
        var table = $(formType + '-search-results-table');
        var cList = new CustomerList();
        table.hide();
        $(formType + '-search-wait').show();
        cList.fetch({data : {customer_name: $(formType +'-search-text').val()},
                      success: function(collection, response, options) {
                        var tbody = $(table.find("tbody"));
                        tbody.html("");
                        collection.each(function(model) {
                          var tr = $('<tr>').addClass('results-row')
                                            .append('<td>' + model.get('first_name') + '</td>')
                                            .append('<td>' + model.get('last_name') + '</td>')
                                            .append('<td>' + model.get('zip') + '</td>')
                                            .click(function() {
                                                $(formType + '-customer-id').val(model.get('id'));
                                                $(formType + '-selected-first-name').html(model.get('first_name'));
                                                $(formType + '-selected-last-name').html(model.get('last_name'));
                                                $(formType + '-selected-company').html(model.get('company'));
                                                $(formType + '-selected-street1').html(model.get('street_line1'));
                                                $(formType + '-selected-street2').html(model.get('street_line2'));
                                                $(formType + '-selected-city').html(model.get('city'));
                                                $(formType + '-selected-state').html(model.get('state'));
                                                $(formType + '-selected-zip').html(model.get('zip'));
                                                $(formType + '-selected-country').html(model.get('country'));
                                                $(formType + '-selected-customer').fadeIn(); 
                                            });
                          tbody.append(tr);
                        })

                        $(formType +'-search-wait').fadeOut(400, function() {
                          table.fadeIn();
                        });
                      }});
      });
    },
    addPrincipalForm: function() {
      var formType = this.options['formType'];
      var selected = "";
      if ($('#' + formType + '-search-form').hasClass('selected')) {
        selected = "-selected";
      }
      var index = $('#' +  formType + selected + '-principal-form').find('ul').length + 1;
      var list = $('<ul>').attr("id", formType + selected + '-principal-' + index)
                          .css('display', 'none')
                          .addClass('principal');
      list.append($('<li>')
                      .append($('<span>').addClass('title')
                                       .html('Principal ' + index))
                      .append($('<span>').addClass('close')
                                       .attr('id', 'principal-close-' + index)
                                       .html("&#10006;")
                                       .click(function() {
                                         $('#' + formType + selected + '-principal-' + index).fadeOut(400, function() {
                                            $('#' + formType + selected + '-principal-' + index).remove();
                                          });
                                        }))
                      .append($('<div>').addClass('clear')))
          .append($('<li>')
                      .append($('<span>').addClass('input-label')
                                         .html('Name: '))
                      .append($('<input>').addClass('long-input')
                                          .attr('id', formType + selected + '-principal'+index)
                                          .attr('type', 'input'))
                 )
          .append($('<li>')
                      .append($('<span>').addClass('input-label')
                                         .html('Email: '))
                      .append($('<input>').addClass('medium-input')
                                          .attr('id', formType + selected + '-principal-email'+index)
                                          .attr('type', 'input')
                                          .css('margin-right', '12px'))
                      .append($('<span>').addClass('input-label')
                                         .html('Phone: '))
                      .append($('<input>').addClass('medium-input')
                                        .attr('id', formType + selected + '-principal-phone'+index)
                                        .attr('type', 'input'))
                 );
  
      $('#' + formType + selected + '-principal-form').append(list);
      list.fadeIn(400);
    },
    validateForm: function() {
      var formType = '#' + this.options['formType'];
      var errorMsg = [];
      //Validate values here
      if ($(formType + '-new-form').hasClass('selected')) {
        // Either Name or Company must be valid
        if((!$(formType + '-first-name').val() && !$(formType + '-last-name').val()) || !$(formType + '-company').val()) {
          if(!($(formType + '-company').val() &&
               $(formType + '-first-name').val() &&
               $(formType + '-last-name').val())) {
            errorMsg.push("Enter a Name or Company")
            $(formType + '-last-name').addClass('error-input');
            $(formType + '-first-name').addClass('error-input');
            $(formType + '-company-name').addClass('error-input');
          } else {
            if(!$(formType + '-first-name').val()) {
              errorMsg.push("First name cannot be blank")
              $(formType + '-first-name').addClass('error-input');
            }
    
            if(!$(formType + '-last-name').val()) {
              errorMsg.push("Last name cannot be blank")
              $(formType + '-last-name').addClass('error-input');
            }
          }
        }
  
        // Street Address must be valid
        if (!$(formType + '-street1').val()) {
          errorMsg.push("Street 1 cannot be blank")
          $(formType + '-street1').addClass('error-input');
        }
  
        if (!$(formType + '-city').val()) {
          errorMsg.push("City cannot be blank")
          $(formType + '-city').addClass('error-input');
        }
  
        if (!$(formType + '-state').val()) {
          errorMsg.push("State cannot be blank")
          $(formType + '-state').addClass('error-input');
        }
  
        if (!$(formType + '-zip').val()) {
          errorMsg.push("Zip cannot be blank")
          $(formType + '-zip').addClass('error-input');
        }
  
        if (!$(formType + '-attention-new').val()) {
          errorMsg.push("Attention cannot be blank");
          $(formType + '-attention-new').addClass('error-input');
  
        }
      } else {
        if (!$(formType + '-customer-id').val()) {
          errorMsg.push("No Bill Customer has been selected");
        }

        if (!$(formType + '-attention-search').val()) {
          errorMsg.push("Attention cannot be blank");
          $(formType + '-attention-search').addClass('error-input');
        }
      }
      return errorMsg;
    },
    getCustomerValues: function() {
      var formType = this.options['formType'];
      var params = {};
      if ($('#' + formType + '-new-form').hasClass('selected')) {
        $.extend(params, {'first_name': $('#' + formType + '-first-name').val(),
                    'lastr_ame': $('#' + formType + '-last-name').val(),
                    'company': $('#' + formType + '-company').val(),
                    'street_line1': $('#' + formType + '-street1').val(),
                    'street_line2': $('#' + formType + '-street2').val(),
                    'city': $('#' + formType + '-city').val(),
                    'state': $('#' + formType + '-state').val(),
                    'zip': $('#' + formType + '-zip').val(),
                    'country': $('#' + formType + '-country').val()});

        $.extend(params, {'attention': $('#' + formType + '-attention-new').val()});
      } else {
       var key = formType + 'CustomerId';
       $.extend(params, {key: $('#' + formType + '-customer-id').val()});
        $.extend(params, {'attention': $('#' + formType + '-attention-search').val()});
      }

      var principals = new Array();
      var selected = "";
      if ($('#' + formType + '-search-form').hasClass('selected')) {
        selected = '-selected';
      }
      $('#' + formType + selected + '-principal-form ul').each(function(index, obj) {
        index++;
        principals.push({'principalName':$('#' + formType + selected + '-principal' + index).val(),
        'principalEmail' : $('#' + formType + selected + '-principal-email' + index).val(),
        'principalPhone': $('#' + formType + selected +  '-principal-phone' + index).val()});
      });
        $.extend(params, {'principals' : principals});
      return params; 
    }
  });
  

});
