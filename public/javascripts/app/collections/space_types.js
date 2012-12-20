define(['jquery', 'underscore', 'backbone', 'app/models/space_type'], function($, _, Backbone) {
    SpaceTypes = Backbone.Collection.extend({
      model: SpaceType,
      url: '/deals/get_all_space_types',
      optionList: function() {
        var optionList = new Array();
        for(var i=0; i<this.models.length; i++) {
          optionList.push("<option value='" + this.models[i].get('key') + "'>" + this.models[i].get('name') + "</option>");
        }
        return optionList;
      },
    })
})
