
var windowHeight = $(window).height();
var frameHeight = windowHeight - 65;
var totalHeight = $(document).height();


/*---------------------darkmode---------------*/

let theme = localStorage.getItem("dark-theme");
const navMode = document.querySelector(".nav-mode-container");

const darkTheme = () => {
 
  document.documentElement.setAttribute("data-theme", "dark");
  localStorage.setItem("dark-theme", "dark");
  document.body.classList.remove("light");
  document.body.classList.add("dark");
  console.log("it's dark, baby");
};

const lightTheme = () => {
  document.documentElement.setAttribute("data-theme", "light");
  localStorage.setItem("dark-theme", "light");
  document.body.classList.remove("dark");
  document.body.classList.add("light");
  console.log("It's light, baby");
};

if (theme === "dark") {
  darkTheme();
}

if (theme === "light") {
  lightTheme();
}

navMode.addEventListener("change", () => {
  let theme = localStorage.getItem("dark-theme");
  if (theme === "dark") {
    lightTheme();
  } else {
    darkTheme();
  }
});


/*-------------nav page---------------*/

var navPage = $('body #nav-page');
var navLink = $('body #nav-page .nav-link a');

$(".nav-icon").click(function() {
  if ($(this).hasClass("change") || $("body").hasClass("nav-page--open")) {
    navLink.addClass('slide-top').removeClass('slide-bottom'); 
    $("body").removeClass("nav-page--open");
    navPage.delay(1000).fadeOut(1000);
    $("body, html").css("overflow", "auto");
    $(".nav-icon").removeClass("change");
  } else {
    $(".nav-icon").addClass("change");
    navPage.fadeIn();
    $("body").addClass("nav-page--open");
    $("body, html").css("overflow", "hidden");
    navLink.delay(1000).addClass('slide-bottom').removeClass('slide-top');
  }
});


/*-------------nav page links---------------*/


navLink.click(function() {
  navLink.removeClass("current");
  $(this).addClass("current");
  navLink.addClass('slide-top').removeClass('slide-bottom'); 
  $("body").removeClass("nav-page--open");
  navPage.delay(1000).fadeOut(1000);
  $("body, html").css("overflow", "auto");
  $(".nav-icon").removeClass("change");
});

//------------------- back to top ring calculations -------------------//

var circle = document.querySelector("circle");
var radius = circle.r.baseVal.value;
var circumference = radius * 2 * Math.PI;
var area = radius * radius * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;


/*------------- transform "header-text" to "page-title" in nav-bar---------------*/


