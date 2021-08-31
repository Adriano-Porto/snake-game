class Grid {
    constructor(width, height) {
        this.grid = document.querySelector('tbody')
        this.color1 = "rgb(100,255,180)"
        this.color2 = "rgb(20,255, 60)"
        this.colorFruit = "blue"
        this.colorPlayer = "red"

        this.height = height
        this.width = width

        return this
    }

    setGridColors(color1, color2) {
        this.color1 = color1
        this.color2 = color2
        return this
    }

    setPlayerColor(colorPlayer) {
        this.colorPlayer = colorPlayer
        return this
    }

    setFruitColor(fruitColor) {
        this.colorFruit = fruitColor
        return this
    }

    buildHTMLGrid() {
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
        const str = this.buildHTMLGrid()
        this.grid.innerHTML += str
        return this
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

    render(fruits, positions) {
        this.clear()
        fruits.forEach(({x, y})=> {
            this.grid.rows[y].childNodes[x].style.backgroundColor = this.colorFruit
        })

        
        positions.forEach(({x, y})=>{
            this.grid.rows[y].childNodes[x].style.backgroundColor = this.colorPlayer
        })
    }
}

export default Grid