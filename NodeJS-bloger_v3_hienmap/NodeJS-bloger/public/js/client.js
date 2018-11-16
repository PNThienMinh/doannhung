
var socket = io.connect("http://localhost:3000");

//  tạo map
//document.getElementById("game").addEventListener("load",createMap);


 

$(function() {
  /**
   * Successfully connected to server event
   */
  socket.on('connect', function() {
    console.log('Connected to server.');
    $('#disconnected').hide();
    $('#waiting-room').show();   
    $('#game').hide();
  });


  /**
   * Disconnected from server event
   */
  socket.on('disconnect', function() {
    console.log('Disconnected from server.');
    $('#waiting-room').hide();
    $('#game').hide();
    $('#disconnected').show();
  });

 /**
   * User has joined a game
   */
  socket.on('join', function(gameId) {
    Game.initGame();
    $('#messages').empty();
    $('#disconnected').hide();
    $('#waiting-room').hide();
    $('#game').show();
    $('#game-number').html(gameId);
  })

  /**
   * Update player's game state
   */
  socket.on('update', function(gameState) {
    Game.setTurn(gameState.turn);
    Game.updateGrid(gameState.gridIndex, gameState.grid);
  });





  /**
   * Change game status to game over
   */
  socket.on('gameover', function(isWinner) {
    Game.setGameOver(isWinner);
  });
  
  /**
   * Leave game and join waiting room
   */
  socket.on('leave', function() {
    $('#game').hide();
    $('#waiting-room').show();
  });

 
});

/**
 * Send leave game request
 * @param {type} e Event
 */
function sendLeaveRequest(e) {
  e.preventDefault();
  socket.emit('leave');
}

/**
 * Send shot coordinates to server
 * @param {type} square
 */
function sendShot(square) {
  socket.emit('shot', square);
}
