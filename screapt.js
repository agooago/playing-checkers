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
    const leftValue = pawn.style.left || '25%';
    const topValue = pawn.style.top || '25%';
    const differenceY = side === 'black' ? 1 : -1;
    const differenceX = isLeft ? -1 : 1;
    startTimer(120)
    currentStep += 1;
    gdeMoiPelmen.innerText = textSide(currentStep);
    pawn.style.top = parseFloat(topValue) + differenceY * 100 + "%";
    pawn.style.left = parseFloat(leftValue) + differenceX * 100 + "%";
    stepCounter.innerText = `ход №${currentStep}`;
    const brokeBackLIightLeft = document.getElementById("backlight_left");
    const brokeBackLIightRight = document.getElementById("backlight_right");
    brokeBackLIightLeft.style.display = 'none'
    brokeBackLIightRight.style.display = 'none'
}
const backlightLeftParent = document.getElementById("backlight_left_parent");
const backlightRightParent = document.getElementById('backlight_right_parent');
window.addEventListener('load', () => {
    const backlight_left = document.getElementById("backlight_left");
    const backlight_right = document.getElementById("backlight_right");
    const backlight_up = (side, i) => {
        const currentPawn = document.getElementById(`${side}${i}`)
        const x = Number(currentPawn.getAttribute('data-x'));
        const y = Number(currentPawn.getAttribute('data-y'));
        const difference = side === 'white' ? -1 : 1;
        const nextLeftX = x - 1;
        const nextRightX = x + 1;
        const nextY = y + difference;
        if (nextY in PositionData) {
            console.log('На следующей строчки есть пешки')
            if (nextLeftX in PositionData[nextY] && PositionData[nextY][nextLeftX] !== undefined) {
                console.log('На следующей строчке есть пешка слева')
                const nextPawnSide = PositionData[nextY][nextLeftX] ? 'black' : 'white';
                console.log(`пешка на следующей строчке слева ${nextPawnSide}`)
                if (nextPawnSide !== side) {
                    console.log('Эта пешка наш противник!');
                    const nextNextX = nextLeftX - 1;
                    const nextNextY = nextY + difference;
                    console.log(`Мы попробуем сеъсть её и перемиститься на кординаты ${nextNextX} ${nextNextY}`)
                    if (!(nextNextY in PositionData) ||!(nextNextX in PositionData[nextNextY])|| PositionData[nextNextY][nextNextX] === undefined && nextLeftX > 0 && nextLeftX < 9 && nextNextY > 0 && nextNextY < 9) {
                        console.log('Можем есть влево')
                    }
                }
            }
            if (nextRightX in PositionData[nextY] && PositionData[nextY][nextRightX] !== undefined) {
                console.log('На следующей строчке есть пешка справа')
                const nextPawnSide = PositionData[nextY][nextRightX] ? 'black' : 'white';
                console.log(`пешка на следующей строчке справа ${nextPawnSide}`)
                if (nextPawnSide !== side) {
                    console.log('Эта пешка наш противник!');
                    const nextNextX = nextRightX + 1;
                    const nextNextY = nextY + difference;
                    console.log(`Мы попробуем сеъсть её и перемиститься на кординаты ${nextNextX} ${nextNextY}`)
                    if (!(nextNextY in PositionData) ||!(nextNextX in PositionData[nextNextY])|| PositionData[nextNextY][nextNextX] === undefined && nextLeftX > 0 && nextLeftX < 9 && nextNextY > 0 && nextNextY < 9) {
                        console.log('Можем есть вправо')
                    }
                }
            }
}
        if (currentStep % 2 === 0 && side === 'black' || currentStep % 2 === 1 && side === 'white') {
            const pawn = document.getElementById(`${side}${i}`);
            var backlight_left = document.getElementById("backlight_left");
            var backlight_right = document.getElementById("backlight_right");
            const difference = side === 'white' ? -1 : 1;
            const isHasRow = (y + difference) in PositionData
            const isLeftHas = isHasRow && ((x - 1) in PositionData[y + difference])
            const isRightHas = isHasRow && ((x + 1) in PositionData[y + difference])

            if (x > 1 && !isLeftHas) {
                const backlight_left_copy = backlight_left.cloneNode(true)
                backlightLeftParent.replaceChild(backlight_left_copy, backlight_left)
                backlight_left_copy.style.display = 'block';
                backlight_left_copy.style.left = (x - 2) * 100 + '%';
                backlight_left_copy.style.top = (y + difference + -1) * 100 + "%";
                backlight_left_copy.addEventListener('click', () => {
                    pawn.setAttribute('data-x', String(x - 1));
                    pawn.setAttribute('data-y', String(y + difference));
                    movePawn(i, side, true)
                    delete PositionData[y][x]
                    if (!((y + difference) in PositionData)) {
                        PositionData[y + difference] = {}
                    }
                    PositionData[y + difference][x - 1] = side === 'black' ? true : false;
                })

            }
            else {
                backlight_left.style.display = 'none';
            }
            if (x < 8 && !isRightHas) {
                delete PositionData[y][x]
                const backlight_right_copy = backlight_right.cloneNode(true)
                backlightRightParent.replaceChild(backlight_right_copy, backlight_right)
                backlight_right_copy.style.display = 'block';
                backlight_right_copy.style.left = (x - 2) * 100 + '%';
                backlight_right_copy.style.top = (y + difference + -1) * 100 + "%";
                backlight_right_copy.addEventListener('click', () => {
                    pawn.setAttribute('data-x', String(x + 1));
                    pawn.setAttribute('data-y', String(y + difference));
                    movePawn(i, side, false)
                    if (!((y + difference) in PositionData)) {
                        PositionData[y + difference] = {}
                    }
                    PositionData[y + difference][x + 1] = side === 'black' ? true : false;
                })

            }
            else {
                backlight_right.style.display = 'none';
            }
        }
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
        if (!(u in PositionData)) PositionData[u] = {}
        PositionData[u][z] = false;
    }
    for (let i = 1; i < 13; i++) {
        const blackfigure = document.getElementById(`black${i}`);
        blackfigure.addEventListener('click', () => {
            backlight_up('black', i)
        })
        const whitefigure = document.getElementById(`white${i}`);
        whitefigure.addEventListener('click', () => {
            backlight_up('white', i)
        })

    }
})
