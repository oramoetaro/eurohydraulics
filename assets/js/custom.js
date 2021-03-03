$(document).ready(function () {

  'use strict';

  const analyticsId = "UA-91704922-1";
  const recaptchaSiteKey = "6Leh7s0UAAAAAKYppl9nk1ZUdi1DimyEj049GaMS";

  const $document = $(document);
  const $header = $("header");

  //--------------------------
  // Universal Analytics Code 
  //--------------------------

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', analyticsId);

  //-------------------------------------
  // Building Products Section
  //-------------------------------------

  (function () {
    categories.forEach(function (category, i) {
      const html = `<option value=${i}>${category}</option>`;
      $('#categories').append(html);
    });

    let category = $('#categories option')
      .filter(':selected').text();

    window.onload = function () {
      showProducts(category);
    }

    $('#categories').on('change', function (e) {
      console.log('Categoría cambiada')
      const category = $('#categories option')
      .filter(':selected').text();
      showProducts(category);
    });

  })();

  //-------------------------------------
  // Pagination for Products Section
  //-------------------------------------

  function showProducts(category) {

    const data = products.filter((product) =>
      product.category == category
    );

    const template = function (data) {
      let html = '';
      data.forEach(function (product) {
        html += `<div class="col mb-4"><div class=card>`;
        html += `<img src=assets/img/products/${product.img}.png `;
        html += `class=card-img-top alt=${product.title}>`;
        html += `<div class=card-body>`;
        html += `<h6 class=card-title>${product.title}</h6>`;
        html += `<div class="card-text small">${product.description}`;
        html += `</div></div></div></div>`;
      });
      return html;
    };

    $('.pagination-container').pagination({
      dataSource: data,
      ulClassName: 'pagination justify-content-end',
      pageSize: 8,
      callback: function (data, pagination) {
        var html = template(data);
        $('#products').html(html);
        $('[class^=paginationjs] a').addClass('page-link');
      }
    });
  }

  //-------------------------------------
  // Animation for Float Contact Buttons 
  //-------------------------------------

  (function () {
    setTimeout(function () {
      $(".float-contact").removeClass("d-none")
        .addClass("animated shake")
    }, 4000)
  })();

  //-------------------------
  // Whatsapp Button Handler
  //-------------------------

  (function () {
    $(".whatsapp-btn").click(function (event) {
      event.preventDefault();
      const urlBase = "https://api.whatsapp.com/send";
      const phone = $(this).attr("data-phone");
      const text = $(this).attr("data-text");
      const url = urlBase + "?phone=" + phone + "&text=" + text;

      gtag('event', 'send', {
        'event_category': 'contact',
        'event_label': 'whatsapp'
      });
      location.href = url;
    });
  })();

  //-----------------------
  // Header Style Behavior
  //-----------------------

  (function () {
    const setBackground = function () {
      if ($document.scrollTop()) {
        $header.addClass("bg-dark shadow")
          .removeClass("py-3");
      } else {
        $header.addClass("py-3")
          .removeClass("bg-dark shadow");
      }
    };

    if ($document.width() >= 992) {
      $document.scroll(setBackground)
    }
  })();

  //-------------------------------------
  // Benefit Item Animation
  //-------------------------------------

  (function () {
    $(".benefit-item").mouseover(function () {
      $(this).addClass("animated pulse faster");
    }).mouseout(function () {
      $(this).removeClass("animated pulse faster");
    });
  })();

  //-------------------------------------
  // Gallery Section Carousel
  //-------------------------------------

  (function () {
    $(".owl-gallery").owlCarousel({
      items: 1,
      dots: false,
      nav: true,
      navText: ["Anterior", "Siguiente"],
      responsiveClass: true,
      responsive: {
        480: {
          items: 2,
          margin: 10
        },
        768: {
          items: 3,
          margin: 10
        },
        996: {
          items: 4,
          nav: false,
          margin: 10
        }
      }
    });
  })();

  //-------------------------
  // Internal Links Scroll
  //-------------------------

  (function () {
    $("a.scroll").click(function (event) {
      event.preventDefault();
      var location = $(this.hash).offset().top;
      location -= $("header").height();
      $("html, body").animate({
        scrollTop: location
      }, 800);
    });
  })();

  //-------------------------
  // Photo Gallery Handler
  //-------------------------

  (function () {
    $(".owl-gallery").magnificPopup({
      delegate: "a",
      type: "image",
      gallery: {
        enabled: true
      }
    });
  })();

  //----------------------------------
  // Testimonial Carousel Generator
  //----------------------------------

  (function () {
    $(".owl-testimonial").owlCarousel({
      items: 1,
      nav: false,
      responsiveClass: true,
      responsive: {
        992: {
          items: 2,
          margin: 15
        }
      }
    });
  })();

  //----------------------------
  // Brand Carousel Generator
  //----------------------------

  (function () {
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
  })();

  //------------------------------------
  // Prefilling site name input value
  //------------------------------------

  (function () {
    const title = $("title").text();
    $(".site-input").attr("value", title);
  })();

  //-----------------------------------------
  // Form validation and bootstrap classes
  //-----------------------------------------

  (function () {
    $(".needs-validation").each(function () {
      var $form = $(this);
      var form = this;

      $form.submit(function (event) {
        event.preventDefault();

        grecaptcha.execute(
          recaptchaSiteKey, {
            action: 'submit'
          }
        ).then(function (token) {
          $("#recaptcha-token").val(token);

          if (form.checkValidity() === false) {
            event.stopPropagation();
          } else {
            $.ajax({
              type: "POST",
              url: $form.attr("action"),
              data: $form.serialize()
            }).done(function () {
              $form.trigger("reset")
                .removeClass("was-validated");
              $(".success", $form).show("slow")
                .delay(6000).hide("slow");
              gtag('event', 'send', {
                'event_category': 'contact',
                'event_label': 'form'
              });
            });
          }
          $form.addClass("was-validated");
        });
      });
    });
  })();
});

//----------------------
// Google map generator
//----------------------

function initMap() {
  var wrapper = $("#map");

  if (wrapper.length) {
    var myLatLng = {
      lat: parseFloat(wrapper.attr("data-lat")),
      lng: parseFloat(wrapper.attr("data-lng"))
    };

    var map = new google.maps.Map(
      document.getElementById('map'), {
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
}