class Player {
    constructor() {
        this.positions = [
            { x: 8, y: 6},
            { x: 8, y: 7},
            { x: 8, y: 8},
        ]

        this.color = 'rgb(200,20, 90)'
        this.direction = 'up' //up left right down
        this.alive = true
    }

    move() {
        let head = Object.assign({}, this.positions[0])
        if(this.direction === 'up') {
            head.y = head.y - 1
        } else if( this.direction === 'down') {
            head.y = head.y + 1
        } else if( this.direction === 'left') {
            head.x = head.x - 1
        } else {
            head.x = head.x + 1
        }
        console.log(this.positions)
        this.positions.unshift(head) // add head to the front and move the rest backwards
        this.positions.pop()
    }

}

export default new Player()