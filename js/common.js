// Functions
function hasClass(elem, className) {
  return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}

function addClass(elem, className) {
  if (!hasClass(elem, className)) {
    elem.className += ' ' + className;
  }
}

function removeClass(elem, className) {
  var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
  if (hasClass(elem, className)) {
    while (newClass.indexOf(' ' + className + ' ') >= 0) {
      newClass = newClass.replace(' ' + className + ' ', ' ');
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  }
}

function toggleClass(elem, className) {
  var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
  if (hasClass(elem, className)) {
    while (newClass.indexOf(' ' + className + ' ') >= 0) {
      newClass = newClass.replace(' ' + className + ' ', ' ');
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  } else {
    elem.className += ' ' + className;
  }
}

var fade = {
  fade_in_from: 0,
  fade_out_from: 10,
};

function fadeOut(element) {
  var target = document.getElementById(element);

  if (getComputedStyle(target, '')['opacity'] == 0) return;

  var newSetting = fade.fade_out_from / 10;
  target.style.opacity = newSetting;
  fade.fade_out_from--;

  if (fade.fade_out_from == 0) {
    target.style.opacity = 0;
    target.style.display = 'none';

    clearTimeout(loopTimer);

    fade.fade_out_from = 10;
    return false;
  }
  var loopTimer = setTimeout("fadeOut('" + element + "')", 50);
}

function FadeIn(element) {
  var target = document.getElementById(element);
  if (getComputedStyle(target, '')['opacity'] == 1) return;
  target.style.display = 'block';
  var newSetting = fade.fade_in_from / 10;
  target.style.opacity = newSetting;
  fade.fade_in_from++;

  if (fade.fade_in_from == 10) {
    target.style.opacity = 1;
    clearTimeout(loopTimer);
    fade.fade_in_from = 0;
    return false;
  }
  var loopTimer = setTimeout("fadeIn('" + element + "')", 50);
}

// Code
document.addEventListener('DOMContentLoaded', function() {
  window.onload = function() {
    setTimeout(function() {
      AOS.init({
        once: true,
      });
    }, 0);
  };

  $toggleTopScreen = document.getElementById('toggle-top-screen');
  $topScreen = document.getElementById('top-screen');

  if ($toggleTopScreen !== null) {
    if (!hasClass($toggleTopScreen, 'has-event')) {
      addClass($toggleTopScreen, 'has-event');
      $toggleTopScreen.addEventListener('click', function() {
        $burger = Array.prototype.slice.call(
          document.querySelectorAll('.navigation-toogle'),
        );

        $burger.forEach(function($el) {
          if (hasClass($el, 'active-menu')) {
            removeClass($el, 'active-menu');

            toggleClass($el, 'active');
            if ($topScreen !== null) {
              removeClass($topScreen, 'show');
            }
          }
        });

        toggleClass($topScreen, 'show');
        toggleClass(document.getElementById('nav-burger'), 'active-screen');
        toggleClass(document.getElementById('nav-burger'), 'active');
      });
    }
  }

  $dropdownList = Array.prototype.slice.call(
    document.querySelectorAll('.dropdown'),
  );
  if ($dropdownList.length > 0) {
    $dropdownList.forEach(function($el) {
      if (!hasClass($el, 'has-event')) {
        addClass($el, 'has-event');
        $el.addEventListener('click', function() {
          toggleClass($el, 'dropdown--open');
        });
      }
    });
  }

  window.onclick = function(event) {
    // console.log(event.target.closest('.dropdown'));
    if (event.target.closest('.dropdown') == null) {
      for (var j = 0, len = $dropdownList.length; j < len; j++) {
        removeClass($dropdownList[j],'dropdown--open')
      }
    }
  }


  $burger = Array.prototype.slice.call(
    document.querySelectorAll('.navigation-toogle'),
  );
  if ($burger.length > 0) {
    $burger.forEach(function($el) {
      if (!hasClass($el, 'has-event')) {
        addClass($el, 'has-event');
        $el.addEventListener('click', function() {
          if (!hasClass($el, 'active-screen')) {
            toggleClass($el, 'active-menu');
            toggleClass($el, 'active');
          } else {
            toggleClass($el, 'active-screen');
            toggleClass($el, 'active');
            if ($topScreen !== null) {
              toggleClass($topScreen, 'show');
            }
          }
        });
      }
    });
  }

  $navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.navigation-menu a'),
  );
  if ($navLinks.length > 0) {
    $navLinks.forEach(function($el) {
      if (!hasClass($el, 'has-event')) {
        addClass($el, 'has-event');
        $el.addEventListener('click', function() {
          removeClass(document.getElementById('nav-burger'), 'active');
        });
      }
    });
  }

  if (document.getElementsByClassName('swiper-container').length) {
    var mySwiper = new Swiper('.swiper-container', {
      // Optional parameters
      loop: false,
      speed: 900,
      touchAngle: 50,
      longSwipes: false,
      // shortSwipes: false,
      passiveListeners: true,
      resistance: false,
      // anisition effect. Could be "slide", "fade", "cube", "coverflow" or "flip"
      // effect: 'coverflow',
      // touchAngle: 1,
      on: {
        touchMove: function(e, d) {
          console.log(e);
          /* do something */
        },
      },
    });
  }

  glide = document.querySelectorAll('.js-project-list');
  if (glide.length > 0) {
    glideSlides = document.querySelectorAll('.js-project-list .glide__slide');
    if (glideSlides.length > 0) {
      glideSlides.forEach(function($el, index, arr) {
        $el.addEventListener('click', function() {

          for (var j = 0, len = $dropdownList.length; j < len; j++) {
            removeClass($dropdownList[j],'dropdown--open')
          }

          if (!hasClass($el, 'glide__slide--active')) {
            glide.go('=' + index);
          }
        });
      });
    }

    var glide = new Glide('.js-project-list', {
      type: 'slider',
      rewind: false,
      gap: 25,
      focusAt: 'center',
      perView: 2,
      startAt: 1,
      breakpoints: {
        1600: {
          // peek: 450,
        },
        1440: {
          // peek: 350,
        },
        1360: {
          // peek: 300,
        },
        1200: {
          // peek: 250,
        },
        968: {
          // peek: 150,
        },
        768: {
          perView: 1,
          peek: 0,
        },
      },
    });
    glide.on(['mount.after', 'run'], function() {});
    glide.on('run', function() {
      $currentSlideIndex = glide.index;

      // For this slide
      // $thisSlide = glideSlides[$currentSlideIndex].getElementsByClassName(
      //   'img-responsive',
      // )[0]
      // if ($thisSlide.src !== $thisSlide.dataset.src) {
      //   $thisSlide.src = $thisSlide.dataset.src;
      // }

      // For run to right
      if ($currentSlideIndex + 1 < glideSlides.length) {
        $nextSlideIndex = $currentSlideIndex + 1;
      } else {
        $nextSlideIndex = 0;
      }
      $nextSlide = glideSlides[$nextSlideIndex].getElementsByClassName(
        'img-responsive',
      )[0];

      if ($nextSlide.src !== $nextSlide.dataset.src) {
        $nextSlide.src = $nextSlide.dataset.src;
      }
      // For run to left
      // if ($currentSlideIndex - 1 === -1) {
      //   $prevSlideIndex = glideSlides.length - 1
      // } else {
      //   $prevSlideIndex = $currentSlideIndex - 1;
      // }
      // $prevSlide = glideSlides[$nextSlideIndex].getElementsByClassName(
      //   'img-responsive',
      // )[0];
      //
      // if ($prevSlide.src !== $prevSlide.dataset.src) {
      //   $prevSlide.src = $prevSlide.dataset.src;
      // }
    });
    glide.mount();
  }

  $modalToggle = Array.prototype.slice.call(
    document.querySelectorAll('.js-open-modal'),
  );

  if ($modalToggle.length > 0) {
    $modalToggle.forEach(function($el) {
      if (!hasClass($el, 'has-event')) {
        addClass($el, 'has-event');
        $el.addEventListener('click', function(e) {
          e.preventDefault();

          var $target = $el.dataset.target,
            $modal = document.getElementById($target);
          $close = $modal.getElementsByClassName('close')[0];

          $modal.style.display = 'block';

          $youtubeIframeWrap = Array.prototype.slice.call(
            $modal.querySelectorAll('.js-get-youtube'),
          );
          if ($youtubeIframeWrap.length > 0) {
            $youtubeIframeWrap.forEach(function($el) {
              $url = $el.dataset.youtube;
              $iframe = $el.querySelectorAll('iframe')[0];
              $iframe.src = $url;
            });
          }

          // $close.addEventListener('click', function() {
          //   $modal.style.display = 'none';
          // });

          window.onclick = function(event) {
            if (event.target == $modal) {
              if ($youtubeIframeWrap.length > 0) {
                $youtubeIframeWrap.forEach(function($el) {
                  $url = '';
                  $iframe = $el.querySelectorAll('iframe')[0];
                  $iframe.src = $url;
                });
              }
              $modal.style.display = 'none';
            }
          };
        });
      }
    });
  }

  $contactListToggle = Array.prototype.slice.call(
    document.querySelectorAll('.js-contact-list-toggle'),
  );

  if ($contactListToggle.length > 0) {
    $contactListToggle.forEach(function($el) {
      $el.addEventListener('click', function(e) {
        e.preventDefault();
        // console.log($el.dataset.target);
        $target = document.getElementById($el.dataset.target);
        // console.log($target);
        toggleClass($target, 'c-contact-list--active');
      });
    });
  }

  $glitchList = Array.prototype.slice.call(
    document.querySelectorAll('.glitch'),
  );

  function runGlitchToEnd($el) {
    if (!hasClass($el, 'is-active') && !hasClass($el, 'is-used')) {
      addClass($el, 'is-active');
      var $firstState = $el.dataset.firstimg;
      var $secondState = $el.dataset.secondimg;
      var $thirdState = $el.dataset.thirdimg;

      var $mainImg = $el.querySelector('.glitch__img:first-child');
      setTimeout(function() {
        $mainImg.style.backgroundImage = 'url(' + $secondState + ')';
      }, 250);
      setTimeout(function() {
        $mainImg.style.backgroundImage = 'url(' + $thirdState + ')';
      }, 500);
      // setTimeout(function() {
      //   $mainImg.style.backgroundImage = "url("+$secondState+")"
      // }, 2300);
      // setTimeout(function() {
      //   $mainImg.style.backgroundImage = "url("+$firstState+")"
      // }, 2350);
      setTimeout(function() {
        removeClass($el, 'is-active');
        toggleClass($el, 'is-used');
        if (hasClass($el, 'has-mouseout')) {
          runGlitchToStart($el);
        }
      }, 850);
    }
  }

  function runGlitchToStart($el) {
    if (!hasClass($el, 'is-active') && hasClass($el, 'is-used')) {
      addClass($el, 'is-active');
      var $firstState = $el.dataset.firstimg;
      var $secondState = $el.dataset.secondimg;
      var $thirdState = $el.dataset.thirdimg;

      var $mainImg = $el.querySelector('.glitch__img:first-child');
      setTimeout(function() {
        $mainImg.style.backgroundImage = 'url(' + $secondState + ')';
      }, 250);
      setTimeout(function() {
        $mainImg.style.backgroundImage = 'url(' + $firstState + ')';
      }, 500);
      // setTimeout(function() {
      //   $mainImg.style.backgroundImage = "url("+$secondState+")"
      // }, 2300);
      // setTimeout(function() {
      //   $mainImg.style.backgroundImage = "url("+$firstState+")"
      // }, 2350);
      setTimeout(function() {
        removeClass($el, 'is-active');
        toggleClass($el, 'is-used');
      }, 850);
    }
  }

  if ($glitchList.length > 0) {
    imagesLoaded('.glitch__img', {background: true}, function() {
      $sleep = 500;
      $glitchList.forEach(function($el) {
        setTimeout(function() {
          runGlitchToEnd($el);

          // $el.addEventListener('mouseover', function(e) {
          //   runGlitch($el)
          //   e.preventDefault();
          // });
        }, $sleep);
        $sleep += 1000;
      });

      $sleepReset = 300;
      setTimeout(function() {
        $glitchList.forEach(function($el) {
          setTimeout(function() {
            runGlitchToStart($el);
          }, $sleepReset);
          $sleepReset += 500;
        });
      }, 3500);

      setTimeout(function() {
        $glitchList.forEach(function($el) {
          $el.addEventListener('mouseover', function(e) {
            addClass($el, 'has-mouseover');
            removeClass($el, 'has-mouseout');

            runGlitchToEnd($el);
            e.preventDefault();
          });
          $el.addEventListener('mouseout', function(e) {
            addClass($el, 'has-mouseout');
            removeClass($el, 'has-mouseover');
            runGlitchToStart($el);
            e.preventDefault();
          });
        });
      }, 4000);
    });
  }
});
