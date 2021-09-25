import player from './player.js'
import Fruit from './fruit.js'
import Grid from './grid.js'

class RestartDiv {
    constructor() {
        this.gameWrapper = document.querySelector('.gameWrapper')
        this.restartBoxTemplate = document.querySelector('.restartBoxTemplate').innerHTML
    }

    create() {
        this.retryBoxWrapper = document.createElement('div')
        this.retryBoxWrapper.setAttribute('class', 'retryBoxWrapper')
        this.retryBoxWrapper.innerHTML = this.restartBoxTemplate

        const retryButton = this.retryBoxWrapper.children[0].children[0]

        retryButton.addEventListener('click', handleRestartClick)

        this.gameWrapper.appendChild(this.retryBoxWrapper)
    }

    remove() {
        this.retryBoxWrapper.remove()
    }
}

class Game {
    constructor() {
        this.refreshRate = 200
        this.width = 12
        this.height = 12

        this.fruits = []
        this.createFruit()
        this.pointsBox = document.querySelector('.points')
        this.updatePlayerPoints()

        this.grid = new Grid(this.width, this.height)
            .setGridColors('#70706e', '#525151')
            .setPlayerColor('rgb(250, 62, 62)')
            .setFruitColor('rgb(28, 212, 77)')
            .makeGrid()

        this.gameInterval = setInterval(() => {
            this.frameUpdate()
        }, this.refreshRate)

        this.restartDiv = new RestartDiv()
        this.gameRunning = true
    }

    frameUpdate() {
        player.move()
        this.isPlayerAlive()
        this.didPlayerAteFruit()
            this.grid.render(this.fruits, player.positions) 
    }

    isPlayerAlive() {
        let headPos = player.positions[0]
        for(let i = 2; i < player.positions.length; i++) {
            let pos = player.positions[i]
            if(headPos.x === pos.x && headPos.y === pos.y) {
                this.endGame()
            }
        }

        if(
            headPos.x < 0  ||
            headPos.y < 0  ||
            headPos.x > this.width-1 ||
            headPos.y > this.height-1
            ) {
            this.endGame()
        }
    }

    createFruit() {
        const availableSpaces = []

        for(let i = 0; i < this.width; i++) { 
            for(let j = 0; j < this.height; j++) {
                let skip = false
                for( let l = 0; l < player.positions.length; l++) {
                    const x = player.positions[l].x
                    const y = player.positions[l].y
                    if(i === x && j === y) {
                        skip = true
                        break;
                    }
                }

                for( let f = 0; f < this.fruits.length; f++) {
                    const x = this.fruits[f].x
                    const y = this.fruits[f].y
                    if(i === x && j === y) {
                        skip = true

                    }
                }
                    if(skip) {
                        continue
                    }
                    availableSpaces.push({x:i, y: j})
                }
            }
        const rndIndex = Math.floor(Math.random() * availableSpaces.length)
        this.fruits.push(new Fruit(availableSpaces[rndIndex].x , availableSpaces[rndIndex].y))
    }

    destroyFruit(fruitInd) {
        this.fruits.splice(fruitInd, 1)
    }

    toggleStartGame() {
        if(this.gameRunning){
            game.stopGame()
        } else { 
            game.restartGameInterval()
        }
        this.gameRunning = this.gameRunning ? false : true
    }

    stopGame() {
        clearInterval(this.gameInterval)
    }

    endGame() {
        clearInterval(this.gameInterval)
        this.restartDiv.create()
    }

    restartGame() {
        this.fruits = []
        this.createFruit()

        player.positions = [
            { x: 8, y: 6 },
            { x: 8, y: 7 },
            { x: 8, y: 8 },
        ]

        player.points = 0
        player.direction = 'left'

        this.updatePlayerPoints()
        this.restartGameInterval()
    }

    restartGameInterval() {
        this.gameInterval = setInterval(() => {
            this.frameUpdate()
        }, this.refreshRate)
    }

    didPlayerAteFruit() {
        this.fruits.forEach(( fruit = { }, ind) => {
            if(fruit.x === player.positions[0].x && fruit.y === player.positions[0].y) {
                player.increaseSize()
                this.destroyFruit(ind)
                this.createFruit()
                this.updatePlayerPoints()
            }
        })
    }
    
    updatePlayerPoints() {
        this.pointsBox.innerText = `Points: ${String(player.points)}`
    }
}

const game = new Game()

document.addEventListener('keydown', handleKeyPress)

function handleKeyPress({keyCode}) {
    if(keyCode === 27) {
        game.toggleStartGame()
    }
    if(!player.haveMoved) {
        player.changeDirection(keyCode)
    }
}

function handleRestartClick() {
    game.restartDiv.remove()
    setTimeout(()=>{
        
        game.restartGame()
    }, this.refreshRate)
}