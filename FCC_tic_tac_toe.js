$(document).ready(function(){

  // showing the modal to make the human player choose a symbol
  $("#myModal").modal("show");

  var playerSymbol;
  var computerSymbol;
  var computerPlayingTurn;
  var playerFirstMoveCenter = false;
  var thirdMoveCenter = false;
  var thirdMoveAngle = false;
  var goingForTris4 = false;
  var goingForLongPlay = false;


  // defining the cells object - temporary values inserted just for easier understanding
  var cells = {
    topleft: false,
    top: false,
    topright: false,
    left: false,
    center: false,
    right: false,
    bottomleft: false,
    bottom: false,
    bottomright: false,
    temporaryCell1: false,
    temporaryCell2: false
  };

  var timesTurnedByNinetyDegrees = 0;
  var turnByNinety = function () {
    cells.temporaryCell1 = cells.left;
    cells.temporaryCell2 = cells.bottomleft;
    cells.left = cells.bottom;
    cells.bottomleft = cells.bottomright;
    cells.bottom = cells.right;
    cells.bottomright = cells.topright;
    cells.right = cells.top;
    cells.topright = cells.topleft;
    cells.top = cells.temporaryCell1;
    cells.topleft = cells.temporaryCell2;
    timesTurnedByNinetyDegrees++;
  };

  var reverseRotation = function() {
    switch (timesTurnedByNinetyDegrees) {
      case 0:
        break;
      case 1:
        turnByNinety();
        turnByNinety();
        turnByNinety();
        timesTurnedByNinetyDegrees = 0;
        break;
      case 2:
        turnByNinety();
        turnByNinety();
        timesTurnedByNinetyDegrees = 0;
        break;
      case 3:
        turnByNinety();
        timesTurnedByNinetyDegrees = 0;
        break;
    };
  };

  // defining a function to update the table after a (computer) move
  var updateTable = function() {
    switch (cells.topleft) {
      case "computer":
        $("#cell1").html("<td id='cell1' class='cellStyle'>" + computerSymbol + "</td>");
        break;
      case "player":
        $("#cell1").html("<td id='cell1' class='cellStyle'>" + playerSymbol + "</td>");
        break;
    };
    switch (cells.top) {
      case "computer":
        $("#cell2").html("<td id='cell2' class='cellStyle'>" + computerSymbol + "</td>");
        break;
      case "player":
        $("#cell2").html("<td id='cell2' class='cellStyle'>" + playerSymbol + "</td>");
        break;
    };
    switch (cells.topright) {
      case "computer":
        $("#cell3").html("<td id='cell3' class='cellStyle'>" + computerSymbol + "</td>");
        break;
      case "player":
        $("#cell3").html("<td id='cell3' class='cellStyle'>" + playerSymbol + "</td>");
        break;
    };
    switch (cells.left) {
      case "computer":
        $("#cell4").html("<td id='cell4' class='cellStyle'>" + computerSymbol + "</td>");
        break;
      case "player":
        $("#cell4").html("<td id='cell4' class='cellStyle'>" + playerSymbol + "</td>");
        break;
    };
    switch (cells.center) {
      case "computer":
        $("#cell5").html("<td id='cell5' class='cellStyle'>" + computerSymbol + "</td>");
        break;
      case "player":
        $("#cell5").html("<td id='cell5' class='cellStyle'>" + playerSymbol + "</td>");
        break;
    };
    switch (cells.right) {
      case "computer":
        $("#cell6").html("<td id='cell6' class='cellStyle'>" + computerSymbol + "</td>");
        break;
      case "player":
        $("#cell6").html("<td id='cell6' class='cellStyle'>" + playerSymbol + "</td>");
        break;
    };
    switch (cells.bottomleft) {
      case "computer":
        $("#cell7").html("<td id='cell7' class='cellStyle'>" + computerSymbol + "</td>");
        break;
      case "player":
        $("#cell7").html("<td id='cell7' class='cellStyle'>" + playerSymbol + "</td>");
        break;
    };
    switch (cells.bottom) {
      case "computer":
        $("#cell8").html("<td id='cell8' class='cellStyle'>" + computerSymbol + "</td>");
        break;
      case "player":
        $("#cell8").html("<td id='cell8' class='cellStyle'>" + playerSymbol + "</td>");
        break;
    };
    switch (cells.bottomright) {
      case "computer":
        $("#cell9").html("<td id='cell9' class='cellStyle'>" + computerSymbol + "</td>");
        break;
      case "player":
        $("#cell9").html("<td id='cell9' class='cellStyle'>" + playerSymbol + "</td>");
        break;
    };
  };

  // define the game start with the first computer move
  var startGame = function() {
    computerPlayingTurn = 1;
    var firstComputerMove = Math.floor(Math.random()*(4-1+1))+1;
    switch(firstComputerMove){
      case 1:
        firstComputerMove = "cell1";
        cells.topleft = "computer";
        break;
      case 2:
        firstComputerMove = "cell3";
        cells.topright = "computer";
        break;
      case 3:
        firstComputerMove = "cell7";
        cells.bottomleft = "computer";
        break;
      case 4:
        firstComputerMove = "cell9";
        cells.bottomright = "computer";
        break;
    };
    $("#"+firstComputerMove).html("<td id='" + firstComputerMove + "' class='cellStyle'>" + computerSymbol + "</td>");
  };

  // symbol selection by the human player and starting the game
  $("#noughtButton").click(function(){
    playerSymbol = "O";
    computerSymbol = "X";
    startGame();
  });
  $("#crossButton").click(function(){
    playerSymbol = "X";
    computerSymbol = "O";
    startGame();
  });

    // setting up a function to check if there is a winning row
  var players = ["computer", "player"];
  var checkWinner = function () {
    for (i = 0; i < players.length; i++) {
      var currentPlayerUnderWinningCheck = players[i];
      if (cells.topleft == currentPlayerUnderWinningCheck && cells.top == currentPlayerUnderWinningCheck && cells.topright == currentPlayerUnderWinningCheck) {
        $("#cell1").fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
        $("#cell2").fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
        $("#cell3").fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
        clearBoard();
          }
      else if (cells.left == currentPlayerUnderWinningCheck && cells.center == currentPlayerUnderWinningCheck && cells.right == currentPlayerUnderWinningCheck) {
        $("#cell4").fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
        $("#cell5").fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
        $("#cell6").fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
        clearBoard();
      }
      else if (cells.bottomleft == currentPlayerUnderWinningCheck && cells.bottom == currentPlayerUnderWinningCheck && cells.bottomright == currentPlayerUnderWinningCheck) {
        $("#cell7").fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
        $("#cell8").fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
        $("#cell9").fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
        clearBoard();
      }
      else if (cells.topleft == currentPlayerUnderWinningCheck && cells.left == currentPlayerUnderWinningCheck && cells.bottomleft == currentPlayerUnderWinningCheck) {
        $("#cell1").fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
        $("#cell4").fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
        $("#cell7").fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
        clearBoard();
      }
      else if (cells.top == currentPlayerUnderWinningCheck && cells.center == currentPlayerUnderWinningCheck && cells.bottom == currentPlayerUnderWinningCheck) {
        $("#cell2").fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
        $("#cell5").fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
        $("#cell8").fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
        clearBoard();
      }
      else if (cells.topright == currentPlayerUnderWinningCheck && cells.right == currentPlayerUnderWinningCheck && cells.bottomright == currentPlayerUnderWinningCheck) {
        $("#cell3").fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
        $("#cell6").fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
        $("#cell9").fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
        clearBoard();
      }
      else if (cells.topleft == currentPlayerUnderWinningCheck && cells.center == currentPlayerUnderWinningCheck && cells.bottomright == currentPlayerUnderWinningCheck) {
        $("#cell1").fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
        $("#cell5").fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
        $("#cell9").fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
        clearBoard();
      }
      else if (cells.topright == currentPlayerUnderWinningCheck && cells.center == currentPlayerUnderWinningCheck && cells.bottomleft == currentPlayerUnderWinningCheck) {
        $("#cell3").fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
        $("#cell5").fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
        $("#cell7").fadeIn(600).fadeOut(600).fadeIn(600).fadeOut(600).fadeIn(600);
        clearBoard();
      };
      };
      if (computerPlayingTurn == 5) {
        clearBoard();
      };
    };


  var makeComputerMove = function () {
    computerPlayingTurn++;
    // defining the second computer move if the player hasn't played the middle square
    if (computerPlayingTurn == 2 && !cells.center) {
      while (cells.topleft != "computer") {
        turnByNinety();
      };
      if (cells.top || cells.topright) {
        cells.bottomleft = "computer";
      }
      else {
        cells.topright = "computer";
      };
      reverseRotation();
      updateTable();
    };
    // defining the third computer move if the player didn't play the middle square as 1st move
    if (computerPlayingTurn == 3 && playerFirstMoveCenter == false) {
      while (cells.topleft != "computer" || cells.topright != "computer") {
        turnByNinety();
      };
      if (!cells.top) {
        cells.top = "computer"; // easy win if the player didn't block the upcoming computer row
      }
      else if ((cells.top == "player" && cells.bottom == "player")
              ||(cells.top == "player" && cells.left == "player")
              || (cells.top == "player" && cells.right == "player"))
                {
        cells.center = "computer";
        thirdMoveCenter = true;
      }
      else {
        if (!cells.bottomright) {
          cells.bottomright = "computer";
        }
        else {
          cells.bottomleft = "computer";
        };
        thirdMoveAngle = true;
      };
      reverseRotation();
      updateTable();
      checkWinner();
    };
    // defining the 4th computer move if the player didn't play the middle square as 1st move and the 3rd move was playing the center
    if (computerPlayingTurn == 4 && playerFirstMoveCenter == false && thirdMoveCenter == true) {
      while (cells.topleft != "computer" || cells.topright != "computer") {
        turnByNinety();
      };
      if (!cells.bottomleft) {
        cells.bottomleft = "computer";
      }
      else {
        cells.bottomright = "computer";
      };
      reverseRotation();
      updateTable();
      checkWinner();
    };
    // defining the 4th move if the player didn't play the middle square as 1st move and the 3rd computer move was playing a free angle
    if (computerPlayingTurn == 4 && playerFirstMoveCenter == false && thirdMoveAngle == true) {
      while (cells.topleft != "computer" || cells.topright != "computer") {
        turnByNinety();
      };
      if (!cells.center) {
        cells.center = "computer";
      }
      else if (!cells.top) {
        cells.top = "computer";
      }
      else if (cells.bottomleft == "computer" && !cells.left) {
        cells.left = "computer";
      }
      else if (cells.bottomright == "computer" && !cells.right) {
        cells.right = "computer";
      }
      reverseRotation();
      updateTable();
      checkWinner();
    };
    // defining the 2nd move if the player played the middle square as 1st move
    if (computerPlayingTurn == 2 && cells.center) {
      playerFirstMoveCenter = true;
      while (cells.topleft != "computer") {
        turnByNinety();
      };
      cells.bottomright = "computer";
      reverseRotation();
      updateTable();
    };
    // defining the 3rd move if the player played the middle square as 1st move
    if (computerPlayingTurn == 3 && playerFirstMoveCenter == true) {
      while (cells.topleft != "computer") {
        turnByNinety();
      };
      if (cells.topright == "player") {
        cells.bottomleft = "computer";
        goingForTris4 = true;
      }
      else if (cells.bottomleft == "player") {
        cells.topright = "computer";
        goingForTris4 = true;
      }
      else {
        // subcase: player took a not-edge cell: now computer blocks his winning move
        if (cells.top == "player") {
          cells.bottom = "computer";
        }
        else if (cells.bottom == "player") {
          cells.top = "computer";
        }
        else if (cells.left == "player") {
          cells.right = "computer";
        }
        else if (cells.right == "player") {
          cells.left = "computer";
        };
        goingForLongPlay = true;
      };
      reverseRotation();
      updateTable();
      checkWinner();
    };
    // defining the 4th move if the player played the middle square as 1st move
    if (computerPlayingTurn == 4 && playerFirstMoveCenter == true) {
      // now if the player took one of the other corners
      if (goingForTris4 == true) {
        while (cells.topleft != "computer") {
        turnByNinety();
      };
        if (cells.topright == "computer" && !cells.top) {
          cells.top = "computer";
        }
        else if (cells.bottomleft == "computer" && !cells.left) {
          cells.left = "computer";
        }
        else if (cells.topright == "computer") {
          cells.right = "computer";
          }
        else if (cells.bottomleft == "computer") {
          cells.bottom = "computer";
        };
        reverseRotation();
      }
      // now if the player didn't take a corner on his second move
      else if (goingForLongPlay) {
        while (cells.topleft != "computer") {
        turnByNinety();
        };
        // now if the player didn't block the potential row
        if (cells.top == "computer" && !cells.topright) {
          cells.topright = "computer";
        }
        else if (cells.right == "computer" && !cells.topright) {
          cells.topright = "computer";
        }
        else if (cells.left == "computer" && !cells.bottomleft) {
          cells.bottomleft = "computer";
        }
        else if (cells.bottom == "computer" && !cells.bottomleft) {
          cells.bottomleft = "computer";
        }
        // now if the player blocked the potential row
        else if (cells.topright == "player") {
          cells.bottomleft = "computer";
        }
        else if (cells.bottomleft == "player") {
          cells.topright = "computer";
        };
        reverseRotation();
      };
      updateTable();
      checkWinner();
    }; // this ends the 4th move instructions
    // now going for the 5th move - it should happen only when the player takes the center cell as first move. Play the last remaining cell
    if (computerPlayingTurn == 5 && playerFirstMoveCenter == true) {
      while (cells.topleft != "computer") {
        turnByNinety();
        };
      if (cells.top == false) {
        cells.top = "computer";
      }
      else if (cells.topright == false) {
        cells.topright = "computer";
      }
      else if (cells.left == false) {
        cells.left = "computer";
      }
      else if (cells.right == false) {
        cells.right = "computer";
      }
      else if (cells.bottomleft == false) {
        cells.bottomleft = "computer";
      }
      else if (cells.bottom == false) {
        cells.bottom = "computer";
      };
      reverseRotation();
      updateTable();
      checkWinner();
    }; // this ends the 5th move instructions
  }; // this ends the makeComputerMove function


  // allowing the human player to make a move and trigger the computer move
  $("#cell1").click(function(){
    if (!cells.topleft) {
      $("#cell1").html("<td id='cell1' class='cellStyle'>" + playerSymbol + "</td>");
      cells.topleft = "player";
      checkWinner();
      makeComputerMove();
    };
  });
  $("#cell2").click(function(){
    if (!cells.top) {
      $("#cell2").html("<td id='cell2' class='cellStyle'>" + playerSymbol + "</td>");
      cells.top = "player";
      checkWinner();
      makeComputerMove();
    };
  });
  $("#cell3").click(function(){
    if (!cells.topright) {
      $("#cell3").html("<td id='cell3' class='cellStyle'>" + playerSymbol + "</td>");
      cells.topright = "player";
      checkWinner();
      makeComputerMove();
    };
  });
  $("#cell4").click(function(){
    if (!cells.left) {
      $("#cell4").html("<td id='cell4' class='cellStyle'>" + playerSymbol + "</td>");
      cells.left = "player";
      checkWinner();
      makeComputerMove();
    };
  });
  $("#cell5").click(function(){
    if (!cells.center) {
      $("#cell5").html("<td id='cell5' class='cellStyle'>" + playerSymbol + "</td>");
      cells.center = "player";
      checkWinner();
      makeComputerMove();
    };
  });
  $("#cell6").click(function(){
    if (!cells.right) {
      $("#cell6").html("<td id='cell6' class='cellStyle'>" + playerSymbol + "</td>");
      cells.right = "player";
      checkWinner();
      makeComputerMove();
    };
  });
  $("#cell7").click(function(){
    if (!cells.bottomleft) {
      $("#cell7").html("<td id='cell7' class='cellStyle'>" + playerSymbol + "</td>");
      cells.bottomleft = "player";
      checkWinner();
      makeComputerMove();
    };
  });
  $("#cell8").click(function(){
    if (!cells.bottom) {
      $("#cell8").html("<td id='cell8' class='cellStyle'>" + playerSymbol + "</td>");
      cells.bottom = "player";
      checkWinner();
      makeComputerMove();
    };
  });
  $("#cell9").click(function(){
    if (!cells.bottomright) {
      $("#cell9").html("<td id='cell9' class='cellStyle'>" + playerSymbol + "</td>");
      cells.bottomright = "player";
      checkWinner();
      makeComputerMove();
    };
  });


  // defining a function to clear the board and prepare for the next game
  var timeoutID;

  function clearBoard() {
    timeoutID = window.setTimeout(prepareNewBoard, 3000);
  };

  var prepareNewBoard = function() {
    for (i = 1; i <= 9; i++) {
      $("#cell"+i).html("<td id='cell" + i + "' class='cellStyle'></td>");
    };
    cells = {
      topleft: false,
      top: false,
      topright: false,
      left: false,
      center: false,
      right: false,
      bottomleft: false,
      bottom: false,
      bottomright: false,
      temporaryCell1: false,
      temporaryCell2: false
    };
    computerPlayingTurn = 0;
    playerFirstMoveCenter = false;
    thirdMoveCenter = false;
    thirdMoveAngle = false;
    goingForTris4 = false;
    goingForLongPlay = false;
    startGame();
  };


});
