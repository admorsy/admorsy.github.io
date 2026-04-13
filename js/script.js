// ----------------------
// MENU + NAV TOGGLE
// ----------------------

$(".nav-icon").click(function () {
	$(this).toggleClass("is--active");
	$("html").toggleClass("nav-page--open");

});

// ----------------------
// SMOOTH SCROLL
// ----------------------

const lenis = new Lenis({
		duration: 1.6, // higher = smoother
		smooth: true,
		smoothTouch: true
});

function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);


// ----------------------
// CUSTOM CURSOR (Desktop Only)
// ----------------------

$(function () {

    // Detect touch / coarse-pointer devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) {
        // Hide cursor elements and use normal pointer
        $("body").addClass("no-cursor");
        $(".cursor-dot, .cursor-ring").hide();
        $("body").css("cursor", "auto");
        return; // Don't initialize the cursor script on touch
    }

    // ----------------------
    // Initialize the cursor
    // ----------------------
    function initializeCursor() {
        const $dot = $(".cursor-dot");
        const $ring = $(".cursor-ring");

        let mouseX = 0;
        let mouseY = 0;    
        let ringX = 0;
        let ringY = 0;

        const speed = 0.5;
        const buffer = 10;

        let locked = false;
        let activeElement = null;

        // --- mouse movement ---
        $(document).on("mousemove", function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;

            document.body.style.cursor = "var(--cursor-custom-normal)";

            $dot.css({
                left: mouseX,
                top: mouseY
            });

            // find the closest element inside buffer
            let closest = null;
            let minDist = Infinity;

            $(".cursor-hover").each(function () {
                const rect = this.getBoundingClientRect();

                const insideBuffer =
                    mouseX > rect.left - buffer &&
                    mouseX < rect.right + buffer &&
                    mouseY > rect.top - buffer &&
                    mouseY < rect.bottom + buffer;

                if (insideBuffer) {
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const dist = Math.hypot(mouseX - centerX, mouseY - centerY);

                    if (dist < minDist) {
                        minDist = dist;
                        closest = this;
                    }
                }
            });

            if (closest) {
                // lock to closest element
                locked = true;
                activeElement = closest;
                const rect = closest.getBoundingClientRect();

                $ring.css({
                    width: rect.width + "px",
                    height: rect.height + "px",
                    borderRadius: "0px",
                    "--tx": "0",
                    "--ty": "0",
                    left: rect.left,
                    top: rect.top
                });
            } else if (locked) {
                // release if no element is in buffer
                locked = false;
                activeElement = null;

                $ring.css({
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    "--tx": "-50%",
                    "--ty": "-50%"
                });
            }
        });

        // --- ring animation ---
        function animate() {
            if (!locked) {
                ringX += (mouseX - ringX) * speed;
                ringY += (mouseY - ringY) * speed;

                $ring.css({
                    left: ringX,
                    top: ringY
                });
            }
            requestAnimationFrame(animate);
        }
        animate();

        // --- hide cursor when leaving window ---
        $(document).on("mouseleave", function () {
            $(".cursor-dot, .cursor-ring").hide();
            document.body.style.cursor = "var(--cursor-custom-normal)";
        });

        $(document).on("mouseenter", function () {
            $(".cursor-dot, .cursor-ring").show();
            document.body.style.cursor = "var(--cursor-custom-normal)";
        });

        $(document).on("mousemove", function () {
            $(".cursor-dot, .cursor-ring").show();
            document.body.style.cursor = "var(--cursor-custom-normal)";
        });

        let ringTimeout;

        $(".cursor-hover-no-ring").on("mouseenter", function () {
            clearTimeout(ringTimeout);
            $(".cursor-ring").addClass("shrink");
            document.body.style.cursor = "var(--cursor-custom-normal)";
        });

        $(".cursor-hover-no-ring").on("mouseleave", function () {
            ringTimeout = setTimeout(() => {
                $(".cursor-ring").removeClass("shrink");
                document.body.style.cursor = "var(--cursor-custom-normal)";
            }, 250);
        });

    } // End initializeCursor

    // Call the function for non-touch devices
    initializeCursor();

});

// ---------------------------------------------- //
// -------- HIDE CURSOR-RING CLOSE TO SCROLL-BAR ------- //
// ---------------------------------------------- //

const cursorRing = document.querySelector(".cursor-ring");
const cursorDot = document.querySelector(".cursor-dot");


