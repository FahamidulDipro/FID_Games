const squares = document.querySelectorAll('.grid div');
const scoreDisplay = document.querySelector('span');
const startBtn = document.querySelector('.start');

const width = 10;
let currentIndex = 0;//First div in our grid
let appleIndex = 0;//First div in our grid
let currentSnake = [2,1,0]; //So the div in our grid being 2 (for the head ) and 0 being the end (Tail, wih all 1's) being the body for now on

let direction = 1;
let score = 0;
let speed =  .9;
let intervalTime = 0;
let interval = 0;

//Assign functions to key Codes
// function control(e){
//     squares[currentIndex].classList.remove('snake');

//     if(e.keyCode === 39){
//         direction = 1; //If we press the right arrow key the snake will go right

//     }
//     else if(e.keyCode === 38){
//         direction = -width; //If we press the up arrow the snake will go back 10 divs ,appearing to go up

//     }
//     else if(e.keyCode === 37){
//         direction = -1 //If we press the left arrow the snake will go left
//     }
//     else if(e.keyCode === 40){
//         direction = +width; // If we press the down arrow the snake will go down
//     }
// }

// document.addEventListener('keyup',control);
const leftButton = document.querySelector('.btn-left');
const rightButton = document.querySelector('.btn-right');
const upButton = document.querySelector('.btn-up');
const downButton = document.querySelector('.btn-down');

leftButton.addEventListener('click',function(){
    direction = -1;
})

rightButton.addEventListener('click',function(){
    direction = 1;
})

upButton.addEventListener('click',function(){
    direction = -width;
})

downButton.addEventListener('click',function(){
    direction = +width;
})















//To start the game

function startGame(){
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[currentSnake[0]].classList.remove('hurt');
    squares[appleIndex].classList.remove('apple');
    document.querySelector('.game-over').style.display = 'none';
    clearInterval(interval);
    score = 0;
    //Generate a random apple
    randomApple();
    direction = 1;
    scoreDisplay.innerText = score;
    intervalTime = 1000;
    currentSnake = [2,1,0];
    currentIndex = 0;
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    interval = setInterval(moveOutcomes, intervalTime);
}

//Function that deals with all over the outcomes of the Snake
function moveOutcomes(){

// It deals with snake hitting border and hitting self
if((currentSnake[0]+width >= (width*width)&& direction === width)||//If the snake hits the bottom
    (currentSnake[0] % width === width -1 && direction === 1)||    //If the snake hits the right wall
    (currentSnake[0] % width === 0 && direction === -1)||  //If the snake hits left wall
    (currentSnake[0] - width < 0 && direction === -width)||//If the snake hits the top wall    
    squares[currentSnake[0] + direction].classList.contains('snake')){
        squares[currentSnake[0]].classList.add('hurt');
        document.querySelector('.game-over').style.display = 'block';
        sound1.play();
        return clearInterval(interval);
        //This will clear the interval if any of these above happens
    } //If the snake hits itself
    
    const tail = currentSnake.pop();//Removes last of the array and shows it
    squares[tail].classList.remove('snake'); //Removes class of snake from its tail
    currentSnake.unshift(currentSnake[0] + direction); //gives direction to the head of the array
    


// Deals with snake getting apple
if(squares[currentSnake[0]].classList.contains('apple')){
    squares[currentSnake[0]].classList.remove('apple');
    sound.play();
    squares[tail].classList.add('snake');
    currentSnake.push(tail);
    randomApple()
    score++;
    scoreDisplay.textContent = score;
    clearInterval(interval);
    intervalTime = intervalTime * speed;
    interval = setInterval(moveOutcomes, intervalTime);

}
squares[currentSnake[0]].classList.add('snake');


}



startBtn.addEventListener('click',startGame);


//Generates new apple in random location once eaten
function randomApple(){
    do{
        appleIndex = Math.floor(Math.random()*squares.length);
    } while(squares[appleIndex].classList.contains('snake')); // Making sure that appels donot appear in the snake body

    squares[appleIndex].classList.add('apple');
}


var sound = new Audio();
sound.src = '../sound/chomp.mp3';

var sound1 = new Audio();
sound1.src = '../sound/explode.mp3';