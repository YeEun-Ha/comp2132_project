const userImage = document.getElementById(`usersDice`)
const computerImage = document.getElementById(`computersDice`)
const userCurrentScore = document.getElementById(`user_current`)
const userTotalScore = document.getElementById(`user_total`)
const computerCurrentScore = document.getElementById(`computer_current`)
const computerTotalScore = document.getElementById(`computer_total`)
const winPopup = document.getElementById(`wonPopUp`)
const losePopup = document.getElementById(`lostPopUp`)
const drawPopup = document.getElementById(`drewPopUp`)
const winnerImage = document.getElementById(`winnerImage`)
const loserImage = document.getElementById(`loserImage`)
const rules = document.querySelector(`#rules_container ol`)
const hideButton = document.querySelector(`#rules_container span`)
const rulesContainer = document.getElementById(`rules_container`)
let user, computer, currentUser, currentComputer, animationHandler
let totalUser = 0, totalComputer = 0
let gameCount = 0
let number = 1
let showsImage = false

class Dice {
    constructor() {
        this.value = Math.floor(Math.random()*6 + 1)
    }
    showSelf() {
        return `<img src="./images/${this.value}.jpg" alt="dice" class="dice">`
    }
}

class Player {
    constructor(){
        this.diceInHand = []
    }
    addDiceToHand( aDice) {
        this.diceInHand.push(aDice)
    }
    showDicesInHand() {
        let html = ``
        this.diceInHand.forEach(eachDice => {
            html += eachDice.showSelf()
        })
        return html
    }
    calculateMyScore() {
        let score = 0, fistValue = this.diceInHand[0].value, secondValue = this.diceInHand[1].value 
        if (fistValue == 1 || secondValue == 1) {
            
        } else if (fistValue == secondValue) {
            score = (fistValue + secondValue) * 2
        } else {
            score = fistValue + secondValue
        }
        return score
    }
}

startGame()

document.getElementById(`resetGame`).addEventListener('click', startGame)
document.getElementById(`rollDice`).addEventListener('click', playGame)
document.getElementById(`winNoPopUp`).addEventListener(`click`, function () {
    hidePopUp(winPopup)
})
document.getElementById(`loseNoPopUp`).addEventListener(`click`, function () {
    hidePopUp(losePopup)
})
document.getElementById(`drawNoPopUp`).addEventListener(`click`, function () {
    hidePopUp(drawPopup)
})
hideButton.addEventListener(`click`, function () {
    if (hideButton.textContent == 'Hide') {
        hideButton.textContent = 'Show'
        rulesContainer.style.backgroundColor = `rgba(112, 128, 144, 0)`
        rules.classList.add(`hide`)        
    } else {
        hideButton.textContent = 'Hide'
        rulesContainer.style.backgroundColor = `rgba(220, 220, 220, 0.5)`
        rules.classList.remove(`hide`)
    }
})

function hidePopUp(params) {
    params.style.display = `none`
}

function startGame() {
    user = new Player()
    computer = new Player()

    gameCount = 0
    totalUser = 0
    totalComputer = 0
    currentUser = 0
    currentComputer = 0
    showsImage = false
    showScore()

    userImage.innerHTML = `<span>❓</span>`
    computerImage.innerHTML = `<span>❓</span>`
}

function playGame() {
    userImage.innerHTML = showDice(user)
    computerImage.innerHTML = showDice(computer)
    setTimeout(function () {
        document.querySelectorAll(`.dice`).forEach(item => 
            item.style.transform = `rotate(180deg)` )
        }, 10)

    currentUser = user.calculateMyScore()
    currentComputer = computer.calculateMyScore()
    totalUser += currentUser
    totalComputer += currentComputer
    showScore()

    gameCount++
    handleResult()
}

function showDice(player) {
    if (showsImage) {
        player.diceInHand =[]
    } else {
        showsImage = true
    }
    for (let i = 0; i < 2; i++) {
        const aDice = new Dice()
        player.addDiceToHand(aDice)
    }
    let html = player.showDicesInHand() 
    return html
}

function showScore() {
    userCurrentScore.innerHTML = currentUser
    computerCurrentScore.innerHTML = currentComputer

    userTotalScore.innerHTML = totalUser
    computerTotalScore.innerHTML = totalComputer
}

function handleResult() {
    if (gameCount < 3) {
        winPopup.style.display = `none`
        losePopup.style.display = `none`
        drawPopup.style.display = `none`
    } else {   
        if (totalUser > totalComputer ) {
            winPopup.style.display = `inline-block`
            moveImage()
        } else if (totalUser < totalComputer) {
            losePopup.style.display = `inline-block`
            moveImage()
        } else {
            drawPopup.style.display = `inline-block`
        }
        gameCount = 0
        totalUser = 0
        totalComputer = 0
        currentUser = 0
        currentComputer = 0
    }
}

function moveImage() {
    if (number <= 8) {
        if (winPopup.style.display == `inline-block`) {
            winnerImage.src = `./images/heart${number}.jpg`
        } else{
            loserImage.src = `./images/b${number}.jpg`
        }
        number++
        setTimeout(function () {
            animationHandler = requestAnimationFrame(moveImage)
        },100)
    } else {
        number = 1
    }
}
