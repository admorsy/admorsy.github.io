// klaedoscope code

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let cw = canvas.width = window.innerWidth;
let ch = canvas.height = window.innerHeight;
let cw2 = cw / 2, ch2 = ch / 2;
const { PI, sin, cos } = Math;
const PI2 = PI * 2;

const slices = 8;
const mirror = true;

let img;
let pattern;
let offset = { x: 2, y: 2 };
let patternStroke = "#41062e";

canvas.onload = function () {
	offset.x = 0;
	offset.y = 0;
};
window.onresize = function () {
	cw = canvas.width = window.innerWidth;
	ch = canvas.height = window.innerHeight;
	cw2 = cw / 2;
	ch2 = ch / 2;
};
window.onmousemove = function (e) {
	offset.x += img.width * (e.movementX / cw) * 0.25;
	offset.y += img.height * (e.movementY / ch) * 0.25;
}
function setup() {
	img = new Image();
	img.src = canvas.getAttribute("data-image");
	console.log(img.src);
	img.onload = function () {
		pattern = ctx.createPattern(img, 'repeat');
		loop();
	};
}
// animation will pause when paused==true
var paused = false;

// testing, a rotation angle for the animated rect
var speed = 0;

//pause the animation on #pause click
$('html').on('mouseleave', function () {
	paused = true;
	speed = 0;
});

//continue the animation on #continue click
$('html').on('mouseenter', function () {
	paused = false;
	requestAnimationFrame(loop);
});

// start the animation loop
requestAnimationFrame(loop);

function loop() {
	if (paused) { return; }

	let radius = cw2 + ch2;
	let deltaAngle = PI2 / slices;

	let x = [-1, -1, radius * sin(deltaAngle), radius * sin(deltaAngle / 2)];
	let y = [-1, radius, radius * cos(deltaAngle), radius * cos(deltaAngle / 2)];

	for (let i = 0; i < slices; i++) {

		ctx.translate(cw2, ch2);
		ctx.rotate(i * deltaAngle);
		ctx.translate(offset.x, offset.y);
		ctx.beginPath();
		ctx.moveTo(x[0] - offset.x, y[0] - offset.y);
		ctx.lineTo(x[1] - offset.x, y[1] - offset.y);
		ctx.lineTo(x[2] - offset.x, y[2] - offset.y);
		ctx.lineTo(x[0] - offset.x, y[0] - offset.y);
		ctx.fillStyle = pattern;
		ctx.fill();
		ctx.resetTransform();

		if (mirror) {
			ctx.translate(cw2, ch2);
			ctx.rotate((i - 1) * deltaAngle);
			ctx.scale(-1, 1);
			ctx.translate(offset.x, offset.y);

			ctx.beginPath();
			ctx.moveTo(x[0] - offset.x, y[0] - offset.y);
			ctx.lineTo(x[1] - offset.x, y[1] - offset.y);
			ctx.lineTo(x[3] - offset.x, y[3] - offset.y);
			ctx.lineTo(x[0] - offset.x, y[0] - offset.y);
			ctx.fillStyle = pattern;
			ctx.fill();

			ctx.resetTransform();
		}
	}
	speed = 0.15;
	offset.x = (offset.x + speed) % img.width;
	offset.y = (offset.y + speed) % img.height;


	requestAnimationFrame(loop);
}

function rotate(x, y, a) {
	let newx = x * cos(a) - y * sin(a);
	let newy = x * sin(a) + y * cos(a);
	x = 0.0001 * newx;
	y = 0.0001 * newy;
	return { x, y };
}
setup();

// shuffled intro text

