import { FirsAndFire } from "./firs-and-fire.js";


const firsAndFire = new FirsAndFire()

const startButton = document.getElementById('startButton')
console.log(startButton)

const attachment = document.getElementById('gameDiv')

firsAndFire.startGame(startButton, attachment)


