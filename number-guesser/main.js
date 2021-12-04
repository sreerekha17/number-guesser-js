

window.addEventListener('DOMContentLoaded', initialize);

function initialize() {
    const button = document.querySelector("#submitNumber");
    button.addEventListener('click', onSubmitGuessNumber);

    const reload = document.querySelector('.retake');
    reload.addEventListener('click', retakeGame);

    const el = document.querySelector('#attemptsCount');
    el.innerText = ATTEMPTS_COUNT;
}


function generateGuessNumber() {
    const min = 1;
    const max = 100;

    return Math.floor(Math.random() * (max - min + 1) + min);
}


var CURRENT_NUMBER = generateGuessNumber(); //this will be number to be tested againt in a single session
var ATTEMPTS_COUNT = 0;
var attemps_limit = 10;

function retakeGame () {
    window.location.reload();
}

function updateFeedback(status) {
    let message = '';

    if (status === 'very-high') {
        message = 'Guess number is VERY high :( ';
    }
    else if (status === 'high') {
        message = 'Guess number is high, but almost close :) ';
    }
    else if (status === 'very-low') {
        message = 'Guess number is very low :(';
    }
    else if (status === 'low') {
        message = 'Guess number is low but very close :)';
    }
    else {
        message = 'Guess number is CORRECT !!!';
    }

    document.querySelector('.feedback').innerHTML = message;
}


function validateGuessNumber(num) {
    const circle = document.querySelector('.circle-indicator');

    if (ATTEMPTS_COUNT > 10) {
        document.querySelector('.feedback').innerHTML = 'GAME OVER. Click on Reload or Refresh the page';
        circle.classList.remove('low');
        circle.classList.remove('correct');
        circle.classList.remove('high');
        circle.classList.add('done');
        return
    }


    if (num > CURRENT_NUMBER) {
        circle.classList.remove('low');
        circle.classList.remove('correct');
        circle.classList.add('high');

        if (num - CURRENT_NUMBER >= 5){
            updateFeedback('very-high')
        }
        else {
            updateFeedback('high')
        }
            
    }
    else if (num < CURRENT_NUMBER) {
        circle.classList.remove('high');
        circle.classList.remove('correct');
        circle.classList.add('low');

        if (CURRENT_NUMBER - num >= 5){
            updateFeedback('very-low')
        }
        else {
            updateFeedback('low')
        }
    }

    else {
        //SUCCESS
        circle.classList.remove('high');
        circle.classList.remove('low')
        circle.classList.add('correct')
        updateFeedback('correct');
    }
}

function showValidationMessage(msg = ''){
    const el = document.getElementById('validation-message');
    el.innerText = msg;
    el.style.display = 'block';
}

function hideValidationMessage(){
    const el = document.getElementById('validation-message');
    el.style.display = 'none';
}

function updateAttemptsCount () {
    ATTEMPTS_COUNT += 1;

    if ( ATTEMPTS_COUNT <= 10) {
        const el = document.querySelector('#attemptsCount');
        el.innerText = ATTEMPTS_COUNT;
    }    
}

function onSubmitGuessNumber() {
    updateAttemptsCount();

    let num = document.querySelector("#guessNumber").value;    
    num = parseInt(num, 10)
    if (!num) {
        showValidationMessage("Please enter a number to proceed.")
        return
    }

    if (typeof (num) !== 'number') {
        showValidationMessage("Only numbers are accepted.")
        return; //invalid entry - ignore
    }

    if (num < 1 || num > 100) {
        showValidationMessage("Only numbers in the range 1 - 100 are accepted.")
        return
    }

    hideValidationMessage();
    validateGuessNumber(num)
}



