let PositionData = {}
let currentStep = 1
let timerInterval;
const startTimer = (duration) => {
    clearInterval(timerInterval)
    let timer = duration
    timerInterval = setInterval(() => {
        let minuties = Math.floor(timer / 60);
        let seconds = timer % 60;
        minuties = (minuties < 10 ? '0' : '') + minuties;
        seconds = (seconds < 10 ? '0' : '') + seconds;
        timerBlock.innerText = `${minuties}:${seconds}`;
        if (--timer < 0) {
            clearInterval(timerInterval);
            timerBlock.innerText = 'время вышло';
        }
    }, 1000)
};
const textSide = (currentStep) => {
    if (currentStep % 2 === 0) return "сейчас ходят черненкие";
    return "сейчас ходят беленькие"
}
const startButton = document.getElementById("votMoiPelmen");
const phone = document.getElementById("invisible_slise");
const timerBlock = document.getElementById("timer")
startButton.addEventListener("click", () => {
    phone.style.opacity = '0%';
    startButton.style.opacity = "0%";
    startTimer(120)
    setTimeout(() => {
        phone.style.display = "none";
        startButton.style.display = "none";
    }, 2000)
})
const stepCounter = document.getElementById("counter");
const gdeMoiPelmen = document.getElementById("side")
const movePawn = (index, side, isLeft) => {
    const pawn = document.getElementById(`${side}${index}`);
    const x = pawn.getAttribute('data-x');
    const y = pawn.getAttribute('data-y');
    const leftValue = pawn.style.left || pawn.offsetLeft;
    const topValue = pawn.style.top || pawn.offsetTop;
    const differenceY = side === 'black' ? 1 : -1;
    const differenceX = isLeft ? -1 : 1;
    startTimer(120)
    currentStep += 1;
    gdeMoiPelmen.innerText = textSide(currentStep);
    pawn.style.top = parseFloat(topValue) + differenceY * 100 + "%";
    pawn.style.left = parseFloat(leftValue) + differenceX * 100 + "%";
    stepCounter.innerText = `ход №${currentStep}`;
}
const backlightLeftParent = document.getElementById("backlight_left_parent");
const backlightRightParent = document.getElementById('backlight_right_parent');
window.addEventListener('load', () => {
    const backlight_left = document.getElementById("backlight_left");
    const backlight_right = document.getElementById("backlight_right");
    const white = document.getElementsByClassName('white');
    const backlight_up = (x, y, side, i) => {
        if (currentStep % 2 === 0 && side === 'black' || currentStep % 2 === 1 && side === 'white') {
            const pawn = document.getElementById(`${side}${i}`);
            var backlight_left = document.getElementById("backlight_left");
            var backlight_right = document.getElementById("backlight_right");
            const difference = side === 'white' ? -1 : 1;
            const isHasRow = (Number(y) + difference) in PositionData
            const isLeftHas = isHasRow && ((Number(x) - 1) in PositionData[Number(y) + difference])
            const isRightHas = isHasRow && ((Number(x) + 1) in PositionData[Number(y) + difference])

            if (x > 1 && !isLeftHas) {
                const backlight_left_copy = backlight_left.cloneNode(true)
                backlightLeftParent.replaceChild(backlight_left_copy, backlight_left)
                backlight_left_copy.style.display = 'block';
                backlight_left_copy.style.left = (x - 2) * 100 + '%';
                backlight_left_copy.style.top = (Number(y) + difference + -1) * 100 + "%";
                backlight_left_copy.addEventListener('click', () => {
                    pawn.setAttribute('data-x', String(Number(x) - 1));
                    pawn.setAttribute('data-y', String(Number(y) + difference));
                    movePawn(i, side, true)
                    delete PositionData[Number(y)][Number(x)]
                    if (!((Number(y) + difference) in PositionData)) {
                        PositionData[Number(y) + difference] = {}
                    }
                    PositionData[Number(y) + difference][Number(x) - 1] = side === 'black' ? true : false;
                })

            }
            else {
                backlight_left.style.display = 'none';
            }
            if (x < 8 && !isRightHas) {
                delete PositionData[Number(y)][Number(x)]
                const backlight_right_copy = backlight_right.cloneNode(true)
                backlightRightParent.replaceChild(backlight_right_copy, backlight_right)
                backlight_right_copy.style.display = 'block';
                backlight_right_copy.style.left = (x - 2) * 100 + '%';
                backlight_right_copy.style.top = (Number(y) + difference + -1) * 100 + "%";
                backlight_right_copy.addEventListener('click', () => {
                    pawn.setAttribute('data-x', String(Number(x) + 1));
                    pawn.setAttribute('data-y', String(Number(y) + difference));
                    movePawn(i, side, false)
                    if (!((Number(y) + difference) in PositionData)) {
                        PositionData[Number(y) + difference] = {}
                    }
                    PositionData[Number(y) + difference][Number(x) + 1] = side === 'black' ? true : false;
                })

            }
            else {
                backlight_right.style.display = 'none';
            }
            console.log(PositionData);
        }
        //alert(${x} ${y} ${side})
    }
    const backlight_off = () => {
        backlight_left.style.display = 'none';
        backlight_right.style.display = 'none';
    }
    for (var i = 0, len = white.length; i < len; i++) {
        white[i].addEventListener('click', backlight_off)
    }
    for (let i = 1; i < 13; i++) {
        const blackfigure = document.getElementById(`black${i}`);
        const x = blackfigure.getAttribute('data-x');
        const y = blackfigure.getAttribute('data-y');
        if (!(y in PositionData)) PositionData[y] = {}
        PositionData[y][x] = true;
        const whitefigure = document.getElementById(`white${i}`);
        const z = whitefigure.getAttribute('data-x');
        const u = whitefigure.getAttribute('data-y');
        console.log(`${whitefigure} ${i} ${z} ${u}`)
        if (!(u in PositionData)) PositionData[u] = {}
        PositionData[u][z] = false;
    }
    for (let i = 1; i < 13; i++) {
        const blackfigure = document.getElementById(`black${i}`);
        const x = blackfigure.getAttribute('data-x');
        const y = blackfigure.getAttribute('data-y');
        blackfigure.addEventListener('click', () => {
            backlight_up(x, y, 'black', i)
        })
        const whitefigure = document.getElementById(`white${i}`);
        const z = whitefigure.getAttribute('data-x');
        const u = whitefigure.getAttribute('data-y');
        whitefigure.addEventListener('click', () => {
            backlight_up(z, u, 'white', i)
        })

    }
    console.log(PositionData)
})
