let screen;

let centerx;
let centery;

let radius;

let hours = 0;
let minutes = 0;

let hoursx = 0;
let hoursy = 0;

let minutesx = 0;
let minutesy = 0;

function gethours() {
	return hours < 0 ? TAU + hours : hours;
}

function getminutes() {
	return minutes < 0 ? TAU + minutes : minutes;
}





//listen for events
let holding = false;
let selected = "";
let lasthour = 0;

function getselected() {
	let x0 = mouseX - hoursx;
	let y0 = mouseY - hoursy;

	let x1 = mouseX - minutesx;
	let y1 = mouseY - minutesy;

	let d0 = x0*x0 + y0*y0;
	let d1 = x1*x1 + y1*y1;
	if (d0 < 1024 && d1 < 1024) {
		if (d0 < d1) {
			selected = "hours";
		}
		else {
		  	selected = "minutes";
		  	let deghours = floor(floor(gethours()*180/PI)/30);
		  	//console.log(deghours);
		  	lasthour = deghours;
		}
	}
	else if (d0 < 1024) {
		selected = "hours";
	}
	else if (d1 < 1024) {
		selected = "minutes";
		let deghours = floor(floor(gethours()*180/PI)/30);
		//console.log(deghours);
		lasthour = deghours;
	}
}

function mousePressed() {
	holding = true;
	getselected();
}
function touchStarted() {
	holding = true;
	getselected();
}

function mouseReleased() {
	holding = false;
	selected = "";
}
function touchEnded() {
	holding = false;
	selected = "";
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

	centerx = windowWidth/2;
	centery = windowHeight/2;

	radius = windowHeight/2 - 100;
}





function setup() {
	screen = createCanvas(windowWidth, windowHeight);

	function preventDefault(e){
		e.preventDefault();
	}

	function disableScroll(){
		document.body.addEventListener('touchmove', preventDefault, { passive: false });
	}
	function enableScroll(){
		document.body.removeEventListener('touchmove', preventDefault);
	}
	disableScroll();

	centerx = windowWidth/2;
	centery = windowHeight/2;

	radius = windowHeight/2 - 100;
}

let lastp = 0;
function draw() {
	background(0);

	fill(255);
	noStroke();
	ellipse(centerx, centery, 16, 16);

	noFill();
	stroke(255);
	strokeWeight(4);

	ellipse(centerx, centery, 2*radius, 2*radius);

	fill(255);
	noStroke();
	textSize(32);
	textAlign(CENTER, CENTER);

	for (let i = 0; i < 12; i++) {
		let co = cos(i*PI/6 - PI/2);
		let si = sin(i*PI/6 - PI/2);

		let x = centerx + co*(radius - 32);
		let y = centery + si*(radius - 32);

		let hour = i <= 0 ? 12 : i;
		text(hour, x, y);
	}

	if (holding) {
		fill(0, 255, 255);
		noStroke();
		ellipse(mouseX, mouseY, 16, 16);
	}

	noFill();
	stroke(255);
	strokeWeight(16);

	let mco = cos(minutes - PI/2);
	let msi = sin(minutes - PI/2);
	minutesx = centerx + mco*(radius - 64);
	minutesy = centery + msi*(radius - 64);
	line(centerx, centery, minutesx, minutesy);

	noFill();
	stroke(255, 255, 255, 32);
	strokeWeight(2);
	ellipse(minutesx, minutesy, 64, 64);

	noFill();
	stroke(200);
	strokeWeight(8);

	let hco = cos(hours - PI/2);
	let hsi = sin(hours - PI/2);
	hoursx = centerx + hco*(radius/2 - 32);
	hoursy = centery + hsi*(radius/2 - 32);
	line(centerx, centery, hoursx, hoursy);

	noFill();
	stroke(200, 200, 200, 32);
	strokeWeight(2);
	ellipse(hoursx, hoursy, 64, 64);

	if (selected == "hours") {
		let dx = mouseX - centerx;
		let dy = mouseY - centery;
		hours = atan2(dx, -dy);

		let percentage = (gethours()%(PI/6))/(PI/6);
		minutes = percentage*TAU;
		//text(percentage, centerx, centery);
	}
	else if(selected == "minutes") {
		let dx = mouseX - centerx;
		let dy = mouseY - centery;
		minutes = atan2(dx, -dy);

		let percentage = (getminutes()%TAU)/TAU;
		let delta = percentage - lastp;
		lastp = percentage;
		if (delta < -1/2) {
		  	lasthour = lasthour + 1;
		  	if (11 < lasthour) {
		    	lasthour = 0;
		  	}
		}
		else if (1/2 < delta) {
	  		lasthour = lasthour - 1;
	  		if (lasthour < 0) {
	    		lasthour = 11;
	  		}
		}
		hours = PI/6*(percentage + lasthour);
	}

	let h = floor((gethours()*180/PI)/30);
	let m = floor((getminutes()*180/PI)/6);
	if (h < 10) {
		h = "0" + h;
	}
	if (m < 10) {
		m = "0" + m;
	}

	let time = h + ":" + m;
	fill(255);
	noStroke();
	textSize(48);
	text(time, centerx, centery - radius - 32);
}
