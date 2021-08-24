import player from './player.js'

class Grid {
    constructor(width, height) {
        this.grid = document.querySelector('tbody')
        this.width = width
        this.height = height

        this.makeGrid()
        this.frameUpdate.bind(this)
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
                        this.grid.rows[i].childNodes[j].style.backgroundColor = 'blue'
                    } else if ( j % 2 === 1){
                        this.grid.rows[i].childNodes[j].style.backgroundColor = 'green'
                    }
                } else {
                    if ( j % 2 === 0 ){
                        this.grid.rows[i].childNodes[j].style.backgroundColor = 'green'
                    } else if ( j % 2 === 1){
                        this.grid.rows[i].childNodes[j].style.backgroundColor = 'blue'
                    }
                }
            }
        }
    }

    render() {
        player.positions.forEach(({x, y})=>{
            this.grid.rows[y].childNodes[x].style.backgroundColor = 'red'
        })
    }

    frameUpdate() {
        // console.log(this)
        this.clear()
        this.render()
    }
}

const grid = new Grid(12, 12)
requestAnimationFrame(() => grid.frameUpdate())