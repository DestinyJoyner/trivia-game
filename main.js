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
let user = prompt(`Hello! Welcome to Trivia! Please Enter You're Name To Get Started`)
if(user){
    document.querySelector(`.user`).innerText = user
    fetchInfo()
}