document.addEventListener("mousemove", (e) => {
    const scrollbarWidth = 15; // approximate
    const isOverScrollbar = e.clientX > window.innerWidth - scrollbarWidth;

    if (isOverScrollbar) {
        cursorRing.style.opacity = "0";
		 cursorDot.style.opacity = "0";
    } else {
        cursorRing.style.opacity = "1";
		cursorDot.style.opacity = "1";
    }
});

// ---------------------------------------------- //
// -------- HIDE CURSOR-RING ON SCROLL.   ------- //
// ---------------------------------------------- //

let scrollTimeout;

window.addEventListener("scroll", () => {
    cursorRing.style.opacity = "0";

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        cursorRing.style.opacity = "1";
    }, 150);
});


// ---------------------------------------------- //
// -------- SHRINK CURSOR-RING ON CLICK.   ------- //
// ---------------------------------------------- //


document.addEventListener("mousedown", () => {
    cursorRing.classList.add("shrink");
});

document.addEventListener("mouseup", () => {
    cursorRing.classList.remove("shrink");
});

// --------------------------------------- //
// ---- magnetic buttons on hover -------- //
// ----------------------------------------//

const magnetics = document.querySelectorAll(".magnetic-hover");

document.addEventListener("mousemove", (e) => {
	magnetics.forEach((magnetic) => {
		const rect = magnetic.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const deltaX = e.clientX - centerX;
		const deltaY = e.clientY - centerY;

		const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
		const maxDistance = 80; // maximum distance to activate effect

		if (distance < maxDistance) {
				magnetic.style.transform = `translate(${deltaX * 0.1}px, ${deltaY * 0.1}px)`;
			} else {
				magnetic.style.transform = "translate(0, 0)";
			}
	});
});

// ---------------------- //
// --- PARALLAX HEADER  --//
// ---------------------- //


$(function(){

	const $header = $(".header");
	const $layers = $(".parallax-layer");

	function parallax(){

			const rect = $header[0].getBoundingClientRect();
			const headerHeight = $header.outerHeight();
			const headerWidth = $header.outerWidth();

			if(rect.bottom > 0 && rect.top < window.innerHeight){

				const scrollProgress = -rect.top;

				$layers.each(function(){

					const speed = $(this).data("speed") || 0;
					const xPercent = $(this).data("x") || 0;
					const yPercent = $(this).data("y") || 0;
					const scale = $(this).data("scale") || 1;
					const angle = $(this).data("angle") || 0;
					const origin = $(this).data("origin") || "center";

					const baseX = headerWidth * (xPercent / 100);
					const baseY = headerHeight * (yPercent / 100);

					const parallaxY = baseY + scrollProgress * speed;
					const rotation = scrollProgress * angle;

					$(this).css({
							transform: `translate(${baseX}px, ${parallaxY}px) scale(${scale}) rotate(${rotation}deg)`,
							"transform-origin": origin
					});



			});

		}

		requestAnimationFrame(parallax);
	}

	parallax();

});

// ----------------------
// fade in on scroll
// ----------------------

$(document).ready(function () {
	/* Every time the window is scrolled ... */
	$(window).scroll(function () {
		/* Check the location of each desired element */
		$(".hideme").each(function (i) {
			var bottom_of_object = $(this).offset().top + $(this).outerHeight() / 4;
			var bottom_of_window = $(window).scrollTop() + $(window).height();
			/* If the object is completely visible in the window, fade it it */
			if (bottom_of_window > bottom_of_object) {
					$(this).animate({ opacity: "1" }, 900);
				}
		});
});
});


// ===============================
// SCROLL REVEAL (IntersectionObserver)
// ===============================

const observer = new IntersectionObserver((entries) => {

	entries.forEach(entry => {

		if (entry.isIntersecting) {
				entry.target.classList.add("loaded");
				observer.unobserve(entry.target); // animate only once
			}

	});

}, {
	threshold: 0.15
});

document.querySelectorAll(".project").forEach(project => {
	observer.observe(project);
});


// ===============================
// PROJECT FILTERING
// ===============================


const buttons = document.querySelectorAll(".filter-btn");
const container = document.querySelector(".projects");
const cards = Array.from(document.querySelectorAll(".project-card"));

