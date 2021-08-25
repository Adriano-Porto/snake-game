import player from './player.js'
import Fruit from './fruit.js'

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
        player.positions.forEach(({x, y})=>{
            this.grid.rows[y].childNodes[x].style.backgroundColor = 'red'
        })

        this.fruits.forEach(({x, y})=> {
            this.grid.rows[y].childNodes[x].style.backgroundColor = 'blue'
        })
    }

    frameUpdate() {
        // console.log(this)
        this.clear()
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
}

const grid = new Grid(12, 12)

const refreshGame = setInterval(()=>{
    // try{
        player.move();
        grid.frameUpdate()
        grid.createFruit()
    // } catch (err) {
    //     console.log(err)
    // }
    
}, 200)

document.addEventListener('keydown', ({keyCode}) => {
    player.changeDirection(keyCode)
})

