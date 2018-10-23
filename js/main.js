$(function() {
  var $ignoreButton = $('.ignore'),
      $startReadingButton = $('.start-reading');

  // Smooth scrolling on anchor links (JOAO QUERY)
  /*
  $(".scroll").click(function(e){     
    e.preventDefault();
    $('html, body, .container').animate({
      scrollTop: $(this.hash).offset().top
    }, 500);
  });
  */

  // Smooth scrolling on anchor links (NATIVE HIGH TECH)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  $('#name').on('keyup', function() {
    if ($(this).val().trim()) {
      $ignoreButton.addClass('hidden');
      $startReadingButton.removeClass('hidden');
    } else {
      $ignoreButton.removeClass('hidden');
      $startReadingButton.addClass('hidden');
    }
  });

  $(document).on('scroll', function() {
    var actualScroll = $(this).scrollTop();
    
    $('.poem .part').each(function() {
      var partPoemPositionTop = $(this).position().top,
          partPoemPositionBottom = partPoemPositionTop + $(this).height();

      if (actualScroll > partPoemPositionTop) {
        $(this).addClass('show');
      } else {
        $(this).removeClass('show');
      }
    });
  });


});