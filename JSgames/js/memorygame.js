document.addEventListener('DOMContentLoaded' ,() => {

})

const CardArray = [
    {
        name:'calculator',
        img: '../images/cal.jpg'

    },
    {
        name:'gamepad',
        img:'../images/gamepad.jpg'
    },
    {
        name:'img-0',
        img:'../images/img-0.jpg'
    },
    {
        name:'img-1',
        img:'../images/img-1.jpg'
    },
    {
        name:'img-2',
        img:'../images/img-2.jpg'
    },
    {
        name:'img-3',
        img:'../images/img-3.jpg'
    },
    {
        name:'img-4',
        img:'../images/img-4.jpg'
    },
    {
        name:'img-5',
        img:'../images/img-5.jpg'
    },
    {
        name:'calculator',
        img: '../images/cal.jpg'

    },
    {
        name:'gamepad',
        img:'../images/gamepad.jpg'
    },
    {
        name:'img-0',
        img:'../images/img-0.jpg'
    },
    {
        name:'img-1',
        img:'../images/img-1.jpg'
    },
    {
        name:'img-2',
        img:'../images/img-2.jpg'
    },
    {
        name:'img-3',
        img:'../images/img-3.jpg'
    },
    {
        name:'img-4',
        img:'../images/img-4.jpg'
    },
    {
        name:'img-5',
        img:'../images/img-5.jpg'
    }

];
CardArray.sort(() => 0.5 - Math.random());
const button = document.querySelector('.btn-reload');
const grid = document.querySelector('.container');
var cardChosen = [];
var cardChosenId = [];
var cardsWon =[];
var resultDisplay = document.querySelector('#result');

function createBoard(){
    for(var i = 0; i < CardArray.length; i++){
        let card = document.createElement('img');
       
        card.setAttribute('src','../images/index.jpg');
        card.setAttribute('data-id', i);
        card.addEventListener('click',flipCard);
        grid.appendChild(card);
    }
}


function checkForMatch(){
    var cards = document.querySelectorAll('img');
    const optionOneId = cardChosenId[0];
    const optionTwoId = cardChosenId[1];

    if(cardChosen[0] === cardChosen[1]){
        cards[optionOneId].setAttribute('src','../images/correct.png');
        cards[optionTwoId].setAttribute('src','../images/correct.png');
        cardsWon.push(cardChosen);
    }
    else{
        cards[optionOneId].setAttribute('src','../images/index.jpg');
        cards[optionTwoId].setAttribute('src', '../images/index.jpg');
       
      
    }
    cardChosen = [];
    cardChosenId = [];
   
   
    resultDisplay.textContent = cardsWon.length;
    if(cardsWon.length === CardArray.length/2){
       document.getElementsByTagName('h1')[0].innerHTML = 'Congrats !';
        button.style.display = 'block';
        button.addEventListener('click',function(){
        location.reload(true);
  
})
      
    }


}
function flipCard(){
    var cardId = this.getAttribute('data-id');
    cardChosen.push(CardArray[cardId].name);
    cardChosenId.push(cardId);
    this.setAttribute('src', CardArray[cardId].img);
    if(cardChosen.length === 2){
        setTimeout(checkForMatch, 500);
    }
}
createBoard();


