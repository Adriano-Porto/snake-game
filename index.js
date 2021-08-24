const settings = {
    width: 4,
    height: 5
}

const grid = document.querySelector('.grid')
addGrid()
const tbody = document.querySelector('tbody')

function makeGrid() {
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

function addGrid() {
    const str = makeGrid()
    grid.innerHTML += str
}

function paintGrid() {
    for(let i = 0; i < settings.height; i++) {
        for(let j = 0; j < settings.width; j++) {
            if(i % 2 === 0 ) {
                if ( j % 2 === 0 ){
                    tbody.rows[i].childNodes[j].style.backgroundColor = 'blue'
                } else if ( j % 2 === 1){
                    tbody.rows[i].childNodes[j].style.backgroundColor = 'green'
                }
            } else {
                if ( j % 2 === 0 ){
                    tbody.rows[i].childNodes[j].style.backgroundColor = 'green'
                } else if ( j % 2 === 1){
                    tbody.rows[i].childNodes[j].style.backgroundColor = 'blue'
                }
            }
        }
    }
}
paintGrid()
// grid.rows[y].childNodes[x].style.backgroundColor = color
console.log()