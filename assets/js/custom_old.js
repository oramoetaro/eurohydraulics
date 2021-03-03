// Controls Benefits Icons Hover
var hoverBenefits = function () {
  $('.benefit-item').hover(function () {
    $(this).addClass('animated pulse faster');
  }, function () {
    $(this).removeClass('animated pulse faster');
  });
}

// Whatsapp Float Button
var whatsFloatBtn = function () {
  var phone = $('.whats-float-btn').attr('data-phone');
  if (typeof phone !== 'undefined' && phone !== '' && screen.width < 576) {
    var btn = $('.whats-float-btn');
    var msg = btn.attr('data-message');
    var url = 'https://api.whatsapp.com/send?phone=' + phone + '&text=' + msg;
    sendWhatsapp(btn, url);
    setTimeout(function () {
      btn.removeClass('d-none').addClass('animated shake');
    }, 1000);
  }
}

function sendWhatsapp(btn, url) {
  btn.click(function () {
    gtag('event', 'Contacto por Whatsapp', {
      'event_category': 'contact',
      'event_action': 'open',
      'event_label': 'whatsapp'
    });
    window.location.href = url;
  })
}

// Galería de Imágenes
var imgGallery = function () {
  $(".gallery-container").magnificPopup({
    type: "image",
    delegate: "a",
    gallery: {
      enabled: true,
      preload: [0, 2],
      tPrev: 'Anterior',
      tNext: 'Siguiente',
      tCounter: '<span class="mfp-counter">%curr% de %total%</span>'
    }
  });
};

// Share on Facebook
var shareOnFb = function (e) {
  e.preventDefault();
  var urlBase = "https://www.facebook.com/sharer/sharer.php?u=";
  var url = urlBase + window.location.href;
  var fbmodal = window.open(url, "pop", "width=, height=400, scrollbars=no");
  return false;
}

// Duplicate Main Contact Phone
var dupContactPhone = function () {
  $('.primary-contact').html($('#primary-contact').html());
  $('.secondary-contact').html($('#secondary-contact').html());
};

// Show and hide the menu contact data
var fadeMenuContact = function () {
  var menuContact = $('#menu-contact');
  var headerHeight = $(header).height();
  var screenWidth = window.screen.width;
  $(window).on("scroll", function () {
    var limitHeight = $(window).scrollTop() > headerHeight;
    if (limitHeight && menuContact.hasClass('d-none') && screenWidth > 1024) {
      menuContact.removeClass('d-none').addClass('animated fadeIn');
    }
    if ($(window).scrollTop() == 0) {
      menuContact.addClass('d-none');
    }
  });
};

// Faded bg in even Sections
var bgFade = function () {
  var target = $("section:even").not("#menu");
  target.addClass("bg-light");
};

// Scroll Spy
var scrollSpy = function () {
  $('body').scrollspy({
    target: '#navbarSupportedContent'
  })
};

// Smooth Scroll
var smoothScroll = function () {
  $("a").not("[data-toggle='collapse']").on('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top - $('#menu').height(),
      }, 800);
    }
  });
};

// Background Transparent
var bgForm = function () {
  var bg = $("#formulario").css('background-color');
  var result = "background-color: ";
  result += bg.replace(')', ', 0.6)').replace('rgb', 'rgba');
  result += " !important";
  $("#formulario").attr("style", result);
};

// Brand Carrousel
var brandCarousel = function () {
  $(".owl-brands").owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    items: 1,
    autoWidth: true,
    margin: 30,
    dots: false,
    responsiveClass: true,
    responsive: {
      480: {
        items: 2
      }
    }
  });
};

// Testimonial Carousel
var testimonialCarousel = function () {
  var timeOut = $(".owl-testimonial").attr("data-timeOut");
  $(".owl-testimonial").owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: timeOut,
    autoplayHoverPause: true,
    autoHeight: true,
    items: 1
  });
};

// Conctact Form
var contactForm = function () {
  $("#contactForm").submit(function (event) {
    event.preventDefault();
    var $form = $(this),
      url = $form.attr('action');
    var posting = $.post(url, {
      name: $('#form-name').val(),
      email: $('#form-email').val(),
      phone: $('#form-phone').val(),
      message: $('#form-message').val(),
      title: document.title
    });
    posting.done(function () {
      $("#form-success").removeClass("d-none");
      $form.trigger("reset");
      gtag('event', 'submit', {
        'event_category': 'form',
        'event_label': 'contact'
      });
    });
  });
};

// Location Map
var initMap = function () {
  var location = $('#ubicacion');
  if (location.length) {
    var myLatLng = {
      lat: parseFloat(location.attr("data-map-lat")),
      lng: parseFloat(location.attr("data-map-lng"))
    };

    var map = new google.maps.Map(document.getElementById('ubicacion'), {
      center: myLatLng,
      scrollwheel: false,
      zoom: 15
    });

    var marker = new google.maps.Marker({
      map: map,
      position: myLatLng,
      title: 'Ubicación'
    });
  }
};

// Google Analytics
window.dataLayer = window.dataLayer || [];

function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'UA-91704922-1');

// Call functions when document is ready
$(document).ready(function () {
  fadeMenuContact();
  contactForm();
  bgForm();
  bgFade();
  dupContactPhone();
  brandCarousel();
  testimonialCarousel();
  imgGallery();
  smoothScroll();
  scrollSpy();
  whatsFloatBtn();
  hoverBenefits();
});