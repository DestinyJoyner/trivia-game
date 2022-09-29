/*
- NOTES
    - await functions/ async fetch
    - Make answers 'unclickable`
        - answers.style.pointerEvents = `none`
    - Revert pointer back 
        - answers.style.pointerEvents = `auto`
*/

// IMPORT ALL FUNCTIONS FROM functions.js file
import {updatedResults, index, question, answers, newGame, scoreSpan, score, 
    updateQuestion,
    fetchInfo,
    answerChoice,
    } from './functions.js'

// No functions below this point, only what needs to be run on page load

let user ;
const playButton = document.querySelector(`#playButton`)
const nameInput = document.querySelector(`#userName`)
playButton.addEventListener(`click`, () => {
    if(nameInput.value){
        user = nameInput.value
        document.querySelector(`header`).innerHTML = `
        <h1>Hey, <span class="user">${nameInput.value}</span> What do you know? Do You Know Things? Let's Find Out!</h1>`
        fetchInfo()
        document.querySelector(`main`).classList.toggle(`hidden`)
    }
})




