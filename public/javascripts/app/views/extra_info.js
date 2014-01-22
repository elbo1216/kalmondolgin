define(['jquery', 
        'underscore', 
        'backbone', 
        'app/views/baseview'
        ], function($, _, Backbone) {
   ExtraInfo = BaseViewForm.extend({
    clearForm: function() {
      $('#detailWorkPerformed').html(''),
      $('brokerComments').html('')
    },
    getValues: function() {
      return {
         'detailWorkPerformed' : $('#detailWorkPerformed').html(),
         'brokerComments' : $('brokerComments').html()
      };
    },
   });
})
