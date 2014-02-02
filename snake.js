window.snakeGame = (function (lib) {

	lib.Coord = function (row, col) {
		this.row = row;
		this.col = col;
	}

	lib.Snake = function (height, width) {
		// deltas are in format row, col
		this.deltas = { 
			N: new lib.Coord(-1, 0), S: new lib.Coord(1, 0),
			E: new lib.Coord(0, 1), W: new lib.Coord(0, -1)
		};
		this.direction = "E";

		// segments starts with tail and ends with head
		this.segments = [new lib.Coord(0, 0), new lib.Coord(0, 1), 
											new lib.Coord(0, 2), new lib.Coord(0, 3)];

		this.head = function () {
			return this.segments[this.segments.length -1];
		}
	}

	lib.Snake.prototype.head = function () {
		return this.segments[-1];
	}

	lib.Snake.prototype.move = function () {
		// remove end of tail
		this.segments = this.segments.slice(1);

		var newHead = this.head().plus(this.deltas[this.direction]);
		this.segments.push(newHead);
	}

	lib.Snake.prototype.turn = function (newDir) {
		this.direction = newDir;
	}

	lib.Coord.prototype.plus = function (otherCoord) {
		return new lib.Coord((this.row + otherCoord.row), (this.col + otherCoord.col));
	}

	lib.Board = function (height, width) {
		if (height == undefined) {
			this.height = 20;
		} else {
			this.width = width;
		}

		if (width === undefined) {
			this.width = 20;
		} else {
			this.width = width;
		}

		this.snake = new lib.Snake(height, width);

		this.grid = this.render();
	}

	lib.Board.prototype.render = function () {
		var boardPic = [];

		for (var i = 0, n = this.height; i < n; i++) {
			boardPic.push([]);

			for (var j = 0, m = this.width; j < m; j++) {
				boardPic[i].push('.');
			}
		}

		for (var k = 0, p = this.snake.segments.length; k < p; k++) {
			var row = this.snake.segments[k].row;
			var col = this.snake.segments[k].col;

			boardPic[row][col] = "S";
		}

		var stringBoard = "";

		for (var i = 0, n = this.height; i < n; i++) {
			for (var j = 0, m = this.width; j < m; j++) {
				stringBoard += (boardPic[i][j] + " ");
			}

			stringBoard += "\n";
		}

		console.log(stringBoard);

		return boardPic;
	}

	return lib;
})(window.snakeGame || {});

