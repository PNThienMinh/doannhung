var GameStatus = {
  inProgress: 1,
  gameOver: 2
}

var Game = (function() {
  var canvas = [], context = [], grid = [],
      gridHeight = 400, gridWidth = 400, gridBorder = 1,
      gridRows = 10, gridCols = 10, markPadding = 10, shipPadding = 3,
      squareHeight = (gridHeight - gridBorder * gridRows - gridBorder) / gridRows,
      squareWidth = (gridWidth - gridBorder * gridCols - gridBorder) / gridCols,
      turn = false, gameStatus, squareHover = { x: -1, y: -1 },toado = { x: 0, y: 0};

  canvas[0] = document.getElementById('canvas-grid1');    // This player
  canvas[1] = document.getElementById('canvas-grid2');    // Opponent
  context[0] = canvas[0].getContext('2d');
  context[1] = canvas[1].getContext('2d');

  // /**
  //  * Highlight opponent square on hover
  //  */
  // canvas[1].addEventListener('mousemove', function(e) {
  //   var pos = getCanvasCoordinates(e, canvas[1]);
  //   squareHover = getSquare(pos.x, pos.y);
    
  //   drawGrid(1);
  // });

  // /**
  //  * Mouse moved out of opponent grid. Unhighlight.
  //  */


  // canvas[1].addEventListener('mouseout', function(e) {
  //   squareHover = { x: -1, y: -1 };
  //   drawGrid(1);
  // });

  // /**
  //  * Fire shot on mouse click event (if it's user's turn).
  //  */
  // canvas[1].addEventListener('click', function(e) {
  //   if(turn) {
  //     var pos = getCanvasCoordinates(e, canvas[1]);
    
  //     var square = getSquare(pos.x, pos.y);
      
  //     sendShot(square);
  //   }
  // });
//   function stepnew(x,y)
//   {
//     ctx.fillStyle = "#000000";//màu đen
//     ctx.fillRect(x*tileW+5,y*tileH+5,tileW-10,tileH-10);
//   }

//   function stepold(x,y)
//   {
//     ctx.fillStyle = "lightblue";//màu nền 
//     ctx.fillRect(x*tileW+5,y*tileH+5,tileW-10,tileH-10);
//   }

//   function shoot_false(x,y)
//   {
//     ctx.fillStyle = "#e8542c";//màu đỏ bắn trượt 
//     ctx.fillRect(x*tileW+5,y*tileH+5,tileW-10,tileH-10);
//   }
//   function shoot_true(x,y)
//   {
//     ctx.fillStyle = "#0bc41e";//màu xanh lá bắn dính
//     ctx.fillRect(x*tileW+5,y*tileH+5,tileW-10,tileH-10);
//   }

//   var a=0,b=0;

  // function toado(msg)
  // {
  //   if(turn)
  //   {
  //     var x,y;
  //     var square={x:msg[0]*1,y:msg[1]*1};
  //     sendShot(square);
  //   }
  // }


  // function dichuyen(msg)
  // {

  //   var a=[],i,x1=0,y1=0,x2,y2;
  //   squareHover={x:x1*1,y:y1*1};
  //   drawGrid(1);
  //   for(i=0;i<msg.length;i++)
  //   {
  //     a[i]=msg[i]*1;
  //   }
  //   while(1)
  //   {
  //     if(a[0]==1)
  //     {
        
  //     }
  //     if(a[1]==1)
  //     {

  //     }
  //   }
  // }

  document.addEventListener('keydown', function(e) {
    if(turn) {
      
      stepnew_old(toado.y,toado.x,1,1);

      if(e.which==39)//right
      {
          
          
         
          stepnew_old(toado.y,toado.x,1,0);
        
          toado.x=toado.x +1;
          if(toado.x > (gridCols-1))
          {
            toado.x=0;
          }
          stepnew_old(toado.y,toado.x,1,1);
      }
      if(e.which==37)//left
      {
        
         
          stepnew_old(toado.y,toado.x,1,0);
         
          toado.x=toado.x -1;
          if(toado.x < 0)
          {
            toado.x=gridCols-1;
          }
          stepnew_old(toado.y,toado.x,1,1);
      }
      if(e.which==38)//up
      {
       
         
          stepnew_old(toado.y,toado.x,1,0);
         
          toado.y=toado.y -1;
          if(toado.y <0)
          {
            toado.y=gridRows-1;
          }
          stepnew_old(toado.y,toado.x,1,1);
      }
      if(e.which==40)//down
      {
        
          
          stepnew_old(toado.y,toado.x,1,0);
          
          toado.y=toado.y +1;
          if(toado.y > (gridCols-1))
          {
            toado.y=0;
          }
          stepnew_old(toado.y,toado.x,1,1);
      }

      if(e.which==79)//nut o ban
      {
        //if(grid[1].shots[toado.x * gridCols + toado.y] === 0)
          sendShot(toado);
      }


    }
  });


 
  /**
   * Get square from mouse coordinates
   * @param {type} x Mouse x
   * @param {type} y Mouse y
   * @returns {Object}
   */
  function getSquare(x, y) {
    return {
      x: Math.floor(x / (gridWidth / gridCols)),
      y: Math.floor(y / (gridHeight / gridRows))
    };
  };

  /**
   * Get mouse position on canvas relative to canvas top,left corner
   * @param {type} event
   * @param {type} canvas
   * @returns {Object} Position
   */
  function getCanvasCoordinates(event, canvas) {
    rect = canvas.getBoundingClientRect();
    return {
      x: Math.round((event.clientX - rect.left) / (rect.right - rect.left) * canvas.width),
      y: Math.round((event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
    };
  };

  /**
   * Init new game
   */
  function initGame() {
    var i;

    gameStatus = GameStatus.inProgress;
    
    // Create empty grids for player and opponent
    grid[0] = { shots: Array(gridRows * gridCols), ships: [] };
    grid[1] = { shots: Array(gridRows * gridCols), ships: [] };

    for(i = 0; i < gridRows * gridCols; i++) {
      grid[0].shots[i] = 0;
      grid[1].shots[i] = 0;
    }

    // Reset turn status classes
    $('#turn-status').removeClass('alert-your-turn').removeClass('alert-opponent-turn')
            .removeClass('alert-winner').removeClass('alert-loser');

    drawGrid(0);
    drawGrid(1);
  };

  /**
   * Update player's or opponent's grid.
   * @param {type} player
   * @param {type} gridState
   * @returns {undefined}
   */
  function updateGrid(player, gridState) {
    grid[player] = gridState;
    drawGrid(player);
  };

  /**
   * Set if it's this client's turn
   * @param {type} turnState
   * @returns {undefined}
   */
  function setTurn(turnState) {
    if(gameStatus !== GameStatus.gameOver) {
      turn = turnState;

      if(turn) {
        $('#turn-status').removeClass('alert-opponent-turn').addClass('alert-your-turn').html('It\'s your turn!');
      } else {
        $('#turn-status').removeClass('alert-your-turn').addClass('alert-opponent-turn').html('Waiting for opponent.');
      }
    }
  };

  /**
   * Set game over and show winning/losing message
   * @param {Boolean} isWinner
   */
  function setGameOver(isWinner) {
    gameStatus = GameStatus.gameOver;
    turn = false;
    
    if(isWinner) {
      $('#turn-status').removeClass('alert-opponent-turn').removeClass('alert-your-turn')
              .addClass('alert-winner').html('You won! <a href="#" class="btn-leave-game">Play again</a>.');
    } else {
      $('#turn-status').removeClass('alert-opponent-turn').removeClass('alert-your-turn')
              .addClass('alert-loser').html('You lost. <a href="#" class="btn-leave-game">Play again</a>.');
    }
    $('.btn-leave-game').click(sendLeaveRequest);
  }

  /*
   * Draw a grid with squares, ships and shot marks
   */
  function drawGrid(gridIndex) {
    drawSquares(gridIndex);
    drawShips(gridIndex);
    drawMarks(gridIndex);
  };

  /**
   * Draw grid squares/background
   * @param {Number} gridIndex
   */
  function drawSquares(gridIndex) {
    var i, j, squareX, squareY;

    context[gridIndex].fillStyle = '#222222' //màu nền đen là của khung 
    context[gridIndex].fillRect(0, 0, gridWidth, gridHeight);

    for(i = 0; i < gridRows; i++) {
      for(j = 0; j < gridCols; j++) {
        squareX = j * (squareWidth + gridBorder) + gridBorder;
        squareY = i * (squareHeight + gridBorder) + gridBorder;

        context[gridIndex].fillStyle = '#7799FF' //màu xanh dương của ô vuông nhỏ

        // Highlight square if it's user's turn and user hovers over an unfired on, opponent square.


        if(j === squareHover.x && i === squareHover.y &&
                gridIndex === 1 && grid[gridIndex].shots[i * gridCols + j] === 0 && turn) {
          context[gridIndex].fillStyle = '#4477FF';
        }

        context[gridIndex].fillRect(squareX, squareY, squareWidth, squareHeight);
      }
    }
  };

  /**
   * Draw visible ships on grid
   * @param {Number} gridIndex
   */
  function drawShips(gridIndex) {
    var ship, i, x, y,
        shipWidth, shipLength;

    context[gridIndex].fillStyle = '#444444';//màu con tàu
    
    for(i = 0; i < grid[gridIndex].ships.length; i++) {
      ship = grid[gridIndex].ships[i];

      x = ship.x * (squareWidth + gridBorder) + gridBorder + shipPadding;
      y = ship.y * (squareHeight + gridBorder) + gridBorder + shipPadding;
      shipWidth = squareWidth - shipPadding * 2;
      shipLength = squareWidth * ship.size + (gridBorder * (ship.size - 1)) - shipPadding * 2;

      if(ship.horizontal) {
        context[gridIndex].fillRect(x, y, shipLength, shipWidth);
      } else {
        context[gridIndex].fillRect(x, y, shipWidth, shipLength);
      }
    }
  };
  
  /**
   * Draw shot marks on grid (black crosses for missed and red circles for hits)
   * @param {Number} gridIndex
   */
  function drawMarks(gridIndex) {
    var i, j, squareX, squareY;

    for(i = 0; i < gridRows; i++) {
      for(j = 0; j < gridCols; j++) {
        squareX = j * (squareWidth + gridBorder) + gridBorder;
        squareY = i * (squareHeight + gridBorder) + gridBorder;

        // draw black cross if there is a missed shot on square
        if(grid[gridIndex].shots[i * gridCols + j] === 1) {
          context[gridIndex].beginPath();
          context[gridIndex].arc(squareX + squareWidth / 2, squareY + squareWidth / 2,
                                 squareWidth / 2 - markPadding, 0, 2 * Math.PI, false);
          context[gridIndex].fillStyle = '#000000';
          context[gridIndex].fill();
        }
        // draw red circle if hit on square
        else if(grid[gridIndex].shots[i * gridCols + j] === 2) {
          context[gridIndex].beginPath();
          context[gridIndex].arc(squareX + squareWidth / 2, squareY + squareWidth / 2,
                                 squareWidth / 2 - markPadding, 0, 2 * Math.PI, false);
          context[gridIndex].fillStyle = '#E62E2E';
          context[gridIndex].fill();
        }
      }
    }
  };

  function stepnew_old(x,y,gridIndex,check)
  {

    if(check===1)//step new
    {
      // // squareX = y * (squareWidth + gridBorder) + gridBorder;
      // squareY = x * (squareHeight + gridBorder) + gridBorder;
      // context[gridIndex].beginPath();
      // context[gridIndex].arc(squareX + squareWidth / 2, squareY + squareWidth / 2,
      //                        squareWidth / 2 - markPadding, 0, 2 * Math.PI, false);
      // context[gridIndex].fillStyle = '#e5d609';
      // context[gridIndex].fill();

            squareX = y * (squareWidth + gridBorder) + gridBorder+shipPadding;
      squareY = x * (squareHeight + gridBorder) + gridBorder+shipPadding;
      context[gridIndex].fillStyle = '#4477FF';
      context[gridIndex].fillRect(squareX , squareY, squareWidth-shipPadding*2, squareHeight-shipPadding*2);
    }
    if(check===0)//step old
    {
       squareX = y * (squareWidth + gridBorder) + gridBorder+shipPadding;
      squareY = x * (squareHeight + gridBorder) + gridBorder+shipPadding;
      if(grid[gridIndex].shots[x * gridCols + y] === 0 )
      {
      context[gridIndex].fillStyle = '#7799FF';
      context[gridIndex].fillRect(squareX , squareY, squareWidth-shipPadding*2, squareHeight-shipPadding*2);
      }

      if(grid[gridIndex].shots[x * gridCols + y] === 1) {
      context[gridIndex].beginPath();
      context[gridIndex].arc(squareX + squareWidth / 2, squareY + squareWidth / 2,
                             squareWidth / 2 - markPadding, 0, 2 * Math.PI, false);
      context[gridIndex].fillStyle = '#000000';
      context[gridIndex].fill();
      }

      if(grid[gridIndex].shots[x * gridCols + y] === 2) {
          context[gridIndex].beginPath();
          context[gridIndex].arc(squareX + squareWidth / 2, squareY + squareWidth / 2,
                                 squareWidth / 2 - markPadding, 0, 2 * Math.PI, false);
          context[gridIndex].fillStyle = '#E62E2E';
          context[gridIndex].fill();
        }

      //       squareX = y * (squareWidth + gridBorder) + gridBorder;
      // squareY = x * (squareHeight + gridBorder) + gridBorder;
      // context[gridIndex].beginPath();
      // context[gridIndex].arc(squareX + squareWidth / 2, squareY + squareWidth / 2,
      //                        squareWidth / 2 - markPadding, 0, 2 * Math.PI, false);
      // context[gridIndex].fillStyle = '#7799FF';
      // context[gridIndex].fill();
    }

  }

  return {
    'initGame': initGame,
    'updateGrid': updateGrid,
    'setTurn': setTurn,
    'setGameOver': setGameOver

  };
})();
