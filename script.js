let statusMsg = document.querySelector("#message");
let player = "X";
let computer = "O";
let currentPlayer = "";
let cells = document.querySelectorAll(".cell");
let restartBtn = document.querySelector("#restart")
let startBtn = document.querySelector('#next');
let startOver = document.querySelector('#startOver');
let running = false;
let startTime=new Date();
let firstPlayer = randomInt();
console.log(firstPlayer);

function randomInt() {
  return Math.floor(Math.random() * 2);
}

function randomID() {
  return Math.floor(Math.random() * 9);
}


window.addEventListener("load", function () {
  statusMsg.innerHTML = "Welcome! Who'd you like to play against?";
});

//Checking win conditions

const winningGames = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];


function gameType() {
  let compVsPlayer = document.getElementById("pxc");
  let playerVsPlayer = document.getElementById("pxp");
  startBtn.addEventListener("click", function () {
    if (compVsPlayer.checked) {
      alert("You are up against the computer");
      startGame();
    }
    else if (playerVsPlayer.checked) {
      alert("You are up against another player");
      opponentMatch();
    }
  }) 
}


function startGame() {
  running = true;
  playerTurn();
}



function playerTurn() {
  if (firstPlayer === 0) {
    statusMsg.innerHTML = "X starts the game";
    for (var i = 0; i < cells.length; i++) {
      cells[i].innerText = '';
      cells[i].addEventListener('click', function () {
        let cellIndex = this.getAttribute('cellIndex');
        if (options[cellIndex] != "" || !running) {
          return;
        }
        else {
          options[cellIndex] = player;
          document.getElementById("td_" + cellIndex).innerText = player;
          setTimeout(compTurn, 500);
          checkWinner();
          
        }

      });
    }
  }
  else if (firstPlayer === 1) {
    statusMsg.innerHTML = "O starts the game";
    compTurn();
    for (var i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', function () {
        let cellIndex = this.getAttribute('cellIndex');
        if (options[cellIndex] != "" || !running) {
          return;
        }
        else {
          options[cellIndex] = player;
          document.getElementById("td_" + cellIndex).innerHTML = player;
          setTimeout(compTurn, 500);
          checkWinner();
        }

      });
    }
  }
}

  function compTurn() {
    compID = randomID();
    compCell = document.getElementById("td_" + compID);

    if (compCell.innerHTML === '' && running) {
      compCell.innerHTML = computer;
      options[compID] = computer;
      console.log(options);
      checkWinner();
    }
    else {
      compTurn();
    }
  }

  console.log(winningGames.length);
  console.log(options);

  function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningGames.length; i++) {
      const condition = winningGames[i];
      const cellA = options[condition[0]];
      const cellB = options[condition[1]];
      const cellC = options[condition[2]];

      if (cellA == "" || cellB == "" || cellC == "") {
        continue;
      }
      if (cellA == cellB && cellB == cellC) {
        roundWon = true;
        winner = cellA;
        console.log(winner);
      }

    }

    if (roundWon) {
      statusMsg.innerHTML = `${winner} wins!`;
      restartBtn.style.display = "block";
      startBtn.style.display = "none";
      startOver.style.display = "block";
      running = false;
    }

    else if (!options.includes("")) {
      statusMsg.innerHTML = "It's a draw!";
      restartBtn.style.display = "block";
      startBtn.style.display = "none";
      running = false;
    }

  }

  function gameReset() {
    options = ["", "", "", "", "", "", "", "", ""];
    for (var i = 0; i < cells.length; i++) {
      cells[i].innerText = '';
    }

    firstPlayer = randomInt();
    console.log(firstPlayer);
    startGame();
    let timeSpent=new Date()-startTime;
    document.querySelector("#time").innerHTML=(timeSpent/1000+" Seconds");
    startOver.style.display = "block";
  }

  //Code for two player match:

  function opponentMatch(){
    running = true;
    changePlayer();
  }

  function changePlayer() {
    if (firstPlayer === 0) {
      statusMsg.innerHTML = "X starts the game";
      currentPlayer = "X";
      updateSquare();
    }
    else if (firstPlayer === 1) {
      statusMsg.innerHTML = "O starts the game";
      currentPlayer = "O";
      updateSquare();
    }
  }

  function updateSquare(){
    for (var i = 0; i < cells.length; i++) {
      cells[i].innerHTML = '';
      cells[i].addEventListener('click', function () {
        let newCellIndex = this.getAttribute('cellIndex');
        console.log(newCellIndex);
        if (options[newCellIndex] != "" || !running) {
          return;
        }
        else {
          options[newCellIndex] = currentPlayer;
          console.log(options);
          document.querySelector(`#td_${newCellIndex}`).innerHTML = currentPlayer;
        }
        nextTurn();
        checkWinner();
      });
    }
    
  }

  function nextTurn(){
    if (currentPlayer=="X"){
      currentPlayer="O";
    }
    else{currentPlayer="X"}
    statusMsg.innerHTML=`${currentPlayer}'s turn`;
  }


  startOver.addEventListener('click', function(){
    location.reload();

  })