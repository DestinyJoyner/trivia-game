/*
- NOTES
    - await functions/ async fetch
    - Make answers 'unclickable`
        - answers.style.pointerEvents = `none`
    - Revert pointer back 
        - answers.style.pointerEvents = `auto`
*/

// IMPORT ALL FUNCTIONS FROM functions.js file
import {updatedResults, index, question, answers, newGame, scoreSpan, score, modal,
    modifyX,
    updateQuestion,
    fetchInfo,
    answerChoice,
    } from './functions.js'

// No functions below this point, only what needs to be run on page load

// Landing Page asking for user input (name) to be used on game page
let user ;
const playButton = document.querySelector(`#playButton`)
const nameInput = document.querySelector(`#userName`)
playButton.addEventListener(`click`, () => {
    if(nameInput.value){
        user = nameInput.value
        document.querySelector(`header`).innerHTML = `
        <h1>Hey <span class="user">${nameInput.value},</span> What do you know?<br>Do You Know Things? Lets Find Out!</h1>`
        fetchInfo()
        document.querySelector(`main`).classList.toggle(`hidden`)
        sessionStorage.clear()
    }
})

// Reset game button to reload page
const resetButton = document.querySelector(`#reset`)
resetButton.addEventListener(`click`, () => {
    location.reload()
    sessionStorage.clear()
})


//PREVIOUS NEXT BUTTONS/ SESSION STORAGE
const previousButton = document.querySelector(`.previous`)
const nextButton = document.querySelector(`.next`)
let answerSelected = false

previousButton.addEventListener(`click`, () => {
    if(index !== 0){
        answerSelected = true 
        modifyX( index-1)
        updateQuestion(true)
        answers.innerHTML = sessionStorage.getItem(index)
       answers.style.pointerEvents = `none`
    }
})

nextButton.addEventListener(`click`, () => {
    if(!answerSelected){
        alert(`Cannot Skip Questions`)
    }
    else{
        answers.style.pointerEvents = `auto`
        answers.innerHTML = ``
        modifyX( index+1)
        sessionStorage.getItem(`answers`).split(`,`).forEach(ans => {
            updatedResults[index].incorrect_answers.push(ans)
        })
        updateQuestion()
        answerSelected = false 
    }
})

