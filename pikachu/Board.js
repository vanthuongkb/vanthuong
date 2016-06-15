var BoardWidth = PieceWidth * 18;
var BoardHeight = PieceHeight * 11;

function newBoard() {
	var div = document.createElement("div");
	div.lines = new Array;
	for (var i = 0; i < 3; i++) {
		div.lines[i] = document.createElement("div");
		div.lines[i].style.position = "absolute";
		div.lines[i].style.visibility = "hidden";
		div.lines[i].style.backgroundColor = "red";
		div.appendChild(div.lines[i]);
	}
	
	div.arrPiece = newArray(17);
	
	for (var i = 1; i <= 16; i++)
		for (var j = 1; j <= 9; j++) {
			div.arrPiece[i][j] = newPiece(div, i, j, 0);
			div.appendChild(div.arrPiece[i][j]);
		}
	
	div.style.position = "relative";
	div.style.width = BoardWidth + "px";
	div.style.height = BoardHeight + "px";
	
	div.setRandomBgr = function() {
		this.style.backgroundImage = "url("+ imageFolder +"'bgr" + getRandom(4) + ".jpg')";
	}
	
	div.setNewLevel = function(level) {
		this.level = level;
		this.arrValue = getNewMatrix();
		this.isWaiting = false;
		
		repaint("level", this.level);
		repaint("blood", this.blood);
		repaint("score", this.score);
		
		this.applyMatrix();
		
		this.setRandomBgr();
		startCountDown();
	}
	
	div.setNextLevel = function() {
		if (this.level == 9) {
			alert("Chúc mừng bạn đã chiến thắng!!!");
			this.createBigGame();
		} else {
			this.level++;
			this.blood++;
			//this.score = 0;
			alert("Lên level " + this.level);
			this.setNewLevel(this.level);
		}
	}
	
	div.createBigGame = function() {
		this.level = 1;
		this.blood = 10;
		this.score = 0;
		this.setNewLevel(this.level);
	}
	
	div.drawPath = function(arrayList) {
		var point1 = arrayList[0];
		var point2;
		var centre1, centre2;
		
		var i, rect;
		
		for (i = 1; i < arrayList.length; i++) {
			point2 = arrayList[i];
			centre1 = findCentre(point1.x, point1.y);
			centre2 = findCentre(point2.x, point2.y);
			
			rect = getRRR(centre1, centre2);
			this.lines[i - 1].style.left = rect.x + "px";
			this.lines[i - 1].style.top = rect.y + "px";
			this.lines[i - 1].style.width = rect.width + "px";
			this.lines[i - 1].style.height = rect.height + "px";
			
			point1 = point2;
		}
		
		for (i = 1; i < arrayList.length; i++)
			this.lines[i - 1].style.visibility = "visible";
	}
	
	div.onClickPiece = function(evt, iClick, jClick) {
		var mybutton = getMouseButton(evt);
		
		if (mybutton == 0) {
			if (this.isWaiting) {
				this.isWaiting = false;
				var list = checkPath(this.arrValue, this.iFist, this.jFist, iClick, jClick);
				if (list != null) {
					this.arrValue[this.iFist][this.jFist] = 0;
					this.arrValue[iClick][jClick] = 0;
					this.arrPiece[this.iFist][this.jFist].setVisible(false);
					this.arrPiece[iClick][jClick].setVisible(false);
					
					this.drawPath(list);
					setTimeout("afterDrawPath()", 200);
				} else {
					this.arrPiece[this.iFist][this.jFist].setSelected(100);
				}
			} else {
				this.iFist = iClick;
				this.jFist = jClick;
				this.arrPiece[iClick][jClick].setSelected(50);
				this.isWaiting = true;
			}
		}
	}
	
	div.onmousedown = function(evt) {
		
		if (window.event) evt = window.event;
		var tmp = getMouseButton(evt);	
		if (tmp == 2 && this.isWaiting) {
			this.arrPiece[this.iFist][this.jFist].setSelected(100);
			this.isWaiting = false;
		} else if (tmp == 1) {
			var rect = findCheat(this.arrValue);
			this.arrPiece[rect.x][rect.y].setSelected(50);
			this.arrPiece[rect.width][rect.height].setSelected(50);
		}
	}
	
	div.applyMatrix = function() {
		var i, j;
		for (i = 1; i <= 16; i++)
			for (j = 1; j <= 9; j++) {
				if (this.arrValue[i][j] == 0)
					this.arrPiece[i][j].setVisible(false);
				else {
					this.arrPiece[i][j].setVisible(true);
					this.arrPiece[i][j].setSelected(100);
					this.arrPiece[i][j].setImage(this.arrValue[i][j]);
				}
			}
	}
	
	return div;
}

function afterDrawPath() {
	// erase path
	for (var i = 0; i < 3; i++)
		el.lines[i].style.visibility = "hidden";
	el.score += 10;
	repaint("score", el.score);
	if (el.score % 720 == 0) {
		clearInterval(timeID);
		el.setNextLevel();
		return;
	}
	
	if (el.level > 1) {
		fixMatrix(el.arrValue, el.level);
		el.applyMatrix();
	}
	
	if (isEnd(el.arrValue)) {
		el.blood--;
		repaint("blood", el.blood);
		
		if (el.blood == 0) {
			clearInterval(timeID);
			alert("Rất tiếc bạn đã thua!");
			el.createBigGame();
		} else {
			alert("Hết nước đi");
			repairMatrix(el.arrValue);
			el.applyMatrix();
		}
	}
}