function WordShuffler(holder, opt) {
	var that = this;
	var time = 0;
	this.now;
	this.then = Date.now();

	this.delta;
	this.currentTimeOffset = 0;

	this.word = null;
	this.currentWord = null;
	this.currentCharacter = 0;
	this.currentWordLength = 0;


	var options = {
		fps: 60,
		timeOffset: 1,
		textColor: '#000',
		fontSize: "50px",
		useCanvas: false,
		// mixCapital : false,
		// mixSpecialCharacters : false,
		needUpdate: true,
		colors: [
			'#666666'
		]
	}

	if (typeof opt != "undefined") {
		for (key in opt) {
			options[key] = opt[key];
		}
	}



	this.needUpdate = true;
	this.fps = options.fps;
	this.interval = 1000 / this.fps;
	this.timeOffset = options.timeOffset;
	this.textColor = options.textColor;
	this.fontSize = options.fontSize;
	// this.mixCapital = options.mixCapital;
	// this.mixSpecialCharacters = options.mixSpecialCharacters;
	this.colors = options.colors;

	// this.useCanvas = options.useCanvas;

	this.chars = [
		'A', 'B', 'C', 'D',
		'E', 'F', 'G', 'H',
		'I', 'J', 'K', 'L',
		'M', 'N', 'O', 'P',
		'Q', 'R', 'S', 'T',
		'U', 'V', 'W', 'X',
		'Y', 'Z'
	];
	this.specialCharacters = [
		'!', '§', '$', '%',
		'&', '/', '(', ')',
		'=', '?', '_', '<',
		'>', '^', '°', '*',
		'#', '-', ':', ';', '~'
	]


	this.getRandomColor = function () {
		var randNum = Math.floor(Math.random() * this.colors.length);
		return this.colors[randNum];
	}

	//if DOM
	if (typeof holder != "undefined") {
		this.holder = holder;
	}

	if (!this.useCanvas && typeof this.holder == "undefined") {
		console.warn('Holder must be defined in DOM Mode. Use Canvas or define Holder');
	}


	this.getRandCharacter = function (characterToReplace) {
		if (characterToReplace == " ") {
			return ' ';
		}
		var randNum = Math.floor(Math.random() * this.chars.length);
		var lowChoice = -.5 + Math.random();
		var picketCharacter = this.chars[randNum];
		var choosen = picketCharacter.toLowerCase();
		if (this.mixCapital) {
			choosen = lowChoice < 0 ? picketCharacter.toLowerCase() : picketCharacter;
		}
		return choosen;

	}

	this.writeWord = function (word) {
		this.word = word;
		this.currentWord = word.split('');
		this.currentWordLength = this.currentWord.length;

	}

	this.generateSingleCharacter = function (color, character) {
		var span = document.createElement('span');
		span.style.color = color;
		span.innerHTML = character;
		return span;
	}

	this.updateCharacter = function (time) {

		this.now = Date.now();
		this.delta = this.now - this.then;



		if (this.delta > this.interval) {
			this.currentTimeOffset++;

			var word = [];

			if (this.currentTimeOffset === this.timeOffset && this.currentCharacter !== this.currentWordLength) {
				this.currentCharacter++;
				this.currentTimeOffset = 0;
			}
			for (var k = 0; k < this.currentCharacter; k++) {
				word.push(this.currentWord[k]);
			}

			for (var i = 0; i < this.currentWordLength - this.currentCharacter; i++) {
				word.push(this.getRandCharacter(this.currentWord[this.currentCharacter + i]));
			}


			if (that.currentCharacter === that.currentWordLength) {
				that.needUpdate = false;
			}
			this.holder.innerHTML = '';
			word.forEach(function (w, index) {
				var color = null
				if (index > that.currentCharacter) {
					color = that.getRandomColor();
				} else {
					color = that.textColor;
				}
				that.holder.appendChild(that.generateSingleCharacter(color, w));
			});
		}
		this.then = this.now - (this.delta % this.interval);
	}

	this.restart = function () {
		this.currentCharacter = 0;
		this.needUpdate = true;
	}

	function update(time) {
		time++;
		if (that.needUpdate) {
			that.updateCharacter(time);
		}
		requestAnimationFrame(update);
	}

	this.writeWord(this.holder.innerHTML);


	console.log(this.currentWord);
	update(time);
}

var headline = document.getElementById('headline');
var text = document.getElementById('text');
var welcomeline = document.getElementById('welcomeline');
var shuffler = document.getElementById('shuffler');

var headText = new WordShuffler(headline, {
	textColor: '#aaaaaa',
	timeOffset: 6,
	// mixCapital : true,
	// mixSpecialCharacters : true
});

var pText = new WordShuffler(text, {
	textColor: 'var(--accent-color)',
	timeOffset: 4,
});
var welcomeText = new WordShuffler(welcomeline, {
	textColor: '#aaaaaa',
	timeOffset: 50,
	// mixCapital : true,
	// mixSpecialCharacters : true
});


var buttonText = new WordShuffler(shuffler, {
	textColor: 'tomato',
	timeOffset: 6
});



shuffler.addEventListener('click', function () {
	headText.restart();
	pText.restart();
	welcomeText.restart();
	buttonText.restart();
});


