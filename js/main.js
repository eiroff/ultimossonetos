$(function() {
  var totalGifsLoaded = 0;
  var gifs = {};
  var totalGifs = $('.gif').length;

  $('.gif').each(function() {
    var gifName = $(this).attr('data-name');
    gifs[gifName] = new SuperGif({
      gif: $(this).get(0),
      loop_mode: false
    });
  });

  for (var gif in gifs) {
    gifs[gif].load(function() {
      totalGifsLoaded++;
      verifyLoadedComplete();
    });

    gifs[gif].load();
  }

  function verifyLoadedComplete() {
    if (totalGifsLoaded === totalGifs) {
      $('.loading').hide();

      for (var gif in gifs) {
        $(gifs[gif].get_canvas()).attr('data-name', gif);
      }

    }
  }

  console.log(gifs);

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
      if ($satieN1Iframe.contents().find('video').get(0).paused) {
        $satieN1Iframe.contents().find('video').get(0).play()
        $('.sound').removeClass('muted');
      } else {
        $satieN1Iframe.contents().find('video').get(0).pause();
        $('.sound').addClass('muted');
      }
    }

    if ($satieN3Iframe.length) {
      if ($satieN3Iframe.contents().find('video').get(0).paused) {
        $satieN3Iframe.contents().find('video').get(0).play();
        $('.sound').removeClass('muted');
      } else {
        $satieN3Iframe.contents().find('video').get(0).pause();
        $('.sound').addClass('muted');
      }
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
        $(this).find('[data-name]').each(function() {
          var gifName = $(this).attr('data-name');

          for (var gif in gifs) {
            if (gifName === gif) {
              gifs[gif].play();
            }
          }

        });

        $(this).addClass('show');
      } else {
        $(this).removeClass('show');
      }
    });
  });
});
