
export let updatedResults;
export let index = 0

export const question = document.querySelector('#question')
export const answers = document.querySelector(`#answers`)
export const newGame = document.querySelector(`#newGame`)
export const scoreSpan = document.querySelector(`.score`)
export let score = 0

// Put for loop in function to repopulate answer options
const updateQuestion = () => {
    question.innerHTML = updatedResults[index].question
    if(document.querySelector(`#newGame`)){
        document.querySelector(`#newGame`).style.visibility = `hidden`
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
            question.innerHTML = `<h2>${document.querySelector(`.user`).innerText}<br>Final Score: ${scoreSpan.innerHTML}</h2>`
            answers.innerHTML = ``
            newGame.style.visibility = `visible`
        }
        else{
            updateQuestion()
        }
        
    }, 1000)
    
}


//Event listener for correct answer choice
answers.addEventListener(`click`, (event) => {
    if(event.target.innerHTML === updatedResults[index].correct_answer){
        score += 10
        scoreSpan.innerHTML = score
        answerChoice(`correctAnswer`)
    }
    // Eliminates turning background color of answers red when area around answer choices is clicked
    else if(event.target.innerHTML !== answers.innerHTML && event.target.innerHTML !== updatedResults[index].correct_answer ) {
        event.target.style.backgroundColor = `red`
        const answerOptions = document.querySelectorAll(`#answers div`)
        answerOptions.forEach(ans => {
            if(ans.innerHTML === updatedResults[index].correct_answer){
                ans.style.backgroundColor = `green`
            }
        })
        setTimeout(() => {
            answerChoice(`incorrectAnswer`)
        }, 2000)
    }
})

// Event listener for 'New Game Button`
newGame.addEventListener(`click`, () => {
    index = 0
    fetchInfo()
})


export {
    updateQuestion,
    fetchInfo,
    answerChoice,
}