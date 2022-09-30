
export let updatedResults;
export let index = 0
export function modifyX( value ) { index = value; }

export const question = document.querySelector('#question')
export const answers = document.querySelector(`#answers`)
export const newGame = document.querySelector(`#newGame`)
export const scoreSpan = document.querySelector(`.score`)
export let score = 0
export const modal = document.querySelector(`#myModal`)


// Put for loop in function to repopulate answer options

const updateQuestion = (value=false) => {
    const difficulty = `${updatedResults[index].difficulty.charAt(0).toUpperCase()}${updatedResults[index].difficulty.slice(1)}`
    question.innerHTML = `
    <h5>${difficulty}</h5>
    ${updatedResults[index].question}`
    if(document.querySelector(`#newGame`)){
        document.querySelector(`#newGame`).style.visibility = `hidden`
    }
    // NEED TO SAVE INCORRECT ARRAY B4 SPLICE FOR NEXT BUTTON TO CALL UPDATEQUESTION() AND HAVE VALUES INSIDE
    if(!value){
        sessionStorage.setItem(`answers`, updatedResults[index].incorrect_answers)
    }
    
    for (let i = 0; i < 4; i++){
        const div = document.createElement(`div`)
        const randomNum = Math.floor(Math.random() * updatedResults[index].incorrect_answers.length) 

        div.innerHTML = updatedResults[index].incorrect_answers.splice(randomNum, 1)
        answers.append(div)
    }
}


const fetchInfo = async () => {
    const resp = await fetch(`https://opentdb.com/api.php?amount=3&type=multiple`)
    const respJson = await resp.json()

    updatedResults = respJson.results.map((question) => {
       question.incorrect_answers.push(question.correct_answer)
       return question
    })
    updateQuestion()
    
}

// function for display after correct or incorrect answer is selected
const answerChoice = (choice) => {
    answers.classList.toggle(`${choice}`)
    if(choice === `correctAnswer`){
        answers.innerHTML =  `Correct!`
    }
    else {
        answers.innerHTML = `Incorrect!`
    }
    setTimeout(() =>{
        answers.innerHTML = ``
        answers.classList.remove(`${choice}`)
        index++
        if(index >= updatedResults.length){
            answers.innerHTML = ``
            question.innerHTML = ``
            // Open Modal Upon Game Completion
            modal.style.display = "block"
            const modalContent = document.querySelector(`.finalScore`)
            modalContent.innerHTML = `<h2>${document.querySelector(`.user`).innerText}<br>Final Score: ${scoreSpan.innerHTML}</h2>`
            newGame.style.visibility = `visible`
            
            document.querySelector(`.questions`).style.visibility = `hidden`
            
        }
        else{
            updateQuestion()
        }
        
    }, 1000)
    
}


//Event listener for correct answer choice
answers.addEventListener(`click`, (event) => {
    const points = document.querySelector(`h5`).innerText
    if(event.target.innerHTML === updatedResults[index].correct_answer){
        event.target.style.backgroundColor = `rgb(43, 203, 43)`
        if(points === `Easy`){
            score += 3
        }
        if(points === `Medium`){
            score += 7
        }
        if(points === `Hard`){
            score += 10
        }
        scoreSpan.innerHTML = score
        sessionStorage.setItem(`${index}`, `${answers.innerHTML}`)
        answerChoice(`correctAnswer`)
    }
    // Eliminates turning background color of answers red when area around answer choices is clicked
    else if(event.target.innerHTML !== answers.innerHTML && event.target.innerHTML !== updatedResults[index].correct_answer ) {
        event.target.style.backgroundColor = `red`
        event.target.style.textDecoration = `line-through`
        const answerOptions = document.querySelectorAll(`#answers div`)
        answerOptions.forEach(ans => {
            if(ans.innerHTML === updatedResults[index].correct_answer){
                ans.style.backgroundColor = `rgb(43, 203, 43)`
            }
        })
        // STORE CHOSEN ANSWERS IN SESSION STORAGE
        sessionStorage.setItem(`${index}`, `${answers.innerHTML}`)
        setTimeout(() => {
            answerChoice(`incorrectAnswer`)
        }, 2000)
    }
})

// Event listener for 'New Game Button`
newGame.addEventListener(`click`, () => {
    modal.style.display = "none"
    document.querySelector(`.questions`).style.visibility = `visible`
    index = 0
    score = 0
    scoreSpan.innerHTML = score
    sessionStorage.clear()
    fetchInfo()
})


export {
    updateQuestion,
    fetchInfo,
    answerChoice,
}