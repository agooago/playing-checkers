let PositionData = {}
const movePawn =(index, side, isLeft)=>{
    const innerMovePawn = () =>{
        alert (`Пешка №${index} цвет ${side} идет на лево ${isLeft}`)
    }
    return innerMovePawn
}
window.addEventListener('load', () => {
    var backlight_left = document.getElementById("backlight_left");
    var backlight_right = document.getElementById("backlight_right");
    var white = document.getElementsByClassName('white');
    var belie_i_chernie_chtyki = document.getElementsByClassName("big");
    const backlight_up = (x, y, side, i) => {
        console.log(PositionData);
        var backlight_left = document.getElementById("backlight_left");
        var backlight_right = document.getElementById("backlight_right");
        const difference = side === 'white' ? -1 : 1;
        const isHasRow = (Number(y) + difference) in PositionData
        const isLeftHas = isHasRow && ((Number (x) -1 ) in PositionData[Number(y) + difference])
        const isRightHas = isHasRow && ((Number (x) + 1) in PositionData[Number(y) + difference])  
        if (x > 1 && !isLeftHas) {
            const backlight_left_copy = backlight_left.cloneNode(true)
            parentnot.replaceChild(backlight_left_copy,backlight_left)
            backlight_left_copy.style.display = 'block';
            backlight_left_copy.style.left = (x - 2) * 100 + '%';
            backlight_left_copy.style.top = (Number(y) + difference + -1) * 100 + "%";
            backlight_left_copy.addEventListener('click',movePawn(i, side, true))
        }
        else {
            backlight_left.style.display = 'none';
        }
        if (x < 8 && !isRightHas) {
            const backlight_right_copy = backlight_left.cloneNode(true)
            parentnot.replaceChild(backlight_right_copy,backlight_right)
            backlight_right_copy.style.display = 'block';
            backlight_right_copy.style.left = (x - 2) * 100 + '%';
            backlight_right_copy.style.top = (Number(y) + difference + -1) * 100 + "%";
            backlight_right_copy.addEventListener('click',movePawn(i, side, false))
        }
        else {
            backlight_right.style.display = 'none';
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