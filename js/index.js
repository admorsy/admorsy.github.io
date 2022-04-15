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

else {
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

// -----------------resize images

function ResImg() {
	// var jw1 = window.innerWidth;
	// var jh1 = window.innerHeight;

	// var hw1 = document.getElementById("h-w1");
	// hw1.innerHTML = "viewport width: " + jw1;

	// var hh1 = document.getElementById("h-h1");
	// hh1.innerHTML = "viewport height: " + jh1;

	$(".ik img").each(function () {
		var jw1 = $(this).parent().width();
		var jh1 = $(this).parent().height();

		console.log(jw1, jh1);

		var oldSrc = $(this).attr("src");
		var baseUrl = oldSrc.split("?");
		var imgSrc = baseUrl[0];
		console.log(imgSrc);
		var newSre;

		if ($(this).parent().hasClass("project")) {
			newSrc = imgSrc + "?tr=ar-8-5,w-" + jw1;
		} else if (jw1 > jh1) {
			newSrc = imgSrc + "?tr=w-" + jw1 + ",h-" + jh1;
		} else {
			newSrc = imgSrc + "?tr=w-" + jh1 + ",h-" + jw1;
		}
		console.log(newSrc);

		$(this).attr("src", newSrc);

		console.log($(this).attr("src"));
	});
}

window.onload = ResImg();

window.addEventListener("resize", ResImg);

ResImg();

/*-------------nav page---------------*/

var navPage = $("#nav-page");
var navLink = $("#nav-page a");

$(".nav-icon").click(function () {
	$(this).toggleClass("is--active");
	$("html").toggleClass("nav-page--open");
});

/*-------------nav page links---------------*/

// var navLink = $(".nav-link");
// navLink.click(function(event) {

// 		$("body").animate({

// 			opacity: 0
// 			}, 1000, 'linear'
// 		);

// 		navLink.removeClass("current");
// 		$(this).addClass("current");
// 		// navLink.addClass('fade-out').removeClass('fade-in');
// 		navPage.delay(2000).fadeOut(1000);

// 		setTimeout(function() {
// 			unloadPage();
// 		},0);

// 		// $("body, html").css("overflow", "auto");
// 		$(".nav-icon").removeClass("is--active");
// 	});

//------------------- back to top ring calculations -------------------//

var circle = document.querySelector("circle");
var radius = circle.r.baseVal.value;
var circumference = radius * 2 * Math.PI;
var area = radius * radius * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

/*---- transform "header-text" to "page-title" in nav-bar---------------*/

$(document).ready(function () {
	$("footer").css("display", "none");
	$(".footer-text").css("display", "none");

	$(window).scroll(function () {
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

$(document).ready(function () {
	$("#back2Top").on("click", function (event) {
		event.preventDefault();

		$("html, body").animate(
			{
				scrollTop: 0
			},
			1000,
			"swing"
		);
	});
});

// ---------------------------scroll down button -------------------------

$(function () {
	// $('a[href*=#]').on('click', function(e) {
	$("#scroll").on("click", function (e) {
		e.preventDefault();

		$("html, body").animate(
			{
				scrollTop: frameHeight
			},
			1000,
			"linear"
		);
	});
});

//----------------------------------------------------------------------------//
//-----------------------------filter gallery---------------------------------//
//----------------------------------------------------------------------------//

(function () {
	function isElementInViewport(el) {
		var rect = el.getBoundingClientRect();
		return (
			rect.top < (window.innerHeight || document.body.clientHeight) &&
			rect.left < (window.innerWidth || document.body.clientWidth)
		);
	}

	var handleObjectVisibility = function () {
		var projects = [];

		projects.forEach.call(
			document.getElementsByClassName("project"),
			function (el, i) {
				if (isElementInViewport(el)) {
					el.classList.add("loaded");
				} else {
					el.classList.remove("loaded");
				}
			}
		);
	};

	window.onload = function () {
		window.addEventListener("scroll", handleObjectVisibility);
		handleObjectVisibility();
	};
})();

$("#filter-btns div").click(function () {
	$("#filter-btns div").removeClass("filter-active");
	$(this).addClass("filter-active");
	var selectedFilter = $(this).data("filter");

	$("#projects").fadeTo(300, 0);
	$(".project")
		.fadeOut(300)
		.addClass("scale-out-center")
		.removeClass("scale-in-center");

	setTimeout(function () {
		$(selectedFilter)
			.fadeIn(300)
			.addClass("scale-in-center")
			.removeClass("scale-out-center");
		$("#projects").fadeTo(300, 1);
	}, 400);
});

// Create a lightbox/project page

(function () {
	var $projectPage = $("<div class='project-page ik'></div>");
	var $title = $("<h1></h1>");
	var $tags = $("<h3></h3>");
	var $img = $("<img>");
	var $details = $("<p></p>");
	var $closeIcon = $(
		"<div class='close-icon custom-link'><div class='bar1'></div><div class='bar3'></div></div>"
	);

	// Add image,title,tags, and details

	$projectPage
		.append($title)
		.append($tags)
		.append($img)
		.append($details)
		.append($closeIcon);

	// Add lighbox to document

	$("body #frame .middle").append($projectPage);

	$(".project img").click(function (e) {
		e.preventDefault();

		// Get image link and description

		var title = $(this).attr("title");
		var tags = $(this).attr("data-tags");
		var details = $(this).attr("data-details");
		var jw1 = $img.width();
		var jh1 = $img.height();

		console.log(jw1, jh1);

		var oldSrc = $(this).attr("src");
		var baseUrl = oldSrc.split("?");
		var imgSrc = baseUrl[0];
		console.log(imgSrc);

		var newSrc = imgSrc + "?tr=ar-8-5,w-" + jw1;

		console.log(newSrc);

		console.log($(this).attr("src"));

		// Add data to lighbox

		$img.attr("src", newSrc);

		$title.text(title);

		$tags.text(tags);

		$details.text(details);

		// open lightbox

		// $projectPage.delay(300).fadeIn('fast');

		$("html").addClass("project-page--open");

		$(".project-page").animate(
			{
				scrollTop: 0
			},
			500
		);

		// $("html").css("overflow", "hidden");

		$closeIcon.click(function () {
			// $projectPage.fadeOut(0);

			$("html").removeClass("project-page--open");

			// $("html").css("overflow", "auto");
		});
	});
})();

//-----hovering effect on project thumbnails--------//

(function () {
	$(".project").mouseover(function (e) {
		e.preventDefault();

		// Get image link and description
		var projectImg = $(this).find("img");
		var projectImgTitle = $(this).find("h4");

		var title = projectImg.attr("title");
		projectImgTitle.text(title).fadeIn("slow");

		$(".project").mouseout(function () {
			projectImgTitle.text(" ");
		});
	});
})();

// (function() {

// 	$(".close-icon").click(function() {

// 		if ($("html").hasClass("project-page--open")) {

// 			$(this).removeClass("project-page--open");
// 			// $("body, html").css("overflow", "auto");

// 		}
// 	});
// })();
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = [
	" ",
	"hello.",
	" ",
	"name : 'ahmad morsy'",
	"position : 'graphic designer and mixed media artist'",
	"interests : 'patterns, geometry, motion'",
	"skills: 'design, paper-folding, coding'",
	"likes: 'gray-blues, squares, and peacocks'",
	"available for hire: 'yes!'",
	"email: 'ahmad.morsy@outlook.com'"
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
