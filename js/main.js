$(function() {
  var $ignoreButton = $('.ignore'),
      $startReadingButton = $('.start-reading'),
      $satieN1Iframe = $('#iframe-satie-n1'),
      $satieN3Iframe = $('#iframe-satie-n3');

  if ($satieN1Iframe.length > 0) {
    $satieN1Iframe.on('load', function() {
      $satieN1Iframe.contents().find('video').get(0).loop = true;
    });
  }

  if ($satieN3Iframe.length > 0) {
    $satieN3Iframe.on('load', function() {
      $satieN3Iframe.contents().find('video').get(0).loop = true;
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  $('.sound').on('click', function(e) {
    e.preventDefault();

    if ($satieN1Iframe.length) {
      $satieN1Iframe.contents().find('video').get(0).paused ? $satieN1Iframe.contents().find('video').get(0).play() : $satieN1Iframe.contents().find('video').get(0).pause();
    }

    if ($satieN3Iframe.length) {
      $satieN3Iframe.contents().find('video').get(0).paused ? $satieN3Iframe.contents().find('video').get(0).play() : $satieN3Iframe.contents().find('video').get(0).pause();
    }
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
