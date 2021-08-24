const settings = {
    width: 4,
    height: 5
}

class Grid {
    constructor(width, height) {
        this.grid = document.querySelector('tbody')
        this.width = width
        this.height = height

        this.makeGrid()
        console.log(this.grid)
        this.paintGrid()
    }
    makeHTMLGrid() {
        let str = ''
        for(let i = 0; i < settings.height; i++) {
            str += `<tr class = '${i}'>`
            for(let j = 0; j < settings.width; j++) {
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

    paintGrid() {
        for(let i = 0; i < settings.height; i++) {
            for(let j = 0; j < settings.width; j++) {
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
}

const grid = new Grid()