/*! admorsy.github.io-091121 27-11-2021 */

var windowHeight = $(window).height(),
  frameHeight = windowHeight - 65,
  totalHeight = $(document).height();
let theme = localStorage.getItem("dark-theme");
const navMode = document.querySelector(".nav-mode-container"),
  darkTheme = () => {
    document.documentElement.setAttribute("data-theme", "dark"), localStorage.setItem("dark-theme", "dark"), document.body.classList.remove("light"), document.body.classList.add("dark"), console.log("it's dark, baby")
  },
  lightTheme = () => {
    document.documentElement.setAttribute("data-theme", "light"), localStorage.setItem("dark-theme", "light"), document.body.classList.remove("dark"), document.body.classList.add("light"), console.log("It's light, baby")
  };

function ResImg() {
  $(".ik img").each(function () {
    var e = $(this).parent().width(),
      t = $(this).parent().height();
    console.log(e, t);
    var a = $(this).attr("src").split("?")[0];
    console.log(a), newSrc = $(this).parent().hasClass("project") ? a + "?tr=ar-8-5,w-" + e : t < e ? a + "?tr=w-" + e + ",h-" + t : a + "?tr=w-" + t + ",h-" + e, console.log(newSrc), $(this).attr("src", newSrc), console.log($(this).attr("src"))
  })
}
"dark" === theme && darkTheme(), "light" === theme && lightTheme(), navMode.addEventListener("change", () => {
  ("dark" === localStorage.getItem("dark-theme") ? lightTheme : darkTheme)()
}), window.onload = ResImg(), window.addEventListener("resize", ResImg), ResImg();
var navPage = $("#nav-page"),
  navLink = $("#nav-page a");
$(".nav-icon").click(function () {
  $(this).toggleClass("is--active"), $("html").toggleClass("nav-page--open")
});
navLink.click(function () {
  $("html").toggleClass("nav-page--open")
});


var circle = document.querySelector("circle"),
  radius = circle.r.baseVal.value,
  circumference = 2 * radius * Math.PI,
  area = radius * radius * Math.PI;
