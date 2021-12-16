const fs = require('fs')
const http = require('http')
const Jimp = require('jimp')
const url = require('url')

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })

    if (req.url == '/') {
        fs.readFile('index.html', 'utf8', (err, formulario) => {
            res.end(formulario)
        })
    }

    if (req.url == '/estilos') {
        res.writeHead(200, { 'Content-Type': 'text/css' })
        fs.readFile('estilos.css', (err, css) => {
            res.end(css)
        })
    }

    if (req.url.includes('/imagen')) {
        const params = url.parse(req.url, true).query
        Jimp.read(params.imagenUrl, (err, imagen) => {
            imagen
                .resize(400, Jimp.AUTO)
                .quality(60)
                .greyscale()
                .writeAsync('newImg.jpg')
                .then(() => {
                    fs.readFile('newImg.jpg', (err, imagenModificada) => {
                        res.writeHead(200, { 'Content-Type': 'image/jpeg' })
                        res.end(imagenModificada)
                    })
                })
        })
    }

}).listen(8083, () => console.log('Server ON'))