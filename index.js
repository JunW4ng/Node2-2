const child = require('child_process')
const yargs = require('yargs')

const key = 123

const argv = yargs.command(

    'blackwhite',
    'Cambio de color en imagen',
    {
        key: {
            describe: 'Key para levantar servidor',
            demand: true,
            alias: 'k'
        }
    },

    (args) => {
        if (args.key != key) console.log("Key incorrecta")

        child.exec('node server.js', (err, stdout) => {
            err ? console.log(err) : console.log(stdout)
        })
    }
)
    .help().argv