// await functions/ async fetch

let updatedResults;
let index = 0

const question = document.querySelector('#question')
const answers = document.querySelector(`#answers`)
const next = document.querySelector(`#next`)
// console.log(question,answers,next)
const scoreSpan = document.querySelector(`.score`)
let score = 0

// Put for loop in function to repopulate answer options
const updateQuestion = () => {
    question.innerHTML = updatedResults[index].question

    for (let i = 0; i < 4; i++){
        const div = document.createElement(`div`)
        const randomNum = Math.floor(Math.random() * updatedResults[index].incorrect_answers.length) 

        div.innerHTML = updatedResults[index].incorrect_answers.splice(randomNum, 1)
        answers.append(div)
    }
}

const fetchInfo = async () => {
    const resp = await fetch(`https://opentdb.com/api.php?amount=10&type=multiple`)
    const respJson = await resp.json()
    // console.log(respJson)

    updatedResults = respJson.results.map((question) => {
       question.incorrect_answers.push(question.correct_answer)
       return question
    })
    // console.log(updatedResults)
    updateQuestion()
    
}

//Event Listener for 'next' button to generate new question and answers
next.addEventListener(`click`, () => {
    index++
    if(index >= updatedResults.length){
        question.innerHTML = `${scoreSpan.innerHTML}`
        answers.innerHTML = ``
    }
    else {
        answers.innerHTML = ``
        updateQuestion()
    }
    answers.style.pointerEvents = `auto`
    
})

//Event listener for correct answer choice
answers.addEventListener(`click`, (event) => {
    if(event.target.innerHTML === updatedResults[index].correct_answer){
        score += 10
        scoreSpan.innerHTML = score
        event.target.style.color = `green`

    }
    else {
        event.target.style.color = `red`
    }
    //Make answers 'unclickable`
    answers.style.pointerEvents = `none`
})

fetchInfo()

