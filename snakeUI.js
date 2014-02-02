window.snakeGame = (function (lib) {
	lib.setUpBoard = function () {
		var board = new snakeGame.Board();

		for (var i = 0, n = board.height; i < n; i++) {
			console.log($('.board'));
			$('.board').append('<div class="row"</div>');

			for (var j = 0, m = board.width; j < m; j++) {
				$('.board row:last-child').append('<div class="row"</div>');
			}
		}
	}	

	$(lib.setUpBoard());



	$($('body').keydown(function (event) {
    console.log("You pressed keycode: " + event.keyCode);
	}));


})(window.snakeGame || {})

// (function () = {
//     function SnakeUI() {
//         this.game = new SnakeGame.Game();
//     }

//     SnakeUI.prototype.start = function () {
//         console.log("game started")
//         this.render();
//     }

//     SnakeUI.prototype.render = function () {
//         $('.board').empty();
//         console.log("running render!";)
//         for (var x = 0; x < this.game.width; x++)  {
//             $('.board').append("<div class='" + x + "'></div>")

//             for (var y = 0; y < this.game.height; y++) {
//                 $('div.' + x).append("<span class='" + y + "'></span>")
//             }
//         }
//     }


// })();

// $(function() {
//     console.log("hello from SnakeUI");
//     prettyGame = new SnakeUI();
//     prettyGame.start();
// });

