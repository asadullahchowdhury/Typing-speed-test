const typingText = document.querySelector('.typing-text p')
const inputField = document.querySelector('.input-field')
const mistakeTag = document.querySelector('.mistake span')
const timeTag = document.querySelector('.time span b')
const wpmTag = document.querySelector('.wpm span')
const cpmTag = document.querySelector('.cpm span')
const tryAgainBtn = document.querySelector('.btn')
const resultWpm = document.querySelector('.result-wpm span')
const resultCpm = document.querySelector('.result-cpm')
let charIndex = mistakes = 0;
let timer;
let maxTime = 5;
let timeLeft = maxTime;
let isType = false
let result = false
let wpm = 0
let accuracy_text = document.querySelector(".curr_accuracy");


/*generating random paragraph*/
function randomParagraph() {
    let randomIndex = Math.floor(Math.random() * paragraphs.length)
    typingText.innerHTML = ''
    paragraphs[randomIndex].split('').forEach(span => {
        let spanTag = `<span>${span}</span>`
        typingText.innerHTML += spanTag
    })
    typingText.querySelectorAll('span')[0].classList.add('active')
    document.addEventListener('keydown', () => inputField.focus())
    typingText.addEventListener('click', () => inputField.focus())

}

/*the main typing function*/
function initTyping() {
    const characters = typingText.querySelectorAll('span')
    let typedChar = inputField.value.split("")[charIndex]
    if (timeLeft === 0) {
        initTimer()
        if (modal.classList.contains("show-modal")) {
            toggleModal()
        }
    }
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isType) {
            timer = setInterval(initTimer, 1000)
            isType = true
        }
        if (typedChar === null || typedChar === undefined) {
            charIndex--
            if (characters[charIndex].classList.contains('incorrect')) {
                mistakes--
            }
            characters[charIndex].classList.remove('correct', 'incorrect')
        } else {
            /*adding correct class*/
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add('correct')
                console.log('correct')
            } else {
                /*adding incorrect class and counting mistakes*/
                mistakes++
                console.log(mistakes)
                console.log('incorrect')
                characters[charIndex].classList.add('incorrect')
            }
            console.log(characters[charIndex])
            charIndex++

        }

        characters.forEach(span => span.classList.remove('active'))
        characters[charIndex].classList.add('active')
        mistakeTag.innerText = mistakes


        // update accuracy text
        let correctCharacters = (charIndex - mistakes);
        let accuracyVal = ((correctCharacters / charIndex) * 100);
        accuracy_text.textContent = Math.round(accuracyVal) + '%';
        if (isNaN(accuracyVal)) {
            accuracy_text.innerText = 100
        }

        /*wpm cpm calculation*/
        wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60)
        wpm = wpm < 0 || !wpm || wpm === NaN || wpm === Infinity ? 0 : wpm
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        inputField.value = '';
        clearInterval(timer)
        toggleModal()
    }
}

/*timer*/
function initTimer() {
    if (timeLeft > 0) {
        timeLeft--
        timeTag.innerText = timeLeft
    } else {
        clearInterval(timer)
        if (!modal.classList.contains("show-modal")) {
            toggleModal()
        }
        disableField()
        result = true
    }
    console.log(result)
}

/*input field will disable when time left is 0*/
function disableField() {
    if (timeLeft === 0) {
        inputField.disabled = true;
    }
}
/*modals*/
var modal = document.querySelector(".modal");
var closeButton = document.querySelector(".close-button");

/*reset function*/
function resetGame() {
    if (modal.classList.contains("show-modal")) {
        modal.classList.remove('show-modal')
    }
    randomParagraph()
    inputField.disabled = false;
    inputField.value = ''
    clearInterval(timer)
    timeLeft = maxTime;
    timeTag.innerText = timeLeft
    mistakeTag.innerText = 0
    mistakes = 0
    charIndex = 0
    wpm = 0
    isType = false
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

/*calling when page loads */
randomParagraph()
inputField.addEventListener('input', initTyping)
tryAgainBtn.addEventListener('click', resetGame)
timeTag.innerText = timeLeft



function toggleModal() {
    modal.classList.toggle("show-modal");
    console.log('modal should open')
    resultWpm.innerText = wpm
    resultCpm.innerText = charIndex - mistakes
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);


/*times*/

function time30() {
    console.log('hello')
    maxTime = 30
    timeLeft = maxTime;
    resetGame()
    console.log(maxTime)
    timeTag.innerText = timeLeft
}

function time15() {
    console.log('hello')
    maxTime = 15
    timeLeft = maxTime;
    resetGame()
    console.log(maxTime)
    timeTag.innerText = timeLeft
}

function time60() {
    console.log('hello')
    maxTime = 60
    timeLeft = maxTime;
    resetGame()
    timeTag.innerText = timeLeft
}

function time120() {
    console.log('hello')
    maxTime = 120
    timeLeft = maxTime;
    resetGame()
    console.log(maxTime)
    timeTag.innerText = timeLeft
}