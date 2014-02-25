//track high score using local storage

window.snakeGameUI = (function (lib) {

	lib.renderBoard = function (board) {
		$('.board').empty();

		for (var i = 0, n = board.height; i < n; i++) {
			var $newRow = $('<div class="row"></div>').appendTo('.board');

			for (var j = 0, m = board.width; j < m; j++) {
				$newRow.append('<div class="square"></div>');
			}
		}

		$('.points').html("<p>Points: " + board.points + "</p>");
		lib.renderApples(board);
		lib.renderSnake(board.snake);
	}	

	lib.setUpEventListeners = function (board) {
		$($('body').keydown(function (event) {
			if (!board.snake.moving) {
				board.snake.moving = true;
				// TODO: global variables ahhh
				window.intervalID = window.setInterval(lib.moveLoop.bind(null, board), 500);
			}

      if (event.keyCode == '37') {
      	board.snake.turn('W');
      } else if (event.keyCode == '39') {
      	board.snake.turn('E');
      } else if (event.keyCode == '38') {
      	board.snake.turn('N');
      } else if (event.keyCode == '40') {
      	board.snake.turn('S');
      }
		}));
	}

	lib.startGame = function () {
		var board = new snakeGame.Board();
		lib.renderBoard(board);
			
		lib.setUpEventListeners(board);
	}

	lib.moveLoop = function (board) {
		board.moveSnake();

		if (board.gameOver) {
			$('.message').html("<p>GAME OVER</p>");
			clearInterval(intervalID);
		} 

		lib.renderBoard(board);
	}

	lib.renderApples = function (board) {
		for (var i = 0, n = board.apples.length; i < n; i++) {
			var row = board.apples[i].row;
			var col = board.apples[i].col;

			$('.row:eq(' + row + ') .square:eq(' + col + ')').addClass('apple');
		}
	}

	lib.renderSnake = function (snake) {
		for (var i = 0, n = snake.segments.length; i < n; i++) {
			var row = snake.segments[i].row;
			var col = snake.segments[i].col;

			$('.row:eq(' + row + ') .square:eq(' + col + ')').addClass('snake');
		}
		$('.row:eq(' + snake.head().row + ') .square:eq(' + 
		snake.head().col + ')').addClass('snakeHead');
	
	}


})(window.snakeGame || {});





