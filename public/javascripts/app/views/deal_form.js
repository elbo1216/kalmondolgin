define(['jquery', 
        'underscore', 
        'backbone', 
        'app/collections/brokers', 
        'app/collections/states', 
        'app/collections/space_types', 
        'app/collections/countries'], function($, _, Backbone) {
    // Populate the states drop down
  $(document).ready(function() {
    DealFormView = Backbone.View.extend({
      initialize: function(options) {
      },
      validateForm: function() {
        var errors = [];
        var registeredForms = this.options.registeredForms;
        for(var i=0; i<registeredForms.length; i++) {
          var validate = registeredForms[i].viewObj.validateForm();
          if (validate.length > 0) {
            errors.push({'title': registeredForms[i].title, 'errors': validate});
          }
        }
        return errors;
      },
      submitForm: function(params) {
        var registeredForms = this.options.registeredForms;
        for(var i=0; i<registeredForms.length; i++) {
          var json = {}
          json[registeredForms[i].name] = registeredForms[i].viewObj.getValues();
          $.extend(params, json);
        }
 
        $.ajax({
          url: '/deals/submit',
          data: params,
          type: 'POST',
          success: function(data) {
            if (params['messageContainer'] != undefined) {
            $('#' + params['messageContainer']).removeClass('error-container')
                       .addClass('success-well')
                       .html("The deal has been saved.  Your deal id is " + data.dealId)
                       .show();
            }
          }
        });
      },
      populateStatesOptions: function(ids) {
        var states = new States();
        states.fetch({success: function() {
          for (var i=0; i<ids.length; i++) {
            $('#' + ids[i]).append(states.optionList().join(""));
          }
        }});
      },
      populateCountryOptions: function(ids) {
        //Populate the countries drop down
        var countries = new Countries();
        countries.fetch({success: function() {
          for (var i=0; i<ids.length; i++) {
            $('#' + ids[i]).append(countries.optionList().join(""));  
          }
        }});
      },
      populateSpaceTypeOptions: function(ids) {
        var spaceTypes = new SpaceTypes();
        spaceTypes.fetch({success: function() {
          for (var i=0; i<ids.length; i++) {
            $('#' + ids[i]).append(spaceTypes.optionList().join(""));  
          }
        }});
      },
      populateBrokersOptions: function(ids) {
        var brokers = new Brokers; 
        brokers.fetch({
          success: function (collection, resp, options) {
            for (var i=0; i<ids.length; i++) {
              $('#' + ids[i]).append(brokers.optionList().join(""));  
            }
          },
          error: function() {
          }
        });
      },
      populateErrorMsg: function(div, errorMsg) {
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
        $('#' + div).addClass('error-container')
                               .empty()
                               .append(ul)
                               .show();
      }
    });
  });
});
