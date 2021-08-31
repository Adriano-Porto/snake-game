import player from './player.js'
import Fruit from './fruit.js'

var refreshRate = 200, gridWidth = 12, gridHeight = 12

class Grid {
    constructor(width, height) {
        this.grid = document.querySelector('tbody')
        this.color1 = "rgb(100,255,180)"
        this.color2 = "rgb(20,255, 60)"

        this.width = width
        this.height = height

        this.fruits = [new Fruit(4, 5)]

        this.makeGrid()
        this.frameUpdate()
    }

    makeHTMLGrid() {
        let str = ''
        for(let i = 0; i < this.height; i++) {
            str += `<tr class = '${i}'>`
            for(let j = 0; j < this.width; j++) {
                str += `<td class = '${i},${j}'></td>`
            }
            str+= `</tr>`
        }
        return str
    }

    makeGrid() {
        const str = this.makeHTMLGrid()
        this.grid.innerHTML += str
    }

    clear() {
        for(let i = 0; i < this.height; i++) {
            for(let j = 0; j < this.width; j++) {
                if(i % 2 === 0 ) {
                    if ( j % 2 === 0 ){
                        this.grid.rows[i].childNodes[j].style.backgroundColor = this.color1
                    } else if ( j % 2 === 1){
                        this.grid.rows[i].childNodes[j].style.backgroundColor = this.color2
                    }
                } else {
                    if ( j % 2 === 0 ){
                        this.grid.rows[i].childNodes[j].style.backgroundColor = this.color2
                    } else if ( j % 2 === 1){
                        this.grid.rows[i].childNodes[j].style.backgroundColor = this.color1
                    }
                }
            }
        }
    }

    render() {
        this.clear()
        this.fruits.forEach(({x, y})=> {
            this.grid.rows[y].childNodes[x].style.backgroundColor = 'blue'
        })

        try {
            player.positions.forEach(({x, y})=>{
                this.grid.rows[y].childNodes[x].style.backgroundColor = 'red'
            })
        } catch (err) {
            throw new Error("Player Out of Bounce")
        }
        
    }

    frameUpdate() {
        player.move()
        this.isPlayerAlive()
        this.didPlayerAteFruit()
        this.render()
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
        console.log(this.fruits)
        this.fruits.push(new Fruit(availableSpaces[rndIndex].x , availableSpaces[rndIndex].y))
    
    }

    destroyFruit(fruitInd) {
        this.fruits.splice(fruitInd, 1)
    }

    stopGame() {
        clearInterval(refreshGame)
    }

    endGame() {
        clearInterval(refreshGame)
    }

    isPlayerAlive() {
        let headPos = player.positions[0]
        for(let i = 1; i < player.positions.length; i++) {
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

    handleKeyPress({keyCode}) {
        if(keyCode === 27) {
            grid.stopGame()
        }
        if(!player.haveMoved) {
            player.changeDirection(keyCode)
        }
    }

    didPlayerAteFruit() {
        this.fruits.forEach(( fruit = { }, ind) => {
            if(fruit.x === player.positions[0].x && fruit.y === player.positions[0].y) {
                player.increaseSize()
                this.destroyFruit(ind)
                this.createFruit()
            }
        })
    }
}

const grid = new Grid(gridWidth, gridHeight)

const refreshGame = setInterval(()=>{
    try{
        grid.frameUpdate()
    } catch (err) {
        console.log(err)
    }
    
}, refreshRate)

document.addEventListener('keydown', grid.handleKeyPress)