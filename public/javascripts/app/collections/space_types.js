define(['jquery', 'underscore', 'backbone', 'app/models/space_type'], function($, _, Backbone) {
    SpaceTypes = Backbone.Collection.extend({
      model: SpaceType,
      url: '/deals/get_all_space_types',
      spaceTypeList: function() {
        var list = new Array();
        for(var i=0; i<this.models.length; i++) {
          list.push({'id': this.models[i].get('id'), 'name': this.models[i].get('name')});
        }
        return list;
      },
    })
})
