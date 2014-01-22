define(['jquery', 'underscore', 'backbone', 'app/views/baseview'], function($, _, Backbone) {
  MarketingView = BaseViewForm.extend({
    clearForm: function() {
      $('#marketing-info-list input').val('');
    },
    getValues: function() {
      return {
         'kdaSign': $('input[name="kda_sign"]:checked').val(),
         'kdaExclusive': $('input[name="kda_exclusive"]:checked').val(),
         'advertiseType': $('#advertise_type').val(),
         'buyerFind': $('#buyer_find').val(),
         'marketDays': $('#market_days').val(),
         'brokerComments': $('#broker_comments').val()
      };
    },
  });
});
