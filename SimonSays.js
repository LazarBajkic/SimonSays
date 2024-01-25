
//initializing the html elements

const buttons = document.querySelectorAll('.js-Btn')
const startBtn = document.querySelector('.startBtn')
const roundCounterElem = document.querySelector('.roundCounter')
const gameOverElem = document.querySelector('.js-gameOverText')

const colorArray = {
    1: 'red',
    2: 'blue',
    3: 'yellow',
    4: 'green'
};

let computerPick = []
let userGuess = []
let counter = 0
let amountToGuess = 3
let roundCounter = 0

startBtn.addEventListener('click',() => {
    buttonPressed(startBtn,'startBtnPressed')
    startGame()})

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        userGuess.push(index + 1)
        buttonPressed(button, `${colorArray[index + 1]}BtnPressed`)
        
        if (userGuess.length === computerPick.length) {
            comparePatterns(userGuess, computerPick)
        }
    });
});

//choosing a random pattern for the simon says

function chooseButton() {
    const randomIndex = Math.floor(Math.random() * buttons.length)
    const randomButton = buttons[randomIndex]
    const colorIndex = randomIndex + 1
    
    buttonPressed(randomButton, `${colorArray[colorIndex]}BtnPressed`)
    computerPick.push(colorIndex)
        
}

function buttonPressed(btn, cssClassName) {
    btn.classList.add(cssClassName)
    setTimeout(() => {
        btn.classList.remove(cssClassName)
    }, 200)
}

function startGame() {
    gameOverElem.innerHTML=''
    userGuess = []
    computerPick = []
    counter = 0
    const intervalID = setInterval(() => {
        chooseButton()
        counter++
        disableButtons()
        startBtn.disabled = true
        
        if (counter >= amountToGuess) {
            clearInterval(intervalID)
            counter = 0
            setTimeout(enableButtons, 1000)
        }
    }, 1000)
}

function comparePatterns(userGuess, computerPick) {
    const userGuessString = JSON.stringify(userGuess)
    const computerPickString = JSON.stringify(computerPick)
    
    if (userGuessString === computerPickString) {
        amountToGuess++
        roundCounter++
        roundCounterElem.innerHTML = roundCounter
        startGame()
    } else {
        amountToGuess = 3
        roundCounter = 0
        roundCounterElem.innerHTML = roundCounter
        gameOverElem.innerHTML='the combination was wrong!,better luck next time'
        disableButtons()
        startBtn.disabled = false
        setTimeout(enableButtons, 0)
    }
}

function disableButtons() {
    buttons.forEach(button => {
        button.disabled = true
    });
}

function enableButtons() {
    buttons.forEach(button => {
        button.disabled = false
    });
}
