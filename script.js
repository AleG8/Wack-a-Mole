const $playground = document.querySelector('.playground');
let $timer = document.querySelector('#timer');
let $score = document.querySelector('#score');
let gameOn = false;
let moleSpace = '';
let crushedSpace = '';
let smashing = false;
let time = 60;
let score = 0;

function setupGame(){
    for(let i = 0; i < 9; i++){
        $playground.insertAdjacentHTML('beforeend', `
            <article class="space">
                <div class="img-container">
                    <img src="./mole.png" alt="mole">
                </div>
                <span class="earth"><span>
            </article>
        `);
        let currentElement = $playground.lastElementChild;

        currentElement.setAttribute('data-position', i);
        currentElement.addEventListener('click', (e)=>{
            if(gameOn && !smashing){
                smashing = true;
                currentElement.classList.add('smash');
                crushedSpace = currentElement;
                //Check smash
                checkSmashed();
                //
                setTimeout(()=>{
                    currentElement.classList.remove('smash');
                    crushedSpace = '';
                    smashing = false;
                }, 600);
            } 
        });
    };
};

function moleLoop(){
    gameOn = true;
    let gameInteval = setInterval(()=>{
        let randomPosition = Math.floor(Math.random() * 9);
        let nextSpace = Array.from($playground.children).find(elem => {
            return Number(elem.dataset.position) === randomPosition
        });

        nextSpace.classList.add('active');
        moleSpace = nextSpace;
        setTimeout(()=>{
            nextSpace.classList.remove('active');
            moleSpace = '';
        }, 1000);
        if(time < 1){
            clearInterval(gameInteval);
        }
    }, 2000);
}

function checkSmashed(){
    if(
        moleSpace &&
        (moleSpace.dataset.position ===
        crushedSpace.dataset.position)
    ){
        score++
        $score.textContent = score;
    }
};

function timerOn(){
    $timer.textContent = time;
    let timerInterval = setInterval(()=>{
        time--;
        $timer.textContent = time;
        if(time < 1){
            gameOn = false;
            clearInterval(timerInterval);
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', ()=>{
    setupGame();
    moleLoop();
    timerOn();
});