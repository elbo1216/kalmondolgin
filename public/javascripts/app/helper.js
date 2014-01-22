define(['jquery', 'underscore', 'backbone' ], function($, _, Backbone) {
   Helper = {
    createDropDown: function(id, btnTxt, data) {
      var buttonInput = $('<input>').attr('id', id + '-input')
                                    .attr('type', 'hidden');
      var buttonTxt = $('<span>').addClass('button-text')
			   .html(btnTxt);
      var button = $('<button>').addClass('btn')
                                .addClass('btn-default')
                                .addClass('dropdown-toggle')
                                .attr('id', id + '-button')
                                .attr('data-toggle', 'dropdown')
                                 .append(buttonInput)
                                .append(buttonTxt)
                                .append('<span class="caret"></span>')
                                .on('click', function() { $('#' + id + '-list').toggle() });
      var ul = $("<ul>").addClass("dropdown-menu")
                        .attr("id", id + "-list")
                        .attr("role", "menu");
      for(var i=0; i<data.length; i++) {
        var li = $('<li>').attr('id', data[i]['id'])
                          .html(data[i]['name']);
        ul.append(li);
      }
      ul.on('click', 'li', function() { 
        buttonTxt.html($(this).html());
        buttonInput.val($(this).attr('id'));
        $('#' + id + '-list').toggle();
      });

      $('#' + id).html("")
                 .append(button)
                 .append(ul);
    }
  };
})