circle.style.strokeDasharray = circumference + " " + circumference, circle.style.strokeDashoffset = "" + circumference, $(document).ready(function () {
  $("footer").css("display", "none"), $(".footer-text").css("display", "none"), $(window).scroll(function () {
    var e = $(this).scrollTop(),
      t = $(window).height(),
      a = $(document).height();
    $(".scrolled").html(e), $(".nav-bar input").attr("value", e);
    var n, s = document.querySelector(".nav-bar input");
    s.value < a && 0 < s.value && (s.value, n = circumference - e * circumference / (a - t), circle.style.strokeDashoffset = n, console.log(n), n <= 3 ? ($("footer").fadeIn(), $(".footer-text").fadeIn()) : ($("footer").fadeOut(), $(".footer-text").fadeOut())), frameHeight <= e ? ($(".page-title").css("opacity", "1"), $("#back2Top .ring").fadeIn()) : ($(".page-title").css("opacity", "0"), $("#back2Top .ring").fadeOut());
    s = .05 * e;
    0 < e && e < frameHeight ? ($(".header-text span:first-child").css("transform", "translateY(" + -6 * s + "px)"), $(".header-text span:nth-child(2)").css("transform", "translateY(" + -10 * s + "px)"), $(".header-text span:nth-child(3)").css("transform", "translateY(" + -7 * s + "px)"), $(".header-text span:nth-child(4)").css("transform", "translateY(" + -4 * s + "px)"), $(".header-text span:nth-child(5)").css("transform", "translateY(" + -6 * s + "px)"), $(".header-text span:nth-child(6)").css("transform", "translateY(" + -10 * s + "px)"), $(".header-text span:nth-child(7)").css("transform", "translateY(" + -10 * s + "px)"), $(".header-text span:nth-child(8)").css("transform", "translateY(" + -7 * s + "px)"), $(".header-text span:nth-child(9)").css("transform", "translateY(" + -4 * s + "px)"), $(".header-text span:nth-child(10)").css("transform", "translateY(" + -6 * s + "px)")) : $(".header-text span").css("transform", "translateY(0)")
  })
}), $(document).ready(function () {
  $("#back2Top").on("click", function (e) {
    e.preventDefault(), $("html, body").animate({
      scrollTop: 0
    }, 1e3, "swing")
  })
}), $(function () {
  $("#scroll").on("click", function (e) {
    e.preventDefault(), $("html, body").animate({
      scrollTop: frameHeight
    }, 1e3, "linear")
  })
}),
  function () {
    function e() {
      [].forEach.call(document.getElementsByClassName("project"), function (e, t) {
        var a;
        (a = (a = e).getBoundingClientRect()).top < (window.innerHeight || document.body.clientHeight) && a.left < (window.innerWidth || document.body.clientWidth) ? e.classList.add("loaded") : e.classList.remove("loaded")
      })
    }
    window.onload = function () {
      window.addEventListener("scroll", e), e()
    }
  }(), $("#filter-btns div").click(function () {
    $("#filter-btns div").removeClass("filter-active"), $(this).addClass("filter-active");
    var e = $(this).data("filter");
    $("#projects").fadeTo(300, 0), $(".project").fadeOut(300).addClass("scale-out-center").removeClass("scale-in-center"), setTimeout(function () {
      $(e).fadeIn(300).addClass("scale-in-center").removeClass("scale-out-center"), $("#projects").fadeTo(300, 1)
    }, 400)
  }),
  function () {
    var projectPage = $("<div class='project-page ik'></div>"),
      projectTitle = $("<h1></h1>"),
      projectTags = $("<h3></h3>"),
      projectImage = $("<img>"),
      projectDesc = $("<p></p>"),
      projectDetails = $("<p></p>"),
      projectCloseBtn = $("<div class='project-close-btn custom-link'><span>🡸 back to portfolio</span></div>");
      $(".middle").append(projectCloseBtn),
    projectPage.append(projectTitle).append(projectTags).append(projectImage).append(projectDesc).append(projectDetails), $(".middle").append(projectPage), $(".project img").click(function (e) {
      e.preventDefault();
      var t = $(this).attr("title"),
        a = $(this).attr("data-tags"),
        n = $(this).attr("data-description"),
        x = $(this).attr("data-details"),
        w = projectImage.width(),
        h = projectImage.height();
      console.log(w, h);
      h = $(this).attr("src").split("?")[0];
      console.log(h);
      w = h + "?tr=ar-8-5,w-" + w;
      console.log(w), console.log($(this).attr("src")), projectImage.attr("src", w), projectTitle.text(t), projectTags.text(a), projectDesc.text(n), projectDetails.text(x), projectPage.delay(300).fadeIn("fast"), $(".project-page").animate({
        scrollTop: 0
      }, 500), $("html").addClass("project-page--open"), projectCloseBtn.click(function () {
        projectPage.fadeOut(0), $("html").removeClass("project-page--open")
      })
    })
  }(), $(".project").mouseover(function (e) {
    e.preventDefault();
    var e = $(this).find("img"),
      t = $(this).find("h4"),
      e = e.attr("title");
    t.text(e).fadeIn("slow"), $(".project").mouseout(function () {
      t.text(" ")
    })
  }), $(".close-icon").click(function () {
    $("html").hasClass("project-page--open") && $(this).removeClass("project-page--open")
  });


const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = [
  " ",
  "hello.",
  " ",
  "name : 'adam morsy'",
  "position : 'graphic designer and mixed media artist'",
  "interests : 'patterns, geometry, motion'",
  "skills: 'design, paper-folding, coding'",
  "likes: 'gray-blues, squares, and peacocks'",
  "available for hire: 'yes!'",
  "email: 'adam_morsy@outlook.com'"
];

const typingDelay = 60;
const erasingDelay = 60;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 12;
    setTimeout(type, typingDelay + 200);
    return;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // On DOM Load initiate the effect
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});

