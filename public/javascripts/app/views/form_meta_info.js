define(['jquery', 
        'underscore', 
        'backbone', 
        'app/views/broker', 
        'app/views/baseview'
        ], function($, _, Backbone) {
   FormMetaInfo = BaseViewForm.extend({
     initialize: function(options) {
        var mainBroker = new BrokerDropDownView(
                                     {brokerData: options.brokerData, 
                                      el: $('#main-broker'), 
                                      id: 'main-broker', 
                                      buttonText: 'Select a Broker'});
        var otherBroker = new BrokerDropDownView(
                                     {brokerData: options.brokerData, 
                                      el: $('#other-brokers'), 
                                      id: 'other-brokers', 
                                      selectedContainer: 'broker-list',
                                      buttonText: 'Add a Broker'});
        var coBroker = new BrokerDropDownView(
                                     {brokerData: options.coBrokerData, 
                                      el: $('#co-broker'), 
                                      id: 'co-broker', 
                                      buttonText: 'Add a Co-Broker'});
     },
     validateForm: function() {
       // Remove all previous errors
       $('#main-broker-button').removeClass('input-error');
       $('#kda_comm').removeClass('input-error');

       var errorMsg = [];
       $('#main-broker-button').addClass('btn-default');
       $('#co_broker_per').removeClass('input-error');
       
       if(!$('#main-broker-input').val()) {
         errorMsg.push("Broker is required.");
         $('#main-broker-button').addClass('input-error');
         $('#main-broker-button').removeClass('btn-default');
       }

       if($('#co-broker-input').val()) {
         if(!$('#co_broker_per').val()) {
           errorMsg.push("Co-Broker Percentage is required");
           $('#co_broker_per').addClass('input-error');
         }
       }

       if (!$('#kda_comm').val()) {
         errorMsg.push("Total Commission to Kda is required");
         $('#kda_comm').addClass('input-error');
       }
       return errorMsg;
     },
     getValues: function() {
       var params = {};
       params['mainBroker'] = $('#main-broker-input').val();
       params['totalDueToKDA'] = $('#kda_comm').val();
       if ($('#co-broker-input').val()) {
         params['coBroker'] = $('#co-broker-input').val();
         params['coBrokerPer'] = $('#co_broker_per').val();
       }
       $('[name="other-broker-list"]').each(function() {
         if (!params['otherBrokers']) {
           params['otherBrokers'] = Array($(this).attr('id'));
         } else {
           params['otherBrokers'].push($(this).attr('id'));
         }

       })
       return params;
     },
     clearForm: function() {
       $('#deal-info-container input').val('');       
       $('#main-broker-button .button-text').html('Select a Broker');
       $('#co-broker-button .button-text').html('Add a Co-broker');
       $('#other-brokers-button .button-text').html('Add a Broker');
       $('#broker-list').empty();
     }
   });
});
