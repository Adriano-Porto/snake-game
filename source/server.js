import express from 'express'
import { resolve, join } from 'path'

const viewsPath = resolve('public', 'views')

const app = express()

app
    .use(express.static('public'))
    .get('/', (req, res) => {
        return res.sendFile(join(viewsPath, 'index.html')) //Send the HTML File
    })
    .listen(3333, () => {console.log("LISTENING ON 3333")})