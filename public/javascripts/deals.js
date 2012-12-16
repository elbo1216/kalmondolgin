$(document).ready(function() {
  var form = document.URL.split("/")[4];

  // Get selected subnav
  $('.sub-nav-deals li').each(function(index, li) {
    $($(li).attr('class').split(' ')).each(function(index, clazz) {
      if (clazz == 'subnav-selected') {
        $(li).removeClass(clazz);
      }
    });
    if ($(li).attr('id') == form) {
      $(li).addClass('subnav-selected');
    }
  });

  $('#add-payment-row').click(function() {
    var tr = $('<tr>')
        .append($('<td>').html("<input type=text class='medium-input'>"))
        .append($('<td>').html("<input type=text class='medium-input'>"))
        .append($('<td>').html("<input type=text class='medium-input'>"))
        .append($('<td>').html("<input type=text class='medium-input'>"));
    $('#payment-schedule-table tbody').append(tr);
  });
});
