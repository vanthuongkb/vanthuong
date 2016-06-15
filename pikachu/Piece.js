var PieceWidth = 42;
var PieceHeight = 52;

function newPiece(board, col, row, value) {
	var div = document.createElement("div");
	div.image = document.createElement("img");
	
	div.setImage = function(imgIndex) {
		this.image.src = imageFolder + "pieces" + imgIndex + ".png";
		this.valueInMatrix = imgIndex;
	}
	
	if (value > 0) div.setImage(value);
	
	div.appendChild(div.image);
	
	div.board = board;
	div.colIndex = col;
	div.rowIndex = row;
	
	div.style.position = "absolute";
	div.style.left = col * PieceWidth + "px";
	div.style.top = row * PieceHeight + "px";
	div.style.width = PieceWidth + "px";
	div.style.height = PieceHeight + "px";
	
	div.isVisible = true;
	
	div.setVisible = function(flag) {
		this.isVisible = flag;
		this.style.visibility = flag ? "visible" : "hidden";
	}
	
	div.setBorder = function(thick, color) {
		this.image.border = thick;
		this.image.style.borderColor = color;
	}
	
	div.setHightlight = function() {
		this.setBorder(1, "red");
	}
	
	div.setSelected = function(opacity) {
		opacity = (opacity == 100)?99.999:opacity;
		// IE/Win
		this.image.style.filter = "alpha(opacity:"+ opacity + ")";
  
		// Safari < 1.2, Konqueror
		this.image.style.KHTMLOpacity = opacity / 100;
  
		// Older Mozilla and Firefox
		this.image.style.MozOpacity = opacity / 100;
  
		// Safari 1.2, newer Firefox and Mozilla, CSS3
		this.image.style.opacity = opacity / 100;
	}

	div.setNormal = function() {
		this.setBorder(1, "#009933");
	}
	
	div.onmouseover = function() {
		this.setHightlight();
	}
	
	div.onmouseout = function() {
		this.setNormal();
	}
	
	div.onmousedown = function(evt) {
		if (window.event) evt = window.event;
		this.board.onClickPiece(evt, this.colIndex, this.rowIndex);
	}
	
	div.setNormal();
	
	return div;
}