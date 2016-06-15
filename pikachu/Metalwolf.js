var timeID = 0;
var elTimebar = document.getElementById("timebar");

function startCountDown() {
	if (timeID > 0) clearInterval(timeID);
	elTimebar.tmp = 572;
	elTimebar.style.height = "572px";
	timeID = setInterval("decTime()", 1000);
}

function decTime() {
	elTimebar.tmp--;
	elTimebar.style.height = elTimebar.tmp + "px";
	
	if (elTimebar.tmp == 0) {
		clearInterval(timeID);
		alert("Đã hết thời gian");
		el.createBigGame();
	}
}

function getMouseButton(evt) {
	if (window.event) {
		var tmp = evt.button;
		if (tmp == 0) {		return 0;		}
		if (tmp == 1) return 1;
		if (tmp == 2) return 2;
	} else {
		return evt.button;
	}
}

function repaint(id, value) {
	var el = document.getElementById(id);
	if (el.hasChildNodes())
		el.removeChild(el.firstChild);
	el.appendChild(document.createTextNode(value));
}

function getRRR(p1, p2) {
	var x1, y1, x2, y2;
	
	if (p1.x < p2.x) {
		x1 = p1.x; x2 = p2.x;
	} else {
		x2 = p1.x; x1 = p2.x;
	}
	
	if (p1.y < p2.y) {
		y1 = p1.y; y2 = p2.y;
	} else {
		y2 = p1.y; y1 = p2.y;
	}
	
	return new Rectangle(x1 - 3, y1 - 3, x2 - x1 + 6, y2 - y1 + 6);
}

function findCentre(i, j) {
	return new Point(
			i * PieceWidth + PieceWidth / 2,
			j * PieceHeight + PieceHeight / 2
	);
}