buttons.forEach(button => {

	button.addEventListener("click", () => {

		/* active button */

		buttons.forEach(btn => btn.classList.remove("filter-active"));
		button.classList.add("filter-active");

		const filter = button.dataset.filter;

		/* STEP 1 — fade out visible cards */

		cards.forEach(card => {
			if (!card.classList.contains("hidden")) {
					card.classList.add("fade-out");
				}
		});

		/* STEP 2 — after fade, reorder + filter */

setTimeout(() => {

	let matched = [];
	let unmatched = [];

	cards.forEach(card => {

		const tags = card.dataset.tags;

		if (filter === "all" || tags.includes(filter)) {

			card.classList.remove("hidden");

			// 👇 set initial state BEFORE animation
			card.classList.add("fade-out");

			matched.push(card);

		} else {

			card.classList.add("hidden");
			unmatched.push(card);

		}

	});

	/* reorder cards */
	[...matched, ...unmatched].forEach(card => {
		container.appendChild(card);
	});

	/* 👇 force browser to apply initial state */
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {

			/* animate IN */
			matched.forEach(card => {
				card.classList.remove("fade-out");
			});

		});
	});

}, 350);

});

});

// -----------------------------------------//
// -------- video play/pause button --------//
// -----------------------------------------//

document.querySelectorAll(".video-container").forEach(container => {
	const video = container.querySelector("video");
	const button = container.querySelector(".video-toggle");
	const icon = button.querySelector("i");

	// Unified function to update UI
	function updateUI() {
			if (video.paused) {
					container.classList.remove("playing");
					video.setAttribute("controls","false")

					icon.classList.remove("ri-pause-fill");
					icon.classList.add("ri-play-fill");
				} else {
					container.classList.add("playing");
					video.setAttribute("controls","true")
					icon.classList.remove("ri-play-fill");
					icon.classList.add("ri-pause-fill");
				}
			}

			// Play/pause toggle when custom button clicked
			button.addEventListener("click", (e) => {
				e.stopPropagation(); // prevent bubbling
				if (video.paused) video.play();
					else video.pause();
			});

			// Update UI whenever video plays or pauses (covers native controls & keyboard)
			video.addEventListener("play", updateUI);
			video.addEventListener("pause", updateUI);

			// Optional: allow clicking video itself to toggle
			// video.addEventListener("click", () => {
				//   if (video.paused) video.play();
				//   else video.pause();
				// });
		});

		// -----------------------------------------//
		// -------- SPLIT TEXT 2 LETTERS --------//
		// -----------------------------------------//

	// 	function splitTextToLetters() {
	// 			const paragraphs = document.querySelectorAll(".intro-text p");

	// 			paragraphs.forEach(p => {
	// 				const text = p.textContent;
	// 				p.innerHTML = "";

	// 				text.split("").forEach(char => {
	// 					const span = document.createElement("span");

	// 					// Preserve spaces
	// 					span.innerHTML = char === " " ? "&nbsp;" : char;

	// 					p.appendChild(span);
	// 			});
	// 	});
	// }


	
		// -----------------------------------------//
		// -------- SPLIT TEXT 2 WORDS --------//
		// -----------------------------------------//
function splitTextToWords() {
    const paragraphs = document.querySelectorAll(".intro-text p");

    paragraphs.forEach(p => {
        const nodes = Array.from(p.childNodes);
        p.innerHTML = ""; // clear paragraph

        nodes.forEach(node => {
            processNode(node, p);
        });
    });
}

function processNode(node, parent) {
    if (node.nodeType === Node.TEXT_NODE) {
        // split text into words and spaces
        const words = node.textContent.split(/(\s+)/);
        words.forEach(word => {
            if (word === "") return;
            if (word.trim() === "") {
                // preserve spaces
                parent.appendChild(document.createTextNode(word));
            } else {
                const span = document.createElement("span");
                span.textContent = word;
                parent.appendChild(span);
            }
        });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        // clone element but empty
        const clone = node.cloneNode(false);
        parent.appendChild(clone);

        // recursively process children
        Array.from(node.childNodes).forEach(child => {
            processNode(child, clone);
        });
    }
}

