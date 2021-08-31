class Grid {
    constructor(width, height) {
        this.grid = document.querySelector('tbody')
        this.color1 = "rgb(100,255,180)"
        this.color2 = "rgb(20,255, 60)"

        this.height = height
        this.width = width

        this.makeGrid()
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

    render(fruits, positions) {
        this.clear()
        fruits.forEach(({x, y})=> {
            this.grid.rows[y].childNodes[x].style.backgroundColor = 'blue'
        })

        
        positions.forEach(({x, y})=>{
            this.grid.rows[y].childNodes[x].style.backgroundColor = 'red'
        })
    }
}

export default Grid