define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
  BaseForm = Backbone.Model.extend({
    defaults: {
      'errors': {'msg': [], 'fields' : []}
    },
    bindForm: function(containerId) {
      var model = this;
      $('#' + containerId + ' input').each(function(index, obj) {
        model.set($(obj).attr('id'), $(obj).val());
      });

      $('#' + containerId + ' select').each(function(index, obj) {
        model.set($(obj).attr('id'), $(obj).val());
      })
    },
    // This will go and retreive all the values from the elements for each attribute in the
    // model and set it as the second entry in the attribute's array (the first entry is the element's id).
    setAllValues: function() {
      var json = this.toJSON();
      for (var attr in json) {
        this.set(attr, $('#' + attr).val());
      }
    },
    // This will actually clear all of the form values that are linked to this model
    clearFormValues: function() {
      var json = this.toJSON();
      for (var attr in json) {
        $('#' + attr).val("");
      }
    },
  });
});
