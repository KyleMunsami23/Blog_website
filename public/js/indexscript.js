$(".post-wrapper").slick({
  slidesToShow: 3, // Displays 3 slides at a time
  slidesToScroll: 1, // Scrolls 1 slide at a time
  autoplay: true, // Enables autoplay
  autoplaySpeed: 2000, // Sets the autoplay speed to 2000 milliseconds (2 seconds)
  nextArrow: $(".next"),
  prevArrow: $(".prev"),
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ],
});



let mybutton = document.getElementById("scrollToTopBtn");
window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
};

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // Smooth scrolling
  });
}

