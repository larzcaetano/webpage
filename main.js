window.onload = function() {
	let body = document.body;
	body.width = window.innerWidth;
	body.height = window.innerHeight;
	body.style.backgroundColor = "rgb(255, 255, 255)";

	let createTextNode = function(parent, text) {
		let textNode = document.createTextNode(text);
		parent.appendChild(textNode);
		return true;
	}

	let div = document.createElement("div");
	div.style.width = "100%";
	div.style.margin = "auto";
	div.style.height = "90px";
	div.style.fontSize = "3em";
	div.style.textAlign = "center";
	div.style.position = "absolute";
	div.style.top = "50%";
	div.style.left = "50%";
	div.style.transform = "translate(-50%, -50%)";

	let options = MathJax.getMetricsFor(div, true);
	let html = MathJax.tex2svg(`\\color{black}{\\boxed{
		\\oint\\limits_{\\partial R} \\vec{F}\\cdot\\mathrm{d}\\vec{s} = 
		\\iint\\limits_{R} \\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y} \\mathrm{d}A
	}}`, options)
	html.style.margin = "auto";
	html.style.top = "50%"
	html.style.transform = "translate(0%, -50%)";
	div.appendChild(html);
	body.appendChild(div);
}