// Run after DOM loads
document.addEventListener("DOMContentLoaded", () => {
    splitTextToWords();

    // Then attach parallax scroll
    window.addEventListener("scroll", applyParallax);
});
		// -------------------------- //
		// -----PARALLEX LETTERS ----//
		// -------------------------- //

		function applyParallax() {
				const scrollTop = window.scrollY;
				const frameHeight = window.innerHeight;

				const words = document.querySelectorAll(".intro-text span");

				const baseSpeed = 0.05;

				// Normalize scroll (0 → 1)
				const progress = Math.min(scrollTop / frameHeight, 1);

				if (scrollTop > 0 && scrollTop < frameHeight) {

				// 		letters.forEach((letter, index) => {
				// 			const speed = -4 - Math.sin(index) * 6;
				// 			const translateY = speed * (scrollTop * baseSpeed);

				// 			// 👇 Fade out based on scroll
				// 			const opacity = 1 - 1.5 * progress;

				// 			letter.style.transform = `translateY(${translateY}px)`;
				// 			letter.style.opacity = opacity;
				// 	});

				// } else {
				// 	letters.forEach(letter => {
				// 		letter.style.transform = "translateY(0)";
				// 		letter.style.opacity = scrollTop >= frameHeight ? 0 : 1;
				// });


						words.forEach((word, index) => {
							const speed = -4 - Math.sin(index) * 6;
							const translateY = speed * (scrollTop * baseSpeed);

							// 👇 Fade out based on scroll
							const opacity = 1 - 1.5 * progress;

							word.style.transform = `translateY(${translateY}px)`;
							word.style.opacity = opacity;
					});

				} else {
					words.forEach(word => {
						word.style.transform = "translateY(0)";
						word.style.opacity = scrollTop >= frameHeight ? 0 : 1;
				});
			}
		}

		document.addEventListener("DOMContentLoaded", () => {
			// splitTextToLetters();
	splitTextToWords();
			window.addEventListener("scroll", applyParallax);
	});
		

		// ------------------------ //
		// ----- HEADER IMAGE + MOUSE ----- //
		// ------------------------ //

		$(function(){

			const $header = $(".header");
			const $image = $(".header img"); // adjust if needed

			$header.on("mousemove", function(e){

				const rect = this.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;

				const width = rect.width;
				const height = rect.height;

				// normalize (0 → 1)
				const progressX = x / width;
				const progressY = y / height;

				const center = width / 2;
				const distance = Math.abs(x - center);
				const maxDistance = width / 2;

				const progress = distance / maxDistance;


				// map to saturation (tweak these values)
				const minSat = 5;
				const maxSat = 10;

				const value = minSat + (maxSat - minSat) * progress;

				const valueX = minSat + (maxSat - minSat) * progressX;
				const valueY = minSat + (maxSat - minSat) * progressY;


				$image.css("transform", `translate(${-valueX}px,${-valueY}px)`);


		});

});

// ------------------------ //
// ----- CUBES GIF CONTROL ----- //
// ------------------------ //	

// const el = document.querySelector('.cubes-gif');

// const totalFrames = 100;
// const threshold = 50;
// const fps = 30;

// let currentFrame = 0;

// // Modes
// // "CW"  = 0 → 100
// // "CCW" = 100 → 0
// let mode = "CW";

// let isHovering = false;

// const frameDuration = 100 / fps;
// let lastTime = 0;

// // ------------------
// // PRELOAD
// // ------------------
// const images = [];
// for (let i = 0; i <= totalFrames; i++) {
//   const img = new Image();
//   const num = String(i).padStart(3, '0');
//   img.src = `/img/work/cubes/cubes-frames/frame_${num}.png`;
//   images.push(img);
// }

// // ------------------
// // UPDATE FRAME
// // ------------------
// function updateFrame() {
//   const num = String(currentFrame).padStart(3, '0');
//   el.style.backgroundImage =
//     `url('/img/work/cubes/cubes-frames/frame_${num}.png')`;
// }

// updateFrame();

// // ------------------
// // ANIMATION LOOP
// // ------------------
// function animate(time) {
//   if (time - lastTime >= frameDuration) {

//     // ------------------
//     // HOVERING BEHAVIOR
//     // ------------------
//     if (isHovering) {

//       if (mode === "CW") {
//         if (currentFrame < totalFrames) {
//           currentFrame++;
//         }
//       }

//       else if (mode === "CCW") {
//         if (currentFrame > 0) {
//           currentFrame--;
//         }
//       }

//     }

//     // ------------------
//     // MOUSE OUT BEHAVIOR
//     // ------------------
//     else {

