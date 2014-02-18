window.snakeGameUI = (function (lib) {

	lib.renderBoard = function (board) {
		$('.board').empty();

		for (var i = 0, n = board.height; i < n; i++) {
			var $newRow = $('<div class="row"></div>').appendTo('.board');

			for (var j = 0, m = board.width; j < m; j++) {
				$newRow.append('<div class="square"></div>');
			}
		}

		lib.renderSnake(board.snake);
	}	

	lib.setUpEventListeners = function (board) {
		$($('body').keydown(function (event) {
			if (!board.snake.moving) {
				board.snake.moving = true;
				window.setInterval(lib.moveLoop.bind(null, board), 500);
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
		board.snake.move();
		lib.renderBoard(board);
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





