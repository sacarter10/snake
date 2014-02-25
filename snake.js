//don't let snake hit walls -- snake dies
//levels -- snake should speed up

window.snakeGame = (function (lib) {

	lib.Coord = function (row, col) {
		this.row = row;
		this.col = col;
	}

	lib.Snake = function (board) {
		// deltas are in format row, col
		this.deltas = { 
			N: new lib.Coord(-1, 0), S: new lib.Coord(1, 0),
			E: new lib.Coord(0, 1), W: new lib.Coord(0, -1)
		};

		this.board = board;
		this.direction = "E";
		this.moving = false;

		// segments starts with tail and ends with head
		this.segments = [new lib.Coord(0, 0), new lib.Coord(0, 1), 
											new lib.Coord(0, 2), new lib.Coord(0, 3)];
	}

	lib.Snake.prototype.head = function () {
		return this.segments[this.segments.length -1];
	}

	lib.Snake.prototype.findApple = function (apples) {
		var that = this;
		var appleFound = false;

		_.each(apples, function (apple, index) {
			if (apple.row === that.head().row && apple.col === that.head().col) {
				apples.splice(index, 1);
				that.board.points += 5;
				appleFound = true;
			}
		})

		return appleFound;
	}

	lib.Snake.prototype.isDead = function () {
		var dead = false; 
		var that = this;

		_.each(this.segments, function (segment, index) {
			if (index === (that.segments.length - 1)) {
				return;
			}

			if (segment.row === that.head().row && segment.col === that.head().col) {
				dead = true;
			}
		})

		return dead;
	}

	lib.Snake.prototype.move = function () {
		if (!(this.findApple(this.board.apples))) {
			// remove end of tail
			this.segments = this.segments.slice(1);
		}

		var newHead = this.head().plus(this.deltas[this.direction]);
		this.segments.push(newHead);
	}

	lib.Snake.prototype.turn = function (newDir) {	
		if (this.direction == 'E' && newDir == 'W') {
			return false;
		} else if (this.direction == 'W' && newDir == 'E') {
			return false;
		} else if (this.direction == 'N' && newDir == 'S') {
			return false;
		} else if (this.direction == 'S' && newDir == 'N') {
			return false;
		}

		this.direction = newDir;
		return true;
	}

	lib.Coord.prototype.plus = function (otherCoord) {
		return new lib.Coord((this.row + otherCoord.row), (this.col + otherCoord.col));
	}

	lib.Board = function (height, width) {
		if (height == undefined) {
			this.height = 20;
		} else {
			this.height = height;
		}

		if (width === undefined) {
			this.width = 20;
		} else {
			this.width = width;
		}

		this.snake = new lib.Snake(this);
		this.points = 0;
		this.numApples = 0;
		this.gameOver = false;
		this.addApples();
		this.grid = this.render();
	}

	lib.Board.prototype.addApples = function () {
		this.numApples += 5;
		var locations = [];

		for (var i = 0, j = this.numApples; i < j; i++) {
			var row = Math.floor(Math.random() * this.height);
			var col = Math.floor(Math.random() * this.width);

			locations.push(new lib.Coord(row, col));
		}

		this.apples = locations;
		return locations;
	} 

	lib.Board.prototype.moveSnake = function () {
		this.snake.move();

		if (this.snake.isDead()) {
			this.gameOver = true;
		} 
		
		if (this.apples.length === 0) {
			this.addApples();
		}
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

		for (var k = 0, p = this.apples.length; k < p; k++) {
			var row = this.apples[k].row;
			var col = this.apples[k].col;

			boardPic[row][col] = "S";
		}

		// var stringBoard = "";

		// for (var i = 0, n = this.height; i < n; i++) {
		// 	for (var j = 0, m = this.width; j < m; j++) {
		// 		stringBoard += (boardPic[i][j] + " ");
		// 	}

		// 	stringBoard += "\n";
		// }

		return boardPic;
	}

	return lib;
})(window.snakeGame || {});