$(document).ready(function() {

  $("footer").css("display", "none");
  $(".footer-text").css("display", "none");

  $(window).scroll(function() {
    var scrollHeight = $(this).scrollTop();
    var windowHeight = $(window).height();
    var totalHeight = $(document).height();

    $(".scrolled").html(scrollHeight);

    $(".nav-bar input").attr("value", scrollHeight);

    const input = document.querySelector(".nav-bar input");
    if (input.value < totalHeight && input.value > 0) {
      setProgress(input.value);
    }

    

    function setProgress(percent) {
      var offset =
        circumference -
        (scrollHeight * circumference) / (totalHeight - windowHeight);
      circle.style.strokeDashoffset = offset;
      console.log(offset);
      if (offset <= 3) {
        $("footer").fadeIn();
        $(".footer-text").fadeIn();
      } else {
       
        $("footer").fadeOut();
        $(".footer-text").fadeOut();
      }
    }

    /*------------- ring opacity with page scroll ---------------*/

   

    if (scrollHeight >= frameHeight) {
      $(".page-title").css("opacity", "1");
      // $(".up-arrow").fadeIn();
      $("#back2Top .ring").fadeIn();
    } else {
      $(".page-title").css("opacity", "0");
      // $(".up-arrow").fadeOut();
      $("#back2Top .ring").fadeOut();
    }

    /*-------------header-text scrolling letters ---------------*/

    var dyScroll = 0.05 * scrollHeight;

    if (scrollHeight > 0 && scrollHeight < frameHeight) {
      $(".header-text span:first-child").css(
        "transform",
        "translateY(" + -6 * dyScroll + "px)"
      );

      $(".header-text span:nth-child(2)").css(
        "transform",
        "translateY(" + -10 * dyScroll + "px)"
      );

      $(".header-text span:nth-child(3)").css(
        "transform",
        "translateY(" + -7 * dyScroll + "px)"
      );

      $(".header-text span:nth-child(4)").css(
        "transform",
        "translateY(" + -4 * dyScroll + "px)"
      );

      $(".header-text span:nth-child(5)").css(
        "transform",
        "translateY(" + -6 * dyScroll + "px)"
      );

      $(".header-text span:nth-child(6)").css(
        "transform",
        "translateY(" + -10 * dyScroll + "px)"
      );

      $(".header-text span:nth-child(7)").css(
        "transform",
        "translateY(" + -10 * dyScroll + "px)"
      );

      $(".header-text span:nth-child(8)").css(
        "transform",
        "translateY(" + -7 * dyScroll + "px)"
      );

      $(".header-text span:nth-child(9)").css(
        "transform",
        "translateY(" + -4 * dyScroll + "px)"
      );

      $(".header-text span:nth-child(10)").css(
        "transform",
        "translateY(" + -6 * dyScroll + "px)"
      );
    } else {
      $(".header-text span").css("transform", "translateY(" + 0 + ")");
    }
  });
});



/*------------- back to top button function ---------------*/

$(document).ready(function() {
  $("#back2Top").click(function(event) {
   
      event.preventDefault();

      $("html, body").animate(
        {
          scrollTop: 0
        },
        2000
      );
  });
});

// ---------------------------scroll down button -------------------------

$(function() {
  // $('a[href*=#]').on('click', function(e) {
    $('#scroll').on('click', function(e) {
  e.preventDefault();
    $('html, body').animate({ 
      
      scrollTop: frameHeight
    
    }, 2000, 'linear');
  });
});




var customLink = document.querySelectorAll(".custom-link");
var projectLink = document.querySelectorAll(".project");
var cursor = document.getElementById("cursor");
var dot = document.getElementById("dot");
var follower = document.getElementById("follower");

var cdx = cursor.offsetWidth / 2;
var cdy = cursor.offsetHeight / 2;
var ddx = dot.offsetWidth / 2;
var ddy = dot.offsetHeight / 2;
var fdx = follower.offsetWidth / 2;
var fdy = follower.offsetHeight / 2;

window.addEventListener("mousemove", function (event) {
	handleMouseMove(event);
});

function handleMouseMove(e) {
	var x = e.clientX;
	var y = e.clientY;


	cursor.style.left = x - cdx + "px";
	cursor.style.top = y - cdy + "px";
	dot.style.left = x - ddx + "px";
	dot.style.top = y - ddy + "px";
	follower.style.left = x - fdx + "px";
	follower.style.top = y - fdy + "px";
}

customLink.forEach((item) => {


	item.addEventListener("mouseover", () => {
		// console.log(itemWidth, itemHeight);
		cursor.classList.add("hover");
		// follower.classList.add("blink");
		// dot.classList.add("blink");
	});

	item.addEventListener("mouseleave", () => {
		cursor.classList.remove("hover");
	});
});

projectLink.forEach((item) => {

  var timeout;

	item.addEventListener("mouseover", () => {
		// console.log(itemWidth, itemHeight);
		cursor.classList.add("preview");
    clearTimeout(timeout);
  timeout = setTimeout(function(){

    cursor.classList.add("blink");
    
  }, 30000);

	});

	item.addEventListener("mouseleave", () => {
		cursor.classList.remove("preview");
    cursor.classList.remove("blink");
	});
});

document.addEventListener("mousedown", () => {
	  cursor.classList.add("click");

});

document.addEventListener("mouseup", () => {
	cursor.classList.remove("click");


});

