const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreboard = document.querySelector('.score');
// let imageArray = ['../images/nola.png', '../images/mostafizur.png'];
var timeLeft = document.querySelector('.time-left');
let lastHole;
let lastImage;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
// console.log(randTime(10,1000));

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        console.log('Thats the fucking same one');
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

// function randomImage(imageArray) {
//     const picIdx = Math.floor(Math.random() * imageArray.length);
//     const img = imageArray[picIdx];
//     return img;
   
// }

function peep() {
    const time = randomTime(100, 1500);
    // const pictures = randomImage(imageArray);
    // document.querySelector('.mole').style.backgroundImage = `url('${pictures}')`;
    const hole = randomHole(holes);
  
    

    sound3.play();

    hole.classList.add('up');
    setTimeout(function () {
        hole.classList.remove('up');
        hole.classList.remove('hammer');
        if (timeUp != true) {
            peep();


        }
    }, time);
}


function startGame() {
    button.style.display = 'none';
    restartButton.style.display = 'block';
    score = 0;
    scoreboard.textContent = 0;
    timeUp = false;
    peep();
    setTimeout(() => timeUp = true, 60000);
}


const button = document.querySelector('.btn');
const restartButton = document.querySelector('.btn-restart');
button.addEventListener('click', startGame);

restartButton.addEventListener('click', function () {
    location.reload();
})



function bonk(e) {
    if (!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    this.parentNode.classList.add('hammer');
    sound.play();
    sound2.play();
    scoreboard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));



var sound = new Audio();
sound.src = '../sound/whack.mp3';

var sound2 = new Audio();
sound2.src = '../sound/pain.mp3'

var sound3 = new Audio();
sound3.src = '../sound/nola.m4a';

// var currentTime = timeLeft.textContent;
// function countDown(){
//    currentTime--;
//    timeLeft.textContent = currentTime;
//    if(currentTime === 0){
//        clearInterval(timerId);
//    }   

// }

// let timerId = setInterval(countDown,1000);
