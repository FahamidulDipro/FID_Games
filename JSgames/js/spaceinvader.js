document.addEventListener('DOMContentLoaded', () => {


    const squares = document.querySelectorAll('.grid div');
    const resultDisplay = document.querySelector('#result');
    let width = 15;
    let currentShooterIndex = 202;
    let currentInvaderIndex = 0;
    let alienInvadersTakenDown = [];
    let result = 0;
    let direction = 1;

    let invaderId;

    //Define the Alien Invaders
    const alienInvaders = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39];

    //Draw the Alien Invaders
    alienInvaders.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader'));

    //Draw the Shooter

    squares[currentShooterIndex].classList.add('shooter');

    //Move the shooter along a line
    //This function is made for PC where player will be able to move the shooter with keyboard
    // function moveShooter() {
    // squares[currentShooterIndex].classList.remove('shooter');
    // switch (e.keyCode) {
    //     case 37:
    //         if (currentShooterIndex % width !== 0) {
    //             currentShooterIndex -= 1;
    //         }
    //         break;
    //     case 39:
    //         if (currentShooterIndex % width < width - 1) {
    //             currentShooterIndex += 1;

    //         }
    //         break;

    // }

    //For Mobile Controller
    const buttonLeft = document.querySelector('.left-btn');
    const buttonRight = document.querySelector('.right-btn');
    buttonLeft.addEventListener('click', function () {

        if (currentShooterIndex % width !== 0) {
            squares[currentShooterIndex].classList.remove('shooter');
            currentShooterIndex -= 1;
            squares[currentShooterIndex].classList.add('shooter');
        }

    })
    buttonRight.addEventListener('click', function () {

        if (currentShooterIndex % width < width - 1) {
            squares[currentShooterIndex].classList.remove('shooter');
            currentShooterIndex += 1;
            squares[currentShooterIndex].classList.add('shooter');
        }
    })


    // }
    // document.addEventListener('click', moveShooter);

    //Move the Alien Invaders

    function moveInvaders() {
        soundSpaceship.play();
        const leftEdge = alienInvaders[0] % width === 0;
        const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1

        if ((leftEdge && direction === -1) || (rightEdge && direction === +1)) direction = width;
        else if (direction === width) if (leftEdge) direction = 1;
        else direction = -1;

        for (let i = 0; i <= alienInvaders.length - 1; i++) {
            squares[alienInvaders[i]].classList.remove('invader');
        }
        for (let i = 0; i <= alienInvaders.length - 1; i++) {
            alienInvaders[i] += direction;
        }
        for (let i = 0; i <= alienInvaders.length - 1; i++) {
            if (!alienInvadersTakenDown.includes(i)) {
                squares[alienInvaders[i]].classList.add('invader');
            }

        }
        //Decide a Game Over
        if (squares[currentShooterIndex].classList.contains('shooter') && squares[currentShooterIndex].classList.contains('invader')) {
            resultDisplay.textContent = 'Game Over';
            squares[currentShooterIndex].classList.add('boom');
            clearInterval(invaderId);
            soundSpaceship.pause();
            soundLost.play();
            soundExplode.play();
        }
        for (var i = 0; i <= alienInvaders.length - 1; i++) {
            if (alienInvaders[i] > (squares.length - (width - 1))) {
                resultDisplay.textContent = 'Game Over';
                soundExplode.play();
                soundLost.play();
                clearInterval(invaderId);
                soundSpaceship.pause();

            }
        }
        //Declare Win

        if (alienInvadersTakenDown.length === alienInvaders.length) {
            resultDisplay.textContent = 'You Win!'
            clearInterval(invaderId);
            soundSpaceship.pause();
            soundSuccess.play();
        }
    }

    invaderId = setInterval(moveInvaders, 500);




    //Shoot at aliens
    function shoot(e) {
        let laserId;
        let currentLaserIndex = currentShooterIndex;
        soundLaser.play();
        //Move the laser from shooter to Alien Invaders

        function moveLaser() {
            squares[currentLaserIndex].classList.remove('laser');
            currentLaserIndex -= width;
            squares[currentLaserIndex].classList.add('laser');

            if (squares[currentLaserIndex].classList.contains('invader')) {
                squares[currentLaserIndex].classList.remove('laser');
                squares[currentLaserIndex].classList.remove('invader');
                squares[currentLaserIndex].classList.add('boom');
                soundExplode.play();

                setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250);
                clearInterval(laserId);

                const aliensTakenDown = alienInvaders.indexOf(currentLaserIndex);
                alienInvadersTakenDown.push(aliensTakenDown);
                result++;
                resultDisplay.textContent = result;
            }

            if (currentLaserIndex < width) {
                clearInterval(laserId);
                setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 100);
            }
        }
        // switch (e.keyCode) {
        //     case 32:
        //         laserId = setInterval(moveLaser, 100);
        //         break;
        // }
        // document.addEventListener('click', function () {
        //     laserId = setInterval(moveLaser, 100);
        // });

        if (e.which == 1) {
            laserId = setInterval(moveLaser, 100); //Made it ! at last it was a nightmare. So this is for the shoot button.
        }


    }

    let startButton = document.querySelector('.start-btn')
    startButton.addEventListener('click', function () {

        location.reload();
    })
    let buttonShoot = document.querySelector('.shoot-btn');
    buttonShoot.addEventListener('click', shoot);


    var soundLaser = new Audio();
    soundLaser.src = '../sound/machinegun.mp3';

    var soundExplode = new Audio;
    soundExplode.src = '../sound/explode.mp3';


    var soundSpaceship = new Audio();
    soundSpaceship.src = '../sound/spaceship.mp3'

    var soundSuccess = new Audio();
    soundSuccess.src = '../sound/success.mp3';

    var soundLost = new Audio();
    soundLost = '../sound/lose.mp3';




})
