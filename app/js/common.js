$(function () {
  /*
   * Replace all SVG images with inline SVG
   */

  function imgToSVG(th) {
    var $img = jQuery(th);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    $.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');

      // Add replaced image's ID to the new SVG
      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');

      // Replace image with new SVG
      $img.replaceWith($svg);

    }, 'xml');
  }

  $('img[src$=svg]').each(function () {
    imgToSVG(this);
  });
});

$(document).ready(function () {
  //owl
  $('.travel').owlCarousel({
    /*stagePadding: 325,*/
    loop: true,
    margin: 200,
    autoWidth: true,
    center: true,
    nav: true,
    dots: false,
    items: 1,
    responsive: {
      1440: {
        margin: 125
      }
    }
  });
  var reviewsCarouselTimeout;
  $('.reviews-carousel').owlCarousel({
    loop: true,
    margin: 95,
    autoWidth: true,
    center: true,
    nav: true,
    dots: true,
    items: 1,
    onChange: function (e) {
      var items = $(e.target).find('.owl-item.center');
      $(items).each(function() {
        if ($(this).find('.txt .extended').css('display') !== 'none') {
          $(this).find('.txt-toggle').trigger('click');
        }
      });
      $(e.target).css('height', 'auto').equalHeights();
      clearTimeout(reviewsCarouselTimeout);
    },
    onChanged: function (e) {
      reviewsCarouselTimeout = setTimeout(function() {
        $(e.target).css('height', 'auto');
      }, 300);
    }
  });
  $('.owl-carousel .owl-nav button').html("<img src='../img/next-arrow.svg' alt=''>");

  setTimeout(function () {
    $('.section-advantages .gallery-wrap .title').each(function () {
      // contains 3 lines
      if ($(this).innerHeight() / 3 + 'px' === $(this).css('font-size')) {
        // margin-top must be -42px for title height=66px
        $(this).css({marginTop: -$(this).innerHeight() * 42 / 66 + 'px', paddingLeft: '40px', paddingRight: '40px'})
      } else {
        // just one line
        if ($(this).innerHeight() + 'px' === $(this).css('font-size')) {
          $(this).css({lineHeight: 31 / 22})
        }
        // trasform: translateY(-50%), isn't really moving item position(just visually), so we're translating manually
        $(this).css({marginTop: -Math.floor($(this).innerHeight() / 2) + 'px'})
      }
    });
    // $('.section-advantages .gallery-wrap .item').css('height', 'auto').equalHeights();
  }, 200);

  $('.reviews-carousel .txt-toggle').on('click', function (e) {
    e.preventDefault();
    var wrapper = $(this).closest('.item');
    if (!wrapper.closest('.owl-item').hasClass('center')) return false;
    wrapper.find('.txt .extended').slideToggle();
    var newText = $(this).data('toggled-text');
    $(this).data('toggled-text', $(this).html());
    $(this).html(newText);
  });

  $('.menu-toggle').on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('#mobile-menu').toggleClass('active');
  });

  function onResize() {

    $('.section-unique .item').each(function() {
      $(this).removeClass('long-text');
      var inner = $(this).find('.item-inner');
      var title = inner.find('.title');
      var desc = inner.find('.desc');
      if (inner.position().top + title.outerHeight(true) + desc.outerHeight(true) > $(this).height()) {
        $(this).addClass('long-text');
      }
    });

    if ($(window).width() <= 768) {
      $('*[data-tablet]').each(function() {
        var currentValue = $(this).attr('style');
        var defaultValue = $(this).data('desktop');
        var newValue = $(this).data('tablet');
        if (!defaultValue && currentValue) {
          $(this).data('desktop', currentValue);
        }
        if (currentValue !== newValue)
          $(this).attr('style', newValue);
      });
    } else if ($(window).width() <= 576) {
      $('*[data-mobile]').each(function() {
        var currentValue = $(this).attr('style');
        var defaultValue = $(this).data('desktop');
        var newValue = $(this).data('mobile');
        if (!defaultValue && currentValue) {
          $(this).data('desktop', currentValue);
        }
        if (newValue && currentValue !== newValue)
          $(this).attr('style', newValue);
      });
    } else {
      $('#mobile-menu, .menu-toggle').removeClass('active');
      $('*[data-tablet], *[data-mobile]').each(function() {
        var currentValue = $(this).attr('style');
        var newValue = $(this).data('desktop');
        if (newValue && currentValue !== newValue)
          $(this).attr('style', newValue);
      });
    }
  }

  function sliderIndia() {
    $('.slide-india.owl-carousel .owl-nav button').html("");
    var slide = $('.slide-india');
    slide.owlCarousel({
      loop: false,
      mouseDrag: true,
      touchDrag: true,
      navigation : true, // Show next and prev buttons
      dots: false,
      slideSpeed : 300,
      paginationSpeed : 300,
      dragEndSpeed: 300,
      singleItem: true,
      items: 1,
      nav: true,
      navText: ["Назад","Далее"],
    });
  }
  function custoSelect() {

    var selects = $('.custom-select');
    var label = $('.custom-select__wrap label');
    selects.on('click', function (e) {
      $(this).toggleClass('active');
    });

    label.on('click', function (e) {
      var text = $(this).text();
      $(this).parents('.custom-select').find('.custom-select__text').text(text);
    });

    $(document).on('mouseup', function(e){
      var p = $(".custom-select");
      if (!p.is(e.target) && p.has(e.target).length === 0) {
        selects.removeClass('active');
      }
    });
  }

  function india_tours() {
    var slide_1 = $('.travel-sliders--first .travel-slide__img');
    var slide_2 = $('.travel-sliders--second .travel-slide__img');
    var set = {
      margin: 15,
      loop: false,
      mouseDrag: true,
      touchDrag: true,
      navigation : true, // Show next and prev buttons
      dots: true,
      slideSpeed : 300,
      paginationSpeed : 300,
      dragEndSpeed: 300,
      singleItem: true,
      items: 1,
      nav: false,
    };
    slide_1.owlCarousel(set);
    slide_2.owlCarousel(set);
  }

  $('.scroll--india').on("click", function(e){
    var destination = $("#scroll-india").offset().top;
    $('html').animate({
      scrollTop: destination}, 1000);
  });

  $(document).ready(function() {
    if($(window).width() > 992) {
      var imagesHeight = $('.travel-slide').height();
      $('.travel-slide .owl-carousel .owl-item img').css('height', imagesHeight);
    }
  });
  sliderIndia();
  india_tours();
  onResize();
  custoSelect();
  $(window).on('resize', onResize);

});

