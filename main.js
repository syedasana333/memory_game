let player1 = document.getElementById('1')
let player2 = document.getElementById('2')
let player3 = document.getElementById('3')
let player4 = document.getElementById('4')
let grid4 = document.getElementById('grid4')
let grid6 = document.getElementById('grid6')
let currentPlayer = 0;
let visibility;
let lockBoard = false;
let time, displayTime, move, displayMoves, arr;
let moves = 0;
let flippedCards = [];
let matchedCards = [];
let intervalId;
let num;
let players = [];
let points = [];
let playerIndex = 0;
let newArray;
let arrayTheme;
let isFirstClick;


function number(){
    document.getElementById('icons').classList.remove('selected')
    document.getElementById('numbers').classList.add('selected')
}

function icons(){
    document.getElementById('numbers').classList.remove('selected')
    document.getElementById('icons').classList.add('selected')
}

function numberOfPlayers(){  
    player1.onclick = function(){
        player2.classList.remove('selected')
        player3.classList.remove('selected')
        player4.classList.remove('selected')
        player1.classList.add('selected')
    }
    player2.onclick = function(){
        player1.classList.remove('selected')
        player3.classList.remove('selected')
        player4.classList.remove('selected')
        player2.classList.add('selected')
    }
    player3.onclick = function(){
        player1.classList.remove('selected')
        player2.classList.remove('selected')
        player4.classList.remove('selected')
        player3.classList.add('selected')
    }
    player4.onclick = function(){
        player1.classList.remove('selected')
        player3.classList.remove('selected')
        player2.classList.remove('selected')
        player4.classList.add('selected')
    }
}

function gridSize(){
    grid4.onclick = function(){
        grid6.classList.remove('selected')
        grid4.classList.add('selected')
    }
    grid6.onclick = function(){
        grid4.classList.remove('selected')
        grid6.classList.add('selected')
    }
}

function startBtn(){

    if(document.getElementById('numbers').classList.contains('selected')){
        arrTheme = 'numbers'
    }
    else if(document.getElementById('icons').classList.contains('selected')){
        arrTheme = 'icons'
    }

    if(player1.classList.contains('selected')){
        arrplayer = 1;
    }
    else if(player2.classList.contains('selected')){
        arrplayer = 2;
    }
    else if(player3.classList.contains('selected')){
        arrplayer = 3;
    }
    else if(player4.classList.contains('selected')){
        arrplayer = 4;
    }
    console.log(num)

    if(grid4.classList.contains('selected')){
        arrSize = 4;
    }
    else if(grid6.classList.contains('selected')){
        arrSize = 6;
    }

    window.location.href='game.html'
    localStorage.setItem('theme',arrTheme) 
    localStorage.setItem('player',arrplayer) 
    localStorage.setItem('size',arrSize) 
}

function newGame(){
    window.location.href='index.html';
    document.body.classList.remove('popup-open');
}

function stopTimer(){
    clearInterval(intervalId);
}

function restartGame(){
    moves = 0;
    flippedCards = [];
    matchedCards = [];
    isFirstClick = true;
  
    let cards = document.querySelectorAll(".flipper");
    cards.forEach((card) => {
      card.classList.remove("flipped", "match");
    });
  
    if(num === 1){
        displayTime.textContent = "00:00";
        displayMoves.textContent = "0"; 
    }
    else{

        for (let i = 0; i < num; i++) {
            players[i].score = 0;

            document.getElementById(`player${i}-score`).textContent = `${players[i].score}`;
        }

        let previous = document.querySelector('.current-player');
        previous.classList.remove('current-player');

        let firstPlayer = document.getElementById('player0')
        firstPlayer.classList.add('current-player');
    }

    newArray = shuffleArray(newArray);

    setTimeout(() => {
        updateCardContent();
    }, 500);

    let menu = document.querySelector('.menu-container');
    menu.style.display = 'none'
  
    stopTimer();
  
    bg.style.display = "none";
    banner.style.display = "none";

    document.body.classList.remove('popup-open');
  
}

function shuffleArray(array) {
    return array.slice().sort(() => Math.random() - 0.5);
}


