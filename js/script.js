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
    var o = $("<div class='project-page ik'></div>"),
      r = $("<h1></h1>"),
      c = $("<h3></h3>"),
      i = $("<img>"),
      l = $("<p></p>"),
      d = $("<div class='close-icon custom-link'><div class='bar1'></div><div class='bar3'></div></div>");
    o.append(r).append(c).append(i).append(l).append(d), $(".middle").append(o), $(".project img").click(function (e) {
      e.preventDefault();
      var t = $(this).attr("title"),
        a = $(this).attr("data-tags"),
        n = $(this).attr("data-details"),
        s = i.width(),
        e = i.height();
      console.log(s, e);
      e = $(this).attr("src").split("?")[0];
      console.log(e);
      s = e + "?tr=ar-8-5,w-" + s;
      console.log(s), console.log($(this).attr("src")), i.attr("src", s), r.text(t), c.text(a), l.text(n), o.delay(300).fadeIn("fast"), $(".project-page").animate({
        scrollTop: 0
      }, 500), $("html").addClass("project-page--open"), d.click(function () {
        o.fadeOut(0), $("html").removeClass("project-page--open")
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




let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let cw = canvas.width = window.innerWidth;
let ch = canvas.height = window.innerHeight;
let cw2 = cw/2 , ch2 = ch/2;
const {PI,sin,cos} = Math;
const PI2 = PI*2;

const slices = 8;
const mirror = true;

let img;
let pattern;
let offset = {x: 2, y: 2};
let patternStroke = "#41062e";

canvas.onload = function() {
  offset.x = 0;
  offset.y = 0;
};
window.onresize = function() {
	cw = canvas.width = window.innerWidth;
    ch = canvas.height = window.innerHeight;
    cw2 = cw/2;
    ch2 = ch/2;
};
window.onmousemove = function(e) {
  offset.x += img.width * (e.movementX / cw)* 0.25;
  offset.y += img.height * (e.movementY / ch)* 0.25;
}
function setup() {
  img = new Image();
  img.src = canvas.getAttribute("data-image");
  console.log(img.src);
  img.onload = function(){
    pattern = ctx.createPattern(img, 'repeat');
    loop();
  };
}
// animation will pause when paused==true
var paused=false;

// testing, a rotation angle for the animated rect
var speed=0;

// pause the animation on #pause click
$('.intro').on('mouseout',function(){
  paused=true;
  speed=0;
});

// continue the animation on #continue click
$('.intro').on('mouseover',function(){
  paused=false;
  requestAnimationFrame(loop);
});

// start the animation loop
// requestAnimationFrame(loop);

function loop() {
   if(paused){return;}
  
  let radius = cw2 + ch2;
  let deltaAngle = PI2 / slices;
  
  let x = [ -1, -1,radius * sin(deltaAngle),radius * sin(deltaAngle/2)];
  let y = [ -1,radius,radius * cos(deltaAngle), radius * cos(deltaAngle/2)];
  
  for(let i=0; i<slices; i++) {
    
    ctx.translate(cw2, ch2);
    ctx.rotate(i * deltaAngle);
    ctx.translate(offset.x, offset.y);
    ctx.beginPath();
    ctx.moveTo(x[0]-offset.x, y[0]-offset.y);
    ctx.lineTo(x[1]-offset.x, y[1]-offset.y);
    ctx.lineTo(x[2]-offset.x, y[2]-offset.y);
    ctx.lineTo(x[0]-offset.x, y[0]-offset.y);
    ctx.fillStyle = pattern;
    ctx.fill();
    ctx.resetTransform();
    
    if(mirror) {
      ctx.translate(cw2, ch2);
      ctx.rotate((i-1) * deltaAngle);
      ctx.scale(-1, 1);
      ctx.translate(offset.x, offset.y);
      
      ctx.beginPath();
      ctx.moveTo(x[0]-offset.x, y[0]-offset.y);
      ctx.lineTo(x[1]-offset.x, y[1]-offset.y);
      ctx.lineTo(x[3]-offset.x, y[3]-offset.y);
      ctx.lineTo(x[0]-offset.x, y[0]-offset.y);
      ctx.fillStyle = pattern;
      ctx.fill();
      
      ctx.resetTransform();
    }
  }
  speed=0.15;
  offset.x = (offset.x + speed) % img.width;
  offset.y = (offset.y + speed) % img.height;


requestAnimationFrame(loop);
}

function rotate(x, y, a) {
  let newx = x*cos(a) - y*sin(a);
  let newy = x*sin(a) + y*cos(a);
  x = 0.0001*newx;
  y = 0.0001*newy;
  return{x, y};
}
setup();

