let PositionData = {}
const movePawn = (index, side, isLeft) => {
    const  innerMovePawn = () => {
        console.log (1)
        const pawn = document.getElementById(`${side}${index}`);
        const x = pawn.getAttribute('data-x');
        const y = pawn.getAttribute('data-y');
        console.log(`${x} ${y}`)
    }
    return innerMovePawn
}
const backlightLeftParent = document.getElementById("backlight_left_parent");
const backlightRightParent = document.getElementById('backlight_right_parent');
window.addEventListener('load', () => {
    const backlight_left = document.getElementById("backlight_left");
    const backlight_right = document.getElementById("backlight_right");
    const white = document.getElementsByClassName('white');
    const backlight_up = (x, y, side, i) => {
        console.log(PositionData);
        var backlight_left = document.getElementById("backlight_left");
        var backlight_right = document.getElementById("backlight_right");
        const difference = side === 'white' ? -1 : 1;
        const isHasRow = (Number(y) + difference) in PositionData
        const isLeftHas = isHasRow && ((Number(x) - 1) in PositionData[Number(y) + difference])
        const isRightHas = isHasRow && ((Number(x) + 1) in PositionData[Number(y) + difference])

        if (x > 1 && !isLeftHas) {
            const backlight_left_copy = backlight_left.cloneNode(true)
            backlight_left_parent.replaceChild(backlight_left_copy, backlight_left)
            backlight_left_copy.style.display = 'block';
            backlight_left_copy.style.left = (x - 2) * 100 + '%';
            backlight_left_copy.style.top = (Number(y) + difference + -1) * 100 + "%";
            backlight_left_copy.addEventListener('click', () => {
                backlight_left_copy.setAttribute('data-x', String(Number(x) - 1));
                backlight_left_copy.setAttribute('data-y', String(Number(y) + difference));
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
                backlight_right_copy.setAttribute('data-x', String(Number(x) + 1));
                backlight_right_copy.setAttribute('data-y', String(Number(y) + difference));
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
