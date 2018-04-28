(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
           scrollTop: (target.offset().top - 200)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 200
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Scroll reveal calls
  window.sr = ScrollReveal();
  sr.reveal('.sr-icons', {
    duration: 1000,
    scale: 0.3,
    distance: '0px'
  }, 100);
  sr.reveal('.sr-button', {
    duration: 1000,
    delay: 200
  });

})(jQuery); // End of use strict




/* Googlemaps */

(function() {
  var map = new GoogleMaps(document.getElementById('googlemaps'), {
      scrollwheel: false,
      mapTypeControl: true,
      navigationControl: true,
      scaleControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }),
    marker = [],
    $markers = $('.markers').children(),
    infoOptions = {
      directions: true,
      directions_popup: true
    };

  map.setLanguage('it');

  //
  // Loop through markers
  // https://developers.google.com/maps/documentation/javascript/examples/icon-complex?hl=nl
  //
  $markers.each(function(i,el) {
    var $el = $(el),
      latlng = $el.data('latlng').split(','),
      image,
      shape;

    //
    // Custom icon
    //
    if( $el.data('icon') ) {
      var url = $el.data('icon').split('|'),
        imgwidth = ( url[1] ) ? parseInt(url[1]) : 20,
        imgheight = ( url[2] ) ? parseInt(url[2]) : 20;

      image = {
            url: url[0],
            size: new google.maps.Size( imgwidth, imgheight ),
            origin: new google.maps.Point( 0, 0 ),
            anchor: new google.maps.Point( parseInt(imgwidth/2), imgheight )
        };
    }

    //
    // Custom shape
    //
    if( $el.data('iconshape') ) {
      shape = {
            coord: $el.data('iconshape'),
            type: 'poly'
        };
    }

    marker[i] = map.addMarker(
      new map.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1])),
      {
        icon: image,
        shape: shape
      }
    );

    // Info Window
    marker[i].setInfoWindow( $el.html(), infoOptions );
  });

  //
  // With more markers, fit map
  //
  if( $markers.length > 1 ) {
    setTimeout(function()
    {
      map.fittToMarkers();
      //map.setZoom(10);
    },1000);
  }
  //
  // else center map on marker
  //
  else {
    map.setCenter( marker[0].LatLng, 10);
    marker[0].openInfoWindow();
  }
})();
