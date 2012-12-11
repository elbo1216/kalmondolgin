$(document).ready(function() {
  var scheme = $('#schemes').val();
  $('body').removeClass();
  $('body').addClass(scheme + '-body-schemes');
  var top = $('.top-container');
  top.removeClass();
  top.addClass('top-container');
  top.addClass(scheme + '-top-schemes');

  $('#schemes').change(function(data) {
    $('body').removeClass();
    $('body').addClass($(this).val() + '-body-schemes');
    var top = $('.top-container');
    $(top.attr("class").split(" ")).each(function(index,clazz) {
      if (clazz.indexOf("schemes") != -1) {
        top.removeClass(clazz);
      }
    });
    top.addClass('top-container');
    top.addClass($(this).val() + '-top-schemes');

    var scheme = $(this).val()
/*    $('.main-nav li span').each(function(index, span) {
      $($(span).attr("class").split(" ")).each(function(index,clazz) {
        if (clazz.indexOf("-top-border") != -1) {
          $(span).removeClass(clazz);
        }
      });
      $(span).addClass(scheme + '-top-border');
    })
*/
    if (scheme == 'indigo') {
      $('.logo-container img').attr('src', '/images/logo_white.png')
    } else {
      $('.logo-container img').attr('src', '/images/logo.png')
    }
  })

  $('#schemes').change()

  $('#fonts').change(function(data) {
    var top = $('.top-container');
    $(top.attr("class").split(" ")).each(function(index,clazz) {
      if (clazz.indexOf("fonts") != -1) {
        top.removeClass(clazz);
      }
    });
    top.addClass('top-container');
    top.addClass($(this).val() + '-fonts');
  })
})
