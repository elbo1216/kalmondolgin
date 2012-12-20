require.config({
  baseUrl: "/javascripts",
  paths: {
    jquery: "lib/jquery-1.9.1",
    underscore: "lib/underscore.1.4.3",
    backbone: "lib/Backbone.0.9.9",
    datatables: "lib/jquery.dataTables"
  },
  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});

require([
  'jquery',
  'underscore',
  'backbone',
  'app/app',
], function($, _, Backbone, App){
  App.initialize();
});