//       if (mode === "CW") {
//         if (currentFrame < threshold) {
//           // reverse direction
//           mode = "CCW";
//         } else {
//           // continue to end
//           if (currentFrame < totalFrames) {
//             currentFrame++;
//           }
//         }
//       }

//       else if (mode === "CCW") {
//         if (currentFrame > threshold) {
//           // reverse direction
//           mode = "CW";
//         } else {
//           // continue to start
//           if (currentFrame > 0) {
//             currentFrame--;
//           }
//         }
//       }

//     }

//     // ------------------
//     // STOP CONDITIONS
//     // ------------------

//     // reached 100 → stop + flip mode
//     if (currentFrame === totalFrames) {
//       mode = "CCW";
//     }

//     // reached 0 → stop + flip mode
//     if (currentFrame === 0) {
//       mode = "CW";
//     }

//     updateFrame();
//     lastTime = time;
//   }

//   requestAnimationFrame(animate);
// }

// requestAnimationFrame(animate);

// // ------------------
// // EVENTS
// // ------------------
// el.addEventListener('mouseenter', () => {
//   isHovering = true;
// });

// el.addEventListener('mouseleave', () => {
//   isHovering = false;
// });

// ----------------------------------------------
// SIMPLIFIED VERSION OF CUBES GIF (no mouseout) 
// ----------------------------------------------

const el = document.querySelector('.cubes-gif');

const totalFrames = 100;
const fps = 60;

let currentFrame = 0;
let direction = 1; // 1 = CW (0→100), -1 = CCW (100→0)

let isHovering = false;
let isPlaying = false;

const frameDuration = 60 / fps;
let lastTime = 0;

// ------------------
// PRELOAD (optional but good)
// ------------------
const images = [];
for (let i = 0; i <= totalFrames; i++) {
  const img = new Image();
  const num = String(i).padStart(3, '0');
  img.src = `/img/work/cubes/cubes-frames/frame_${num}.png`;
  images.push(img);
}

// ------------------
// RENDER FRAME
// ------------------
function updateFrame() {
  const num = String(currentFrame).padStart(3, '0');
  const url = `/img/work/cubes/cubes-frames/frame_${num}.png`;

  el.style.backgroundImage = `url('${url}')`;
  el.style.backgroundColor = 'transparent';
}
updateFrame();

// ------------------
// ANIMATION LOOP
// ------------------
function animate(time) {
  if (!isPlaying) {
    requestAnimationFrame(animate);
    return;
  }

  if (time - lastTime >= frameDuration) {
    currentFrame += direction;

    // Clamp + stop at ends
    if (currentFrame >= totalFrames) {
      currentFrame = totalFrames;
      isPlaying = false;
      direction = -1; // next hover goes CCW
    }

    if (currentFrame <= 0) {
      currentFrame = 0;
      isPlaying = false;
      direction = 1; // next hover goes CW
    }

    updateFrame();
    lastTime = time;
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// ------------------
// HOVER EVENTS
// ------------------
el.addEventListener('mouseenter', () => {
  if (!isPlaying) {
    isPlaying = true;
    lastTime = performance.now();
  }
});

el.addEventListener('mouseleave', () => {
  isHovering = false; // (not needed anymore, kept minimal)
});


// ----------------------------------------------
// ALTERNATIVE VIDEO CONTROL (hover to play)
// ----------------------------------------------	
// const forward = document.querySelector('.forward');
// const reverse = document.querySelector('.reverse');
// const wrapper = document.querySelector('.cubes-wrap');

// let isForward = true;
// let isPlaying = false;

// // ⏱️ SET THIS to match your GIF duration (in ms)
// const duration = 3000; // example: 3 seconds

// // store original src
// const forwardSrc = forward.src;
// const reverseSrc = reverse.src;

// // ------------------
// // HOVER
// // ------------------
// wrapper.addEventListener('mouseenter', () => {
//   if (isPlaying) return;

//   isPlaying = true;

//   if (isForward) {
//     // show forward
//     forward.style.opacity = 1;
//     reverse.style.opacity = 0;

//     // restart GIF
//    forward.src = forwardSrc + "?t=" + Date.now();
//   } else {
//     // show reverse
//     reverse.style.opacity = 1;
//     forward.style.opacity = 0;

//     // restart GIF
//     reverse.src = "";
//     reverse.src = reverseSrc;
//   }

//   // simulate "ended"
//   setTimeout(() => {
//     isPlaying = false;
//     isForward = !isForward;
//   }, duration);
// });