function updateCardContent() {
    let cardBacks = document.querySelectorAll(".card-back");
    newArray.forEach((value, index) => {
        // Update the content of each card back with the new array order
        if (arrayTheme === 'numbers') {
            cardBacks[index].textContent = value;
        } else if (arrayTheme === 'icons') {
            cardBacks[index].querySelector("img").src = value;
        }
    });
}

function singlePlayer(theme){

    noOfPlayers = document.querySelector("#noOfPlayers");

    isFirstClick = true;
  
    if(!time){
        time = document.createElement("div");
        time.setAttribute("id", "timer");
        time.textContent = "00:00";
        noOfPlayers.appendChild(time);
    }
 
    if(!move){
        move = document.createElement("div");
        move.setAttribute("id", "moves");
        move.textContent = "0";  
        noOfPlayers.appendChild(move);
    }
  
    displayTime = document.querySelector("#timer");
    displayMoves = document.querySelector("#moves");
  
    function startTimer() {
        console.log('Timer started!');
    
        let minutes = 0;
        let seconds = 0;
    
            intervalId = setInterval(() => {
                seconds++;
                if (seconds === 60) {
                seconds = 0;
                minutes++;
                }
                displayTime.textContent =
                (minutes < 10 ? "0" : "") +
                minutes +
                ":" +
                (seconds < 10 ? "0" : "") +
                seconds;
            }, 1000);
    }
  
    document.querySelectorAll(".flipper").forEach((flipper) => {
        flipper.addEventListener("click", function () {
            console.log('isFirstClick:', isFirstClick);

            if (isFirstClick) {
                startTimer();
                isFirstClick = false;
            }
    
            if (
            flippedCards.length < 2 &&
            !flippedCards.includes(flipper) &&
            !matchedCards.includes(flipper)
            ) {
                moves++;
                displayMoves.textContent = moves;
        
                flipCard(flipper);
                flippedCards.push(flipper);
                
    
                if (flippedCards.length === 2) {
                    let [card1, card2] = flippedCards;
                    let card1Content;
                    let card2Content;

                    if(theme === 'numbers'){
                        card1Content = card1.querySelector(".card-back").textContent;
                        card2Content = card2.querySelector(".card-back").textContent;
                    }
                    else{
                        card1Content = card1.querySelector(".card-back img").src;
                        card2Content = card2.querySelector(".card-back img").src;
                    }
        
                    if (card1Content === card2Content){
                    matchedCards.push(...flippedCards);
                    flippedCards = [];
        
                    card1.classList.add("match");
                    card2.classList.add("match");
                    card1.classList.add("highlight");
                    card2.classList.add("highlight");
        
                    setTimeout(() => {
                        card1.classList.remove("highlight");
                        card2.classList.remove("highlight");
                    }, 1000);
                    }else{
                    setTimeout(() => {
                        flipCardsBack(flippedCards);
                        flippedCards = [];
                        lockBoard = false;
                    }, 1700);
                    }

                    if(matchedCards.length === arr.length){
                        stopTimer();
                        winner();
                    }
                }
            }
        });
    });
}

function multiplayer(num, theme){
    let activePlayerIndex = 0;

    for (let i = 0; i < num; i++) {
        let playerName = `Player ${i + 1}`;
        let player = {
            name: playerName,
            score: 0
        };
        players.push(player);

        let playerNameElement = document.createElement('div');
        playerNameElement.setAttribute('id', `player${i}`)
        playerNameElement.textContent = `${players[i].name} `;
    
        let playerScoreSpan = document.createElement('span');
        playerScoreSpan.textContent = players[i].score;
        playerScoreSpan.id = `player${i}-score`;
    
        playerNameElement.appendChild(playerScoreSpan);
    
        let noOfPlayers = document.querySelector("#noOfPlayers");

        noOfPlayers.appendChild(playerNameElement);

        if(`player ${i+1}` === 'player 1'){
            playerNameElement.classList.add('current-player');
        }

    }


    document.querySelectorAll(".flipper").forEach((flipper) => {

        flipper.addEventListener("click", function () {
    
            if (
            flippedCards.length < 2 &&
            !flippedCards.includes(flipper) &&
            !matchedCards.includes(flipper)
            ) {
             
                flipCard(flipper);
                flippedCards.push(flipper);

                if (flippedCards.length === 2) {
                    let [card1, card2] = flippedCards;
                    let card1Content;
                    let card2Content;


                    if(theme === 'numbers'){
                        card1Content = card1.querySelector(".card-back").textContent;
                        card2Content = card2.querySelector(".card-back").textContent;
                    }
                    else{
                        card1Content = card1.querySelector(".card-back img").src;
                        card2Content = card2.querySelector(".card-back img").src;
                    }
            

                    if( card1Content === card2Content) {
                        matchedCards.push(...flippedCards);
                        flippedCards = [];
            
                        card1.classList.add("match");
                        card2.classList.add("match");
                        card1.classList.add("highlight");
                        card2.classList.add("highlight");

                        players[activePlayerIndex].score += 1;
                        updateScoreUI(activePlayerIndex);


                        setTimeout(() => {
                            card1.classList.remove("highlight");
                            card2.classList.remove("highlight");
                        }, 1000);

                    }else{
                        setTimeout(() => {
                            flipCardsBack(flippedCards);
                            flippedCards = [];
                            lockBoard = false;

                            activePlayerIndex = (activePlayerIndex + 1) % num;

                            let previous = document.querySelector('.current-player');
                            previous.classList.remove('current-player');
    
                            let nextIndex = document.getElementById(`player${activePlayerIndex}`)
                            nextIndex.classList.add('current-player');
                        }, 1700); 
                    }


                    if(matchedCards.length === arr.length){
                        findWinner();
                    }
                }

                function findWinner(){
                    let sorted = players.sort((a, b) => b.score - a.score);
                    let highscore = sorted[0].score;

                    let gameWinners = sorted.filter(players => players.score === highscore);

                    winner(gameWinners, sorted);
                }
    
            }
        });
    });
    
}

function updateScoreUI(playerIndex) {
    let scoreSpan = document.getElementById(`player${playerIndex}-score`);
    if (scoreSpan) {
      scoreSpan.textContent = players[playerIndex].score;
    }
}

function getContent(){
    arrayTheme = localStorage.getItem('theme');
    let arrayPlayer = localStorage.getItem('player');
    let arraySize = localStorage.getItem('size');
    
    arr = Circle(arrayTheme,arraySize)
 
    let grid = document.querySelector('.gridContainer');
    
    const cardContainer = document.createElement('div')
    cardContainer.classList.add("card-container");
    grid.appendChild(cardContainer);
 
    arr.forEach(value => {
        const cardFront = document.createElement("div");
        cardFront.classList.add("card-front");
        
        const cardBack = document.createElement("div");
        cardBack.classList.add("card-back");

        if (arrayTheme === 'numbers') {
            cardBack.textContent = value;
        } else if (arrayTheme === 'icons') {
            const imgElement = document.createElement('img');
            imgElement.src = value;
            cardBack.appendChild(imgElement);
        }

        const flipper = document.createElement("div");
        flipper.classList.add("flipper");
        flipper.appendChild(cardFront);
        flipper.appendChild(cardBack);
        cardContainer.appendChild(flipper);
    });

    if(arraySize == 4){
        cardContainer.style.gridTemplateColumns = 'repeat(4,100px)';
    }
    else{
        cardContainer.style.gridTemplateColumns = 'repeat(6,100px)';
    }

    num = parseInt(arrayPlayer)
    if(num === 1){
        singlePlayer(arrayTheme);
    }
    else{
        multiplayer(num, arrayTheme);
    }  
} 

function winner(winners, playersScore){
    debugger;

    let bg = document.getElementById('bg');
    let banner = document.getElementById("banner");  

    banner.innerHTML = '';

    bg.style.display = 'block';        
    banner.style.display = 'block'; 
      
    let winnerTitle = document.createElement('div');
    winnerTitle.setAttribute('id','winnerTitle')
    banner.appendChild(winnerTitle)

    let winnerText = document.createElement('div');
    winnerText.setAttribute('id','winner')
    winnerTitle.appendChild(winnerText)

    let gameOverText = document.createElement('div');
    gameOverText.setAttribute('id','gameOverText');
    winnerTitle.appendChild(gameOverText);

    let result = document.createElement('div')
    result.setAttribute('class','result')
    banner.appendChild(result)


    document.body.classList.add('popup-open');

    if(num === 1){
        let timeElapsed = document.createElement('div');
        timeElapsed.setAttribute('id','timeElapsed');
        result.appendChild(timeElapsed);
        
        let movesTaken = document.createElement('div');
        movesTaken.setAttribute('id','movesTaken');
        result.appendChild(movesTaken);
        
        winnerText.textContent = 'You did it!'
        gameOverText.textContent = `Game over! Here's how you got on...`
        timeElapsed.textContent = `${time.textContent}` 
        movesTaken.textContent = `${move.textContent}` 
    }
    else{
        
        if(winners.length === 1){
            winnerText.textContent = `${winners[0].name} Wins!`
        }
        else{
            let winnersName =  winners.map(winners => winners.name).join(', ');
            winnerText.textContent = `It's a tie! Winners: ${winnersName}`
        }

        gameOverText.textContent = `Game over! Here are the results...`

        playersScore.forEach(player => {
            let playerNameElement = document.createElement('div');
            let playerScoreElement = document.createElement('div');
            let playerElement = document.createElement('div');
        
            playerNameElement.textContent = `${player.name}`;
            playerNameElement.setAttribute('id', 'player-name');
        
            playerScoreElement.textContent = `${player.score}`;
            playerScoreElement.setAttribute('id', 'player-score');

            playerElement.appendChild(playerNameElement);
            playerElement.appendChild(playerScoreElement);  
            playerElement.setAttribute('id', 'playerElement');

            result.appendChild(playerElement);
        })
    }
        
    let btns = document.createElement('div');
    btns.setAttribute('id','btns');
    banner.appendChild(btns);
               
    let restartBtn = document.createElement('div');
    restartBtn.setAttribute('id','restartBtn');
    btns.appendChild(restartBtn);
    restartBtn.addEventListener("click", restartGame);
                
    let newGameBtn = document.createElement('div');
    newGameBtn.setAttribute('id','newGameBtn');
    btns.appendChild(newGameBtn);
    newGameBtn.addEventListener("click", newGame);
} 

function flipCard(flipper){
    if(!lockBoard){        
        flipper.classList.add('flipped');
    }
}
  
function flipCardsBack(flippedCards) {
    flippedCards.forEach(flipCard);
    flippedCards.forEach(card => card.classList.remove('flipped'));
}

function Circle(theme,size){
    let arr;
    let Array =[];
    

    if(theme === 'numbers'){
        arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
    }
    else{
        arr = [
            'img/icon.png',
            'img/icon-1.png',
            'img/icon-2.png',
            'img/icon-3.png',
            'img/icon-4.png',
            'img/icon-5.png',
            'img/icon-6.png',
            'img/icon-7.png',
            'img/icon-8.png',
            'img/icon-9.png',
            'img/icon-10.png',
            'img/icon-11.png',
            'img/icon-12.png',
            'img/icon-13.png',
            'img/icon-14.png',
            'img/icon-15.png',
            'img/icon-16.png',
            'img/icon-17.png',  
        ];

    }

    let i=0;
    let n; 

    if(size == 4){
        n=8;
    }
    else if(size == 6){
        n = 18;
    }

    while(i<n){
        let randomIndex = Math.floor(Math.random() * arr.length);

        if (!Array.includes(arr[randomIndex])) {
            Array.push(arr[randomIndex]);
            i++;
        }

    }

    let array =[...Array]
    newArray = Array.concat(array)
    function shuffle(newArray){
      return newArray.sort(()=>Math.random() - 0.5)
    }
    newArray = shuffle(newArray)

    return newArray;
}

function toggleMenu() {
    let menu = document.querySelector('.menu-container');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

function closeMenu(){
    let menu = document.querySelector('.menu-container');
    menu.style.display = 'none'
}