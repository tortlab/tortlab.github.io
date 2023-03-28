// Dean Attali / Beautiful Jekyll 2020

var BeautifulJekyllJS = {

  bigImgEl : null,
  numImgs : null,

  init : function() {
    // Shorten the navbar after scrolling a little bit down
    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar").addClass("top-nav-short");
        } else {
            $(".navbar").removeClass("top-nav-short");
        }
    });

    // On mobile, hide the avatar when expanding the navbar menu
    $('#main-navbar').on('show.bs.collapse', function () {
      $(".navbar").addClass("top-nav-expanded");
    });
    $('#main-navbar').on('hidden.bs.collapse', function () {
      $(".navbar").removeClass("top-nav-expanded");
    });

    // show the big header image
    BeautifulJekyllJS.initImgs();
  },

  initImgs : function() {
    // If the page was large images to randomly select from, choose an image
    if ($("#header-big-imgs").length > 0) {
      BeautifulJekyllJS.bigImgEl = $("#header-big-imgs");
      BeautifulJekyllJS.numImgs = BeautifulJekyllJS.bigImgEl.attr("data-num-img");

      // 2fc73a3a967e97599c9763d05e564189
      // set an initial image
      var imgInfo = BeautifulJekyllJS.getImgInfo();
      var src = imgInfo.src;
      var desc = imgInfo.desc;
      BeautifulJekyllJS.setImg(src, desc);

      // For better UX, prefetch the next image so that it will already be loaded when we want to show it
      var getNextImg = function() {
        var imgInfo = BeautifulJekyllJS.getImgInfo();
        var src = imgInfo.src;
        var desc = imgInfo.desc;

        var prefetchImg = new Image();
        prefetchImg.src = src;
        // if I want to do something once the image is ready: `prefetchImg.onload = function(){}`

        setTimeout(function(){
          var img = $("<div></div>").addClass("big-img-transition").css("background-image", 'url(' + src + ')');
          $(".intro-header.big-img").prepend(img);
          setTimeout(function(){ img.css("opacity", "1"); }, 50);

          // after the animation of fading in the new image is done, prefetch the next one
          //img.one("transitioned webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
          setTimeout(function() {
            BeautifulJekyllJS.setImg(src, desc);
            img.remove();
            getNextImg();
          }, 1000);
          //});
        }, 6000);
      };

      // If there are multiple images, cycle through them
      if (BeautifulJekyllJS.numImgs > 1) {
        getNextImg();
      }
    }
  },

  getImgInfo : function() {
    var randNum = Math.floor((Math.random() * BeautifulJekyllJS.numImgs) + 1);
    var src = BeautifulJekyllJS.bigImgEl.attr("data-img-src-" + randNum);
    var desc = BeautifulJekyllJS.bigImgEl.attr("data-img-desc-" + randNum);

    return {
      src : src,
      desc : desc
    }
  },

  setImg : function(src, desc) {
    $(".intro-header.big-img").css("background-image", 'url(' + src + ')');
    if (typeof desc !== typeof undefined && desc !== false) {
      $(".img-desc").text(desc).show();
    } else {
      $(".img-desc").hide();
    }
  }
};

$(document).ready(function() {
  // Find the offset of the carousel
  var carouselOffset = $('.carousel').offset().top;

  // Check if user has scrolled down past the carousel on page load
  if ($(window).scrollTop() > carouselOffset) {
    $('.navbar-custom').addClass('scrolled');
  }
  
  // Add or remove "scrolled" class based on user scrolling behavior
  $(window).scroll(function() {
    if ($(this).scrollTop() > carouselOffset) {
      $('.navbar-custom').addClass('scrolled');
    } else {
      $('.navbar-custom').removeClass('scrolled');
    }
  });

  if (window.location.href.includes('people')) {
    // get the navbar element
    var navbar = document.querySelector('.navbar-custom');
  
    // get the carousel element
    var carousel = document.querySelector('.carousel');
  
    // add an event listener to the window object to detect scrolling
    window.addEventListener('scroll', function() {
      // check if the user has scrolled past the carousel
      if (window.scrollY >= carousel.offsetHeight) {
        // if the user has scrolled past the carousel, show the navbar
        navbar.classList.remove('hide');
      } else {
        // if the user has not scrolled past the carousel, hide the navbar
        navbar.classList.add('hide');
      }
    });
  
    // hide the navbar when the page loads
    navbar.classList.add('hide');
  }
  
});



// 2fc73a3a967e97599c9763d05e564189

document.addEventListener('DOMContentLoaded', BeautifulJekyllJS.init);
