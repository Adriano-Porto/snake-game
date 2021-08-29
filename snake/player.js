class Player {
    constructor() {
        this.positions = [
            { x: 8, y: 6 },
            { x: 8, y: 7 },
            { x: 8, y: 8 },
        ]

        this.color = 'rgb(200,20, 90)'
        this.direction = 'up' //up left right down
        this.alive = true
    }

    move() {
        let head = Object.assign({}, this.positions[0])
        if (this.direction === 'up') {
            head.y = head.y - 1
        } else if (this.direction === 'down') {
            head.y = head.y + 1
        } else if (this.direction === 'left') {
            head.x = head.x - 1
        } else {
            head.x = head.x + 1
        }
        this.positions.unshift(head) // add head to the front and move the rest backwards
        this.positions.pop()
    }

    changeDirection(keycode) {
        /* ArrowLeft :      37
            ArrowUp:        38
            ArrowRight:     39
            ArrowDown:      40
            a:              65
            w:              87
            d:              68
            s:              83
        */
        if(keycode === 37 ||keycode === 65) {
            this.direction = 'left'
        } else if (keycode === 39 || keycode === 68) {
            this.direction = 'right'
        } else if (keycode === 38 || keycode === 87) {
            this.direction = 'up'
        }  else {
            this.direction = 'down'
        }
    }
}

export default new Player()