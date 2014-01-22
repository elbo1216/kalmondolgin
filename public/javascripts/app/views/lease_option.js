define(['jquery', 'underscore', 'backbone', 'app/views/baseview'], function($, _, Backbone) {
  LeaseOptionsView = BaseViewForm.extend({
    initialize: function() {
      $('#options_begin').datepicker({dateFormat: "yy-mm-dd"});
    },
    getValues: function() {
      var ret = {};
      if ($('[name="options"]').val() == 'yes') {
        ret['optionCount'] = $('#option_count').val();
        ret['beginDate'] = $('#option_begin').val(); 
      }

      return ret;
    },
    clearForm: function() {
      $('#options-count').val('');
      $('#options-begin').val('');
    }
  });

  LeaseLateChargeView = BaseViewForm.extend({
    getValues: function() {
      var ret = {};
      if ($('[name="late_charges_apply"]').val() == 'yes') {
        ret['lateChargePercent'] = $('#late_charge_per').val();
        ret['lateChargeGracePeriod'] = $('#late_charge_grace_period').val();
      }
      return ret;
    },
    clearForm: function() {
      $('#late-charge-per').val('');
      $('#late-charge-grace-period').val('');
    }
  })
});
