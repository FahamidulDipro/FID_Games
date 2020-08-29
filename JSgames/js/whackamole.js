const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
mole.className += 'mole-up';
const timeleft = document.querySelector('#timeleft');
let score = document.querySelector('#score');

let result = 0;
var currentTime = timeleft.textContent;


function randomSquare(){
    square.forEach(className => {
        className.classList.remove('mole');
        className.classList.remove('whacked');
        className.classList.add('square');
       
        
    });
    let randomPosition = square[Math.floor(Math.random()*9)];
    randomPosition.classList.add('mole');
    

     hitPosition = randomPosition.id;
}

square.forEach(id => {
    id.addEventListener('click', ()=>{
        if(id.id === hitPosition){
            document.getElementById(hitPosition).className = "whacked";
            
            result += 1;
            score.textContent = result;
        }
    })
})
setInterval(randomSquare, 1000);

function countdown(){
    currentTime--;
    timeleft.textContent = currentTime;
   
    if(currentTime === 0){
        clearInterval(timerId);
        clearInterval(randomSquare, 1000);
        document.querySelector('#score').innerHTML = `Game over! your final score is ${result}`;

       
    }
}
let timerId = setInterval(countdown,1000);

