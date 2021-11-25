const MENU = {
    screen: document.getElementById('menu-screen-div'),
    container: document.getElementsByClassName('container')[0],
    btn: {
        start: document.getElementById('menu-btn-start'),
        play: document.getElementById('menu-btn-play'),
        mode: document.getElementById('menu-btn-mode'),
        about: document.getElementById('menu-btn-about'),
        back: document.getElementById('menu-btn-back'),
        listeners: [],
    },
    text: {
        start: document.getElementById('menu-text-start'),
        play: document.getElementById('menu-text-play'),
        about: document.getElementById('menu-text-about'),
        mode: {
            h: document.getElementById('menu-header-play'),
            p: document.getElementById('menu-p-play'),
        },
    },
    ul: document.getElementsByClassName('menu-ul')[0],
    INITIAL: () => {
        MENU.btn.play.style.display = 'block';
        MENU.btn.about.style.display = 'block';
        MENU.btn.mode.style.display = 'none';
        MENU.btn.start.style.display = 'none';
        MENU.btn.back.style.display = 'none';
        MENU.ul.style.display = 'block';
        MENU.text.about.style.display = 'none';
        MENU.text.play.style.display = 'none';
        MENU.text.start.style.display = 'none';
        MENU.container.style.justifyContent = 'space-between';
    },
    SHOW: () => {
        if (MENU.screen.classList.contains('menu-screen-hide')) {
            MENU.screen.classList.remove('menu-screen-hide');
            MENU.INITIAL();
        }
        if (!MENU.screen.classList.contains('menu-screen-show')) {
            MENU.screen.classList.add('menu-screen-show')
        }
        if (!area.classList.contains('area-inactive')) {
            area.classList.add('area-inactive')
        }
    },
    LISTEN: () => {
        MENU.btn.listeners.push(MENU.btn.start.addEventListener('click', () => {
            MENU.text.start.style.display = 'block';
            MENU.text.mode.p.style.display = 'none';
            MENU.ul.style.display = 'none';
            MENU.btn.start.removeEventListener('click', MENU.btn.listeners[0]);
            MENU.btn.about.removeEventListener('click', MENU.btn.listeners[1]);
            MENU.btn.back.removeEventListener('click', MENU.btn.listeners[2]);
            MENU.btn.play.removeEventListener('click', MENU.btn.listeners[3]);
            MENU.btn.mode.removeEventListener('click', MENU.btn.listeners[4]);
            setTimeout(() => {
                MENU.text.play.style.display = 'none';
                MENU.text.start.style.display = 'none';
                MENU.container.style.justifyContent = 'center';
                if (MENU.screen.classList.contains('menu-screen-show')) {
                    MENU.screen.classList.remove('menu-screen-show')
                }
                if (!MENU.screen.classList.contains('menu-screen-hide')) {
                    MENU.screen.classList.add('menu-screen-hide')
                }
                if (GAME.isGameOver) {
                    GAME.RESET();
                } else {
                    GAME.START();
                }
                if (area.classList.contains('area-inactive')) {
                    area.classList.remove('area-inactive')
                }
                document.body.style.width = window.outerWidth
                document.body.style.height = window.outerHeight
                console.log('hey!!!!')
            }, 5000)
        }))
        MENU.btn.listeners.push(MENU.btn.about.addEventListener('click', () => {
            MENU.btn.about.style.display = 'none';
            MENU.text.about.style.display = 'block';
            MENU.btn.back.style.display = 'block';
        }))
        MENU.btn.listeners.push(MENU.btn.back.addEventListener('click', () => {
            MENU.INITIAL();
        }))
        MENU.btn.listeners.push(MENU.btn.play.addEventListener('click', () => {
            MENU.text.about.style.display = 'none';
            MENU.text.mode.p.style.display = 'block';
            MENU.btn.start.style.display = 'block';
            MENU.btn.play.style.display = 'none';
            MENU.btn.mode.style.display = 'block';
            MENU.btn.about.style.display = 'none';
            MENU.btn.back.style.display = 'block';

            MENU.text.play.style.display = 'block';
            GAME.modeChosen = 0;
            MENU.text.mode.h.innerHTML = GAME.mode[GAME.modeChosen].name;
            MENU.text.mode.p.innerHTML = GAME.mode[GAME.modeChosen].info;
        }))
        MENU.btn.listeners.push(MENU.btn.mode.addEventListener('click', () => {
            GAME.modeChosen++;
            GAME.modeChosen %= GAME.mode.length;
            MENU.text.mode.h.innerHTML = GAME.mode[GAME.modeChosen].name;
            MENU.text.mode.p.innerHTML = GAME.mode[GAME.modeChosen].info;

        }))
    },
}

// let aniId = 0;


function createDiv(parent, id) {
    const div = document.createElement('div');
    div.setAttribute('id', `${id}`)
    parent.appendChild(div);
    return div
}

const area = document.getElementById('game-area');

//GAME
const GAME = {
    element: document.getElementById('game-container-left'),
    width: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    xAvg: 0,
    yAvg: 0,
    containerRight: document.getElementById('game-container-right'),
    container: document.getElementById('game-container'),
    scale: 1,
    points: 0,
    maxPoints: 0,
    held_directions: [],
    cheats: false,
    isGameStarted: false,
    isGameOver: false,
    isLost: false,
    scope: [0, 100],
    border: {
        x: 0,
        top: 0,
        bottom: 0,
    },
    level: 0,
    levels: [
        {
            rows: 3,
            columns: 4,
            bonus: undefined,
            message: undefined,
            gapToBlockHeightRatio: 2.5,
        },
        {
            rows: 4,
            columns: 4,
            bonus: 'speedBall',
            message: 'You Start with a Special Bonus!'
        },
        {
            rows: 6,
            columns: 2,
            bonus: undefined,
            message: undefined,

        },
        {
            rows: 3,
            columns: 6,
            bonus: 'slowPad',
            message: 'You Start with a Special Bonus!',
            marginY: 3,
        },
        {
            rows: 5,
            columns: 5,
            bonus: 'random',
            message: 'You Start with a Random Bonus!'
        },
        {
            rows: 5,
            columns: 6,
            bonus: undefined,
            message: undefined,
        },
        {
            rows: 7,
            columns: 2,
            bonus: undefined,
            message: undefined,
        },
        {
            rows: 6,
            columns: 6,
            bonus: 'crazyBall',
            message: 'You Start with a Special Bonus!'
        },
        {
            rows: 8,
            columns: 3,
            bonus: undefined,
            message: undefined,
            marginY: 0.4,
        },
        {
            rows: 7,
            columns: 6,
            bonus: undefined,
            message: undefined,
        },
        {
            rows: 8,
            columns: 6,
            bonus: undefined,
            message: undefined,
            marginY: 0.4,
        },
        {
            rows: 1,
            columns: 1,
            bonus: undefined,
            message: 'There is only one more!',
            boss: true,
        },
    ],
    mode: [
        {
            name: 'classic',
            info: 'Simple block breaker game. 10lvl, 11bonuses',
        },
        {
            name: 'crazyBallSurvival',
            info: 'The ball is alive and wants you to lose!',
            addPost: () => { BALL.isBallCrazy = true; BONUSES.timeLeft[BONUSES.types.indexOf('crazyBall')] = 'endless'; },
        },
        {
            name: 'extraBonuses',
            info: 'Waiting for Xmass gifts!? Here you are.',
            addPre: () => { BLOCKS.bonusToBlocksRatio = 0.5; },
        },
        {
            name: 'cheat',
            info: 'Press magic keys to relase bonuses: 1,2,3,4-change ball speed, 5-spawn ball in top area of game, space- shot.',
            addPre: () => { GAME.cheats = true },
        },
        {
            name: 'endlessBonuses',
            info: 'Once you get it, it stays. ',
            addPost: () => { BONUSES.time.default = 'endless'; },
        },
        {
            name: 'allBonuses',
            info: 'You have them at once. ',
            addPost: () => { BONUSES.timeLeft = new Array(BONUSES.timeLeft.length).fill('endless'); BONUSES.types.forEach(b => { addBonus(b) }) },
        },
        {
            name: 'trickyBlocks',
            info: 'Are angles right? ',
            addPost: () => { BONUSES.timeLeft[BONUSES.types.indexOf('randomAngles')] = 'endless'; addBonus('randomAngles'); },
        },
    ],
    modeChosen: 0,
    modeClear: () => {
        GAME.cheats = false;
        BLOCKS.bonusToBlocksRatio = 0.5;
    },
    START: () => {
        initialPosition();
        clock(100);
        GAME.RESET();
        startAnimating(100);
    },
    RESET: () => {
        reset(true, GAME.levels[0].rows, GAME.levels[0].columns, GAME.levels[0].bonus, GAME.levels[0].message)
        console.log(GAME.mode[GAME.modeChosen].name)
    },
    levelUp: () => {
        GAME.level++;
        INFO.level.innerText = `${GAME.level + 1}`
        reset(false, GAME.levels[GAME.level].rows, GAME.levels[GAME.level].columns, GAME.levels[GAME.level].bonus, GAME.levels[GAME.level].message)
    },
}

//INFOS
const INFO = {
    element: document.getElementById('game-info'),
    bonus: {
        element: document.getElementById('bonus'),
        duration: document.getElementById('bonus-duration'),
        infoList: {
            bonus: document.getElementById('bonus-info-list-bonus'),
            time: document.getElementById('bonus-info-list-time'),
        },
    },
    level: document.getElementById('game-level'),
    points: document.getElementById('game-points'),
    btnReset: document.getElementById('game-btn-reset'),
    default: 'Break All The Blocks!',
}

//PAD
const PAD = {
    element: createDiv(GAME.element, 'pad'),
    x: 0,
    y: 0,
    speed: 4,
    isPadSlippery: false,
    isPadShots: false,
    width: 0,
    height: 0,
    top: 0,
    xAvg: 0,
    yAvg: 0,
}

//BALL
const BALL = {
    element: createDiv(GAME.element, 'ball'),
    width: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    xAvg: 0,
    yAvg: 0,
    x: 0,
    y: 0,
    angle: 0,
    dAngle: {
        xy: 0,
        x: 0,
        y: 0,
    },
    speed: 3,
    speedX: 0,
    speedY: 0,
    dmg: 1,
    transition: {
        start: getComputedStyle(document.body).getPropertyValue('--ballTransitionStart'),
        sticky: getComputedStyle(document.body).getPropertyValue('--ballTransitionSticky'),
    },
    isBallSticky: true,
    isBallMoving: false,
    isBallCannon: false,
    isBallCrazy: false,
    isHitted: 0,
    lastHit: -1,
    type: 'ball',
    setAngle: () => {
        BALL.angle = Math.random() * 0.8 + 0.1;
    },
}

//BLOCKS
const BLOCKS = {
    elements: [],
    width: 0,
    height: 0,
    id: [],
    hp: [],
    isHavingBonus: [],
    container: {
        element: createDiv(GAME.element, 'blocks-container'),
        margin: {
            x: 2,
            y: 2.5,
        },
        width: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        xAvg: 0,
        yAvg: 0,
        x: 0,
        y: 0,
        animation: {
            rowDown: () => {
                if (GAME.isGameStarted && !GAME.isGameOver) {
                    BLOCKS.container.element.style.animation = `moving-down ${BLOCKS.animation.duration.y}ms`;
                    BLOCKS.container.element.style.animationIterationCount = '1';
                    BLOCKS.animation.current = setTimeout(() => {
                        BLOCKS.container.margin.y += BLOCKS.animation.translation.y;
                        BLOCKS.container.element.style.top = `${BLOCKS.container.margin.y}px`;
                        blocksPadCollision();
                        BLOCKS.container.animation.rowX();
                    }, BLOCKS.animation.duration.y)
                }
            },
            rowX: () => {
                if (GAME.isGameStarted && !GAME.isGameOver) {
                    BLOCKS.container.element.style.animation = `moving ${BLOCKS.animation.duration.x}ms infinite`;
                    // blocksContainer.style.animationIterationCount = '2';
                    BLOCKS.animation.current = setTimeout(() => {
                        BLOCKS.container.animation.rowDown();
                    }, 4 * BLOCKS.animation.duration.x)
                }
            },
        },
    },
    gap: 22,
    animation: {
        restrictedClasses: ['hitted-up', 'hitted-down', 'hitted-left', 'hitted-right'],
        current: 0,
        duration: {
            x: parseInt(getComputedStyle(document.body).getPropertyValue('--blocksContainerAnimation')),
            y: parseInt(getComputedStyle(document.body).getPropertyValue('--blocksContainerDownAnimation')),
            hitted: parseFloat(getComputedStyle(document.body).getPropertyValue('--hittedAnimationDuration')),
        },
        translation: {
            y: parseInt(getComputedStyle(document.body).getPropertyValue('--movingDown')),
        },
    },
    COR: 0,
    width: 0,
    height: 0,
    bonusToBlocksRatio: 0.14,
}

//BONUSES
const BONUSES = {
    elements: [],
    width: 0,
    height: 0,
    timeOutHandles: [],
    types: ['sticky', 'cannon', 'shots', 'speedBall', 'slowBall', 'speedPad', 'slowPad', 'slipperyPad', 'Time+', 'Time-', 'crazyBall', 'randomAngles'],
    timeLeft: new Array(['sticky', 'cannon', 'shots', 'speedBall', 'slowBall', 'speedPad', 'slowPad', 'slipperyPad', 'Time+', 'Time-', 'crazyBall', 'randomAngles'].length).fill(0),
    time: {
        default: 10000,
        change: 0.5,
        reset: null,
        isChanged: true,
    },
    active: [],
    shots: {
        elements: [],
        dmg: 1,
        timeOutHandles: [],
        animation: {
            duration: parseFloat(getComputedStyle(document.body).getPropertyValue('--shotAnimationDuration')),
        },
        isAlive: [],
    },
    awaited: undefined,
}

// const initials = [AREA, GAME, INFO, BALL, PAD, BONUSES, BLOCKS];



function saveSize(obj) {
    if (!(obj == BONUSES || obj == BLOCKS)) {
        obj.width = xy.width(obj.element);
        obj.height = xy.height(obj.element);
        obj.left = xy.left(obj.element);
        obj.right = xy.right(obj.element);
        obj.top = xy.top(obj.element);
        obj.bottom = xy.bottom(obj.element);
        obj.xAvg = xy.xAvg(obj.element);
        obj.yAvg = xy.yAvg(obj.element);
    } else {
        obj.width = xy.width(obj.elements[0]);
        obj.height = xy.height(obj.elements[0]);
    }
}

function reset(resetPoints = true, rows = GAME.levels[0].rows, columns = GAME.levels[0].columns, bonus = undefined, message = undefined) {//blockcontainet to 0,0; innerHtml in top poisition. game over when block container touches pad
    scale = 1;
    area.style.transform = `translate3d(-50%,-50%,0) scale(${scale})`;
    GAME.mode[GAME.modeChosen].addPre ? GAME.mode[GAME.modeChosen].addPre() : GAME.modeClear();
    setGame();
    if (resetPoints) {
        resetFull();
    }
    setBall();
    setBlocks(rows, columns);
    setAreaSize();
    saveSize(BLOCKS);
    saveSize(BLOCKS.container);
    saveSize(GAME);
    saveSize(PAD);
    saveSize(BALL);
    addLevelInitial(bonus, message);

    if (GAME.mode[GAME.modeChosen].addPost) {
        GAME.mode[GAME.modeChosen].addPost();
    }
    document.body.style.height = `${window.outerHeight}px`
    document.body.style.width = `${window.outerWidth}px`

}
function resetFull() {
    BONUSES.time.change *= BONUSES.time.default;
    BONUSES.timeLeft = new Array(BONUSES.timeLeft.length).fill(0)
    removeAllSendedBonuses();
    removeAllBonuses();
    removeAllShots();
    GAME.points = 0;
    GAME.maxPoints = 0;
    GAME.level = 0;
    INFO.points.innerHTML = '0';
    INFO.level.innerHTML = '1';
    for (i = INFO.bonus.infoList.bonus.children.length - 1; i >= 0; i--) {
        INFO.bonus.infoList.bonus.children[i].remove();
        INFO.bonus.infoList.time.children[i].remove();
    }
    INFO.bonus.duration.innerText = `${BONUSES.time.default / 1000}s`;
    PAD.speed = 4;
    BALL.speed = 3;
    PAD.x = 0;
    PAD.y = 0;
}
function setGame() {
    GAME.isGameStarted = false;
    GAME.isGameOver = false;
    GAME.element.style.filter = '';
    GAME.held_directions = [];
}
function setBall() {
    BALL.x = PAD.x;
    BALL.y = PAD.y;
    BALL.isBallSticky = true;
    BALL.isBallMoving = false;
    BALL.setAngle();
}
function setBlocks(rows, columns) {
    clearTimeout(BLOCKS.animation.current);
    BLOCKS.container.element.style.animation = 'none';
    BLOCKS.container.element.style.display = 'block';
    BLOCKS.container.margin.x = 2 * BLOCKS.gap;
    BLOCKS.container.margin.y = 2.5 * BLOCKS.gap;
    if (GAME.levels[GAME.level].marginY) {
        BLOCKS.container.margin.y *= GAME.levels[GAME.level].marginY;
    }
    BLOCKS.container.element.style.top = `${BLOCKS.container.margin.y}px`;
    BLOCKS.hp = [];
    BLOCKS.isHavingBonus = new Array(rows * columns).fill(undefined);
    BLOCKS.elements = createBlocks(rows, columns, GAME.levels[GAME.level].gapToBlockHeightRatio);
}
function setAreaSize() {
    if (xy.height(document.body) < 1200 || xy.width(document.body) < 1600) {
        if (xy.width(document.body) / xy.height(document.body) >= xy.width(area) / xy.height(area)) {
            scale = xy.height(document.body) / xy.height(area);
        } else {
            scale = xy.width(document.body) / xy.width(area);
        }
    } else {
        if (1200 / xy.height(area) > 1600 / xy.width(area)) {
            scale = 1600 / xy.width(area);
        } else {
            scale = 1200 / xy.height(area);
        }
    }
    scale *= 0.8;
    area.style.transform = `translate3d(-50%,-50%,0) scale(${scale})`;
}
function addLevelInitial(bonus, message) {
    if (bonus) {
        if (bonus == 'random') {
            bonus = BONUSES.types[Math.floor(Math.random() * BONUSES.types.length)];
            console.log(bonus)
        }
        BONUSES.awaited = bonus;
    }
    if (message) {
        INFO.element.innerHTML = message;
    } else {
        INFO.element.innerHTML = 'Press Space to start the Game!';
    }
}

function createBlock(block, hp, id = false) {
    if (id != false) { block.setAttribute('id', `${id}`) };
    BLOCKS.hp[id] = hp;
    block.classList.add('block');
    block.classList.add(`block-${hp}`);
    BLOCKS.container.element.appendChild(block);
    createStrips(block);
    if (Math.random() < BLOCKS.bonusToBlocksRatio) {
        randomId = Math.floor(Math.random() * BONUSES.types.length);
        BLOCKS.isHavingBonus[id] = randomId;
        createBonus(block, hp, BONUSES.types[randomId]);
        // createBonus(block, hp, bonusTypes[2]);
    }
}

function createStrips(block) {
    const stripL = document.createElement('div');
    stripL.classList.add('strip-left');
    block.appendChild(stripL);
    const stripeR = document.createElement('div');
    stripeR.classList.add('strip-right');
    block.appendChild(stripeR);
    const blockShadow = document.createElement('div');
    blockShadow.classList.add('shadow');
    block.appendChild(blockShadow);
}

function createBlocks(rowsNumber, inRow, gapToblockHeightRatio = 1) {//1 gapY=1 block.height
    if (BLOCKS.container.element.firstChild) {
        Array.from(BLOCKS.container.element.children).forEach(c => c.remove())
    }
    BLOCKS.container.element.style.width = `${xy.width(GAME.element) - 2 * BLOCKS.container.margin.x}px`;
    BLOCKS.container.element.style.left = `${BLOCKS.container.margin.x}px`;
    BLOCKS.container.element.style.top = `${BLOCKS.container.margin.y}px`;
    const block = new Array(rowsNumber * inRow);
    block[0] = document.createElement('div');
    createBlock(block[0], rowsNumber, 0);
    BLOCKS.width = xy.width(block[0]);
    BLOCKS.height = xy.height(block[0]);
    let gapX = ((500 - 2 * BLOCKS.container.margin.x) / inRow - BLOCKS.width) * inRow / (inRow - 1);
    let gapY = gapToblockHeightRatio * BLOCKS.height;
    if (gapX > xy.width(BALL.element) / scale * 1.8) {
        let rowNubmer = rowsNumber;
        for (let i = 1; i < rowsNumber * inRow; i++) {
            block[i] = document.createElement('div');
            if (i % (inRow) == 0) {
                rowNubmer--;
            }
            block[i].style.left = `${BLOCKS.width * i + gapX * (i - (rowsNumber - rowNubmer)) - (rowsNumber - rowNubmer) * (500 - 2 * BLOCKS.container.margin.x)}px`;
            block[i].style.top = `${(BLOCKS.height + gapY) * (rowsNumber - rowNubmer)}px`;
            createBlock(block[i], rowNubmer, i);
        }
    } else {
        alert('gap/ball too small/big!  ')
        console.log('gapInPx: ', BLOCKS.gap, 'gapX: ', gapX, ' ballWidth: ', xy.width(BALL.element), 'marginBlocksContainerX: ', BLOCKS.container.margin.x)
    }
    BLOCKS.hp.forEach(b => GAME.maxPoints += b)
    BLOCKS.container.element.style.height = `${BLOCKS.height * rowsNumber + gapY * (rowsNumber - 1)}px`;
    return block
};

function addAndRemoveClass(object, className, animationDuraition, restrictedClasses = []) {
    if (!object.classList.contains(className) && !isAnimation(object, restrictedClasses)) {
        object.classList.add(className);
        setTimeout(() => {
            if (object.classList.contains(className)) {
                object.classList.remove(className);
            }
        }, animationDuraition)
    }
}
function isAnimation(object, classes) {
    classes.forEach(c => {
        if (object.classList.contains(c)) {
            return true
        }
    });
    return false
}

function ballBlockCollision(ball, block, COR, type) {
    if (Math.abs(xy.yAvg(block) - xy.yAvg(ball)) < ((BLOCKS.height + BALL.height) / 2) && Math.abs(xy.xAvg(block) - xy.xAvg(ball)) < ((BLOCKS.width + BALL.width) / 2) && ((BALL.hittedLast != BLOCKS.elements.indexOf(block) && type == 'ball') || (type == 'shot' && BONUSES.shots.isAlive[BONUSES.shots.elements.indexOf(ball)] == 1)) && GAME.isGameStarted) {
        id = BLOCKS.elements.indexOf(block);
        if (BLOCKS.hp[id] > 0) {
            if (type == 'ball') {//hitted from Top/bottom
                BALL.hittedLast = id;
                if (BALL.isBallCannon) {
                    dmg = 2;
                    if (BLOCKS.hp[id] > 1) {
                        GAME.points++;
                    }
                    ballState = 'ball-cannon-hitted'
                } else {
                    dmg = 1;
                    ballState = 'ball-hitted'
                }
                xcheck = Math.abs(xy.xAvg(block) - BALL.xAvg) - (BLOCKS.width + BALL.width) / 2;
                ycheck = Math.abs(xy.yAvg(block) - BALL.yAvg) - (BLOCKS.height + BALL.height) / 2;
                if (Math.abs(ycheck) <= Math.abs(xcheck)) {//hitted from Top/bottom
                    // yAxisCollision()
                    if (xy.yAvg(block) > BALL.yAvg) {
                        state = 'hitted-up'
                    } else {
                        state = 'hitted-down'
                    }
                } else {
                    // xAxisCollision()
                    if (BALL.xAvg < xy.xAvg(block)) {
                        state = 'hitted-left';
                    } else {
                        state = 'hitted-right';
                    }
                }
                ballCollision(state, COR);
            } else {
                dmg = 1;
                BONUSES.shots.isAlive[BONUSES.shots.elements.indexOf(ball)] -= 1;
                setStyleTop(ball);
                // ball.style.animationPlayState = 'paused';
                // changeThis//to from paused to removing classes and setting up top position
                ballState = 'shot-hitted'
                setTimeout(() => {
                    BONUSES.shots.timeOutHandles = BONUSES.shots.timeOutHandles.filter(s => s[0] != ball)
                    ball.remove()
                }, BLOCKS.animation.duration.hitted / 2)
                state = 'hitted-down';
            }
            addAndRemoveClass(block, state, BLOCKS.animation.duration.hitted, BLOCKS.animation.restrictedClasses);
            addAndRemoveClass(ball, ballState, BLOCKS.animation.duration.hitted / 2);
            GAME.points++;
            INFO.points.innerHTML = `${GAME.points}`;
            block.classList.remove(`block-${BLOCKS.hp[id]}`)
            BLOCKS.hp[id] -= dmg;
            block.classList.add(`block-${BLOCKS.hp[id]}`)
            if (BLOCKS.isHavingBonus[id] !== undefined) {
                block.children[0].classList.remove(`strip-${BLOCKS.hp[id] + dmg}`);
                block.children[1].classList.remove(`strip-${BLOCKS.hp[id] + dmg}`);
                block.children[0].classList.add(`strip-${BLOCKS.hp[id]}`);
                block.children[1].classList.add(`strip-${BLOCKS.hp[id]}`);
            }
            if (BLOCKS.hp[id] < 1) {
                block.classList.add(`block-dead`)
                block.children[0].classList.add(`strip-dead`);
                block.children[1].classList.add(`strip-dead`);
                block.children[2].classList.add(`shadow-dead`);
                if (BLOCKS.isHavingBonus[id] !== undefined) {
                    BONUSES.elements[BONUSES.elements.length] = sendBonus(block, GAME.points + GAME.level * 1000);
                }
                setTimeout(() => { block.style.display = 'none'; block.remove() }, BLOCKS.animation.duration.hitted / 2)
                if (GAME.maxPoints - GAME.points <= 0) {
                    gameOver('won');
                }
            }
        }
    }
}

function setStyleTop(b) {
    b.style.top = `${xy.top(b) / scale - xy.top(GAME.element) / scale}px`;
    b.style.animation = 'none';
}

function adjAngle(XorY, adjDeg = 0.1) {
    if (!(XorY == 'x' || XorY == 'y' || XorY == 'x+' || XorY == 'y+')) {
        inputsAreSpecified
    }
    if (XorY == 'x') {
        if (Math.abs(BALL.angle - 1) < 0.5) {
            //xL
            if (BALL.angle < 1) {//90-180deg
                if (BALL.angle < 1 - adjDeg) {
                    BALL.angle += adjDeg;
                }
            } else {//180-270deg
                if (BALL.angle > 1 + adjDeg) {
                    BALL.angle -= adjDeg;
                }
            }
        } else {
            //xR
            if (BALL.angle <= 0.5) {//0-90deg
                if (BALL.angle > adjDeg) {
                    BALL.angle -= adjDeg;
                }
            } else {//270-360deg
                if (BALL.angle < 2 - adjDeg) {
                    BALL.angle += adjDeg;
                }
            }
        }
    }
    if (XorY == 'y') {
        if (BALL.angle < 1) {
            //yU
            if (BALL.angle < 0.5) {//0-90deg
                if (BALL.angle < 0.5 - adjDeg) {
                    BALL.angle += adjDeg;
                }
            } else {//90-180deg
                if (BALL.angle > 0.5 + adjDeg) {
                    BALL.angle -= adjDeg;
                }
            }
        } else {
            //yD
            if (BALL.angle >= 1) {//180-270deg
                if (BALL.angle < 1.5 - adjDeg) {
                    BALL.angle += adjDeg;
                }
            } else {//270-360deg
                if (BALL.angle > 1.5 + adjDeg) {
                    BALL.angle -= adjDeg;
                }
            }
        }
    }
    if (XorY == 'x+') {
        (BALL.angle % 1 > 0.5) ? BALL.angle += adjDeg : BALL.angle -= adjDeg;
    }
    if (XorY == 'y+') {
        (!(BALL.angle % 1 > 0.5)) ? BALL.angle += adjDeg : BALL.angle -= adjDeg;
    }
}

function ballCollision(hittedFrom, COR = 0) {
    if (COR == 1) {
        if (hittedFrom == 'hitted-left') {
            BALL.angle = 0.5 + Math.random();
        } else if (hittedFrom == 'hitted-right') {
            BALL.angle = Math.random() / 2;
            if (BALL.angle < 0) {
                BALL.angle = 2 - BALL.angle;
            }
        } else if (hittedFrom == 'hitted-up') {
            BALL.angle = Math.random();
        } else if (hittedFrom == 'hitted-down') {
            BALL.angle = 1 + Math.random();
        }
    } else {
        if (hittedFrom == 'hitted-left') {
            BALL.x -= BALL.speedX;
            if (BALL.angle <= 0.5 || BALL.angle >= 1.5) {
                BALL.angle = (3 - BALL.angle) % 2;
                if (Math.abs(BALL.angle - 0.5) < 0.1 || Math.abs(BALL.angle - 1.5) < 0.1) {
                    adjAngle('x');
                }
            } else {
                adjAngle('x+')
            }
        } else if (hittedFrom == 'hitted-right') {
            BALL.x += BALL.speedX;
            if (Math.abs(BALL.angle - 1) < 0.5) {
                BALL.angle = (3 - BALL.angle) % 2;
                if (Math.abs(BALL.angle - 0.5) < 0.1 || Math.abs(BALL.angle - 1.5) < 0.1) {
                    adjAngle('x');
                }
            } else {
                adjAngle('x+')
            }
        } else if (hittedFrom == 'hitted-up') {
            BALL.y -= BALL.speedY;
            if (Math.abs(BALL.angle - 1.5) <= 0.5) {
                BALL.angle = 2 - BALL.angle;
                if (Math.abs(BALL.angle - 0.5) > 0.4 && Math.abs(BALL.angle - 1.5) > 0.4) {
                    adjAngle('y');
                }
            } else {
                adjAngle('y+')
            }
        } else if (hittedFrom == 'hitted-down') {
            BALL.y += BALL.speedY;
            if (Math.abs(BALL.angle - 0.5) <= 0.5) {
                BALL.angle = 2 - BALL.angle;
                if (Math.abs(BALL.angle - 0.5) > 0.4 && Math.abs(BALL.angle - 1.5) > 0.4) {
                    adjAngle('y');
                }
            } else {
                adjAngle('y+')
            }
        }
    }
}

function gameOver(lostOrWon) {
    GAME.isGameStarted = false;
    clearTimeout(BLOCKS.animation.current);
    BLOCKS.container.element.style.animationPlayState = 'paused'
    if (lostOrWon == 'lost') {
        GAME.isLost = true;
        GAME.element.style.filter = 'blur(10px) contrast(2) brightness(1)';
        addInfo(false, `You lost! Game Over! Scored ${GAME.points} points`)
        removeAllSendedBonuses();
        removeAllShots();
        removeAllBonuses();
        BALL.speed = 0.5;
        if (!INFO.element.classList.contains('bonus-time-animation')) {
            INFO.element.classList.add('bonus-time-animation');
        }
        GAME.isGameOver = true;
    }
    if (lostOrWon == 'won') {
        removeAllShots();
        if (GAME.level < GAME.levels.length - 1) {
            GAME.levelUp()
        } else {
            addInfo(false, 'You Won! Try now other game modes')
            setTimeout(() => {
                if (!GAME.isGameOver) {
                    goToMenu();
                }
            }, 9000)
        }
    }
}

const xy = {
    top: function (object) { return object.getBoundingClientRect().top; },
    bottom: function (object) { return object.getBoundingClientRect().bottom; },
    left: function (object) { return object.getBoundingClientRect().left },
    right: function (object) { return object.getBoundingClientRect().right; },
    xAvg: function (object) { return (object.getBoundingClientRect().left + object.getBoundingClientRect().right) / 2; },
    yAvg: function (object) { return (object.getBoundingClientRect().top + object.getBoundingClientRect().bottom) / 2; },
    height: function (object) { return object.getBoundingClientRect().bottom - object.getBoundingClientRect().top; },
    width: function (object) { return object.getBoundingClientRect().right - object.getBoundingClientRect().left; },
};


function blocksPadCollision() {
    if (parseInt(PAD.element.style.top) < parseInt(BLOCKS.container.element.style.top) + parseInt(BLOCKS.elements[BLOCKS.elements.length - 1].style.top) + BLOCKS.height / scale) {
        gameOver('lost')
    }
}

function initialPosition() {
    PAD.element.style.left = `${(xy.width(GAME.element) - xy.width(PAD.element)) / 2}px`;
    PAD.element.style.top = `${(xy.height(GAME.element) * 0.9)}px`;
    BALL.element.style.left = `${(xy.width(GAME.element) - xy.width(BALL.element)) / 2}px`;
    BALL.element.style.top = `${xy.height(GAME.element) * 0.9 - xy.height(PAD.element) - xy.height(BALL.element)}px`;
    GAME.border.x = (xy.width(GAME.element) - xy.width(BALL.element)) / 2;
    GAME.border.top = -xy.height(BALL.element) - parseInt(getComputedStyle(BALL.element).top);
    GAME.border.bottom = xy.height(GAME.element) - xy.height(BALL.element) - xy.height(BALL.element) - parseInt(getComputedStyle(BALL.element).top);
}

function angleToMovement() {
    BALL.angle = (2 + BALL.angle) % 2;
    BALL.speedX = Math.cos(Math.PI * BALL.angle) * BALL.speed;
    BALL.speedY = -Math.sin(Math.PI * BALL.angle) * BALL.speed;
    BALL.x += BALL.speedX;
    BALL.y += BALL.speedY;
}

function createBonus(block, hp, type = 0) {
    block.classList.add('block-bonus');
    block.setAttribute('bonus', type);
    block.children[0].classList.add('strip-bonus');
    block.children[0].classList.add(`strip-${hp}`);
    block.children[1].classList.add('strip-bonus');
    block.children[1].classList.add(`strip-${hp}`);
}

function setBonusColor(bonus) {
    bonus.style.backgroundColor = `hsl(${BONUSES.types.indexOf(bonus.getAttribute('type')) * 360 / BONUSES.types.length}, 100%, 30%)`;
}

function sendBonus(block, bonusId = 0) {
    const bonusSent = document.createElement('div');
    bonusSent.setAttribute(`id`, bonusId);
    bonusSent.setAttribute(`type`, `${block.getAttribute('bonus')}`);
    bonusSent.classList.add('bonus');
    bonusSent.classList.add(`bonus-${block.getAttribute('bonus')}`)
    setBonusColor(bonusSent);
    GAME.element.appendChild(bonusSent);
    bonusSent.style.top = `${parseInt(getComputedStyle(block).top) + BLOCKS.container.margin.y + BLOCKS.height / 2 / scale - parseInt(getComputedStyle(bonusSent).height) / 2}px`;
    bonusSent.style.left = `${(xy.left(BLOCKS.container.element) - GAME.left) / scale + parseInt(getComputedStyle(block).left) + BLOCKS.width / 2 / scale - parseInt(getComputedStyle(bonusSent).width) / 2}px`;
    bonusSent.classList.add('bonus-animation');
    BONUSES.timeOutHandles.push([setTimeout(() => {
        if (BONUSES.elements != []) {
            BONUSES.timeOutHandles = BONUSES.timeOutHandles.filter(b => parseInt(b[1]) != bonusId);
            BONUSES.elements = BONUSES.elements.filter(b => b.getAttribute('id') != bonusId);
        }
        bonusSent.remove()
    }, parseInt(getComputedStyle(document.body).getPropertyValue('--bonusAnimationDuration'))), bonusId])
    return bonusSent
}

function PAUSED() {
    Array.from(BONUSES.shots.elements).forEach(s => {
        s.style.animationPlayState = 'paused';
        clearTimeout(s)
    })
    Array.from(BONUSES.elements).forEach(b => {
        b.style.animationPlayState = 'paused';
    })
    Array.from(BONUSES.timeOutHandles).forEach(b => clearTimeout(b[0]))
    BLOCKS.container.element.style.animationPlayState = 'paused';
    clearTimeout(BLOCKS.animation.current);
    Array.from(BLOCKS.elements).forEach(b => b.style.animationPlayState = 'paused')
    ballspeed = BALL.speed;
    BALL.speed = 0;
}

function RUN() {
    Array.from(BONUSES.shots.elements).forEach(s => {
        s.style.animationPlayState = 'running';
        clearTimeout(s)
    })
    Array.from(BONUSES.elements).forEach(b => {
        b.style.animationPlayState = 'running';
    })
    Array.from(BONUSES.timeOutHandles).forEach(b => clearTimeout(b[0]))
    BLOCKS.container.element.style.animationPlayState = 'paused';
    Array.from(BLOCKS.elements).forEach(b => b.style.animationPlayState = 'paused')
}


function resetNextTimeFunc() {
    BONUSES.time.default > 10000 ? BONUSES.time.default = BONUSES.time.default - 1000 : BONUSES.time.default = BONUSES.time.default + 1000;
    INFO.bonus.duration.innerHTML = `${BONUSES.time.default / 1000}s`;
    if (BONUSES.time.default == 10000) {
        stopBonusDuration();
        BONUSES.time.default = 10000;
    }
};

function stopBonusDuration() {
    clearInterval(BONUSES.time.reset)
    BONUSES.time.reset = null;
    BONUSES.time.isChanged = true;
}

function blocksGameOverAnimation() {
    if (GAME.isGameOver && MENU.screen.classList.contains('menu-screen-hide')) {
        BLOCKS.elements[Date.now() % BLOCKS.elements.length].style.left = `${parseInt(BLOCKS.elements[Date.now() % BLOCKS.elements.length].style.left) + (Math.random() - 0.5) * 20}px`;
        BLOCKS.elements[Date.now() % BLOCKS.elements.length].style.top = `${parseInt(BLOCKS.elements[Date.now() % BLOCKS.elements.length].style.top) + (Math.random() - 0.5) * 20}px`;
    }
}
// const removeBonus = {
//     all: () => { removeAllBonuses(); },
//     id: (id) => { removeBonus(id); },
//     allSended: () => { removeAllSendedBonuses() },
//     shots: () => { removeAllShots() },
// }

function removeBonus(id) {
    if (id == 0) {//sticky
        BALL.isBallSticky = false;
        BALL.isBallMoving = true;
        return BALL.element.style.transition = `${BALL.transition.start} `;
    }
    if (id == 1) {//cannon
        if (BALL.element.classList.contains('ball-cannon')) { BALL.element.classList.remove('ball-cannon'); }
        return BALL.isBallCannon = false;
    }
    if (id == 2) {//shots
        return PAD.isPadShots = false;
    }
    if (id == 7) {//slippperyPad
        return PAD.isPadSlippery = false;
    }
    if (id == 10) {//crazyBall
        return BALL.isBallCrazy = false;
    }
    if (id == 11) {//randomAngles
        return BLOCKS.COR = 0;
    }
}

function removeAllBonuses() {
    BALL.isBallSticky = false;
    BALL.isBallCrazy = false;
    BALL.isBallMoving = true;
    BALL.isBallCannon = false;
    if (BALL.element.classList.contains('ball-cannon')) { BALL.element.classList.remove('ball-cannon'); }
    PAD.isPadShots = false;
    PAD.isPadSlippery = false;
    if (BONUSES.time.reset != null) {
        clearInterval(BONUSES.time.reset)
    }
    for (i = BONUSES.types.length - 1; i >= 0; i--) {
        BONUSES.timeLeft[i] = 0;
        updateBonusInfo(i)
    }
    BONUSES.active = new Array(BONUSES.types.length).fill(undefined);
    BONUSES.time.default = 10000;
    BONUSES.time.isChanged = true;
}
function removeAllSendedBonuses() {
    for (i = 0; i < BONUSES.elements.length; i++) {
        if (BONUSES.elements[i].classList.contains('bonus')) {
            BONUSES.elements[i].classList.remove('bonus');
        }
        BONUSES.elements[i].style.display = 'none';
        BONUSES.elements[i].remove();
    }
    BONUSES.elements = [];
}
function removeAllShots() {
    for (i = BONUSES.shots.elements.length - 1; i >= 0; i--) {
        BONUSES.shots.elements[i].remove();
    }
}


const clock = (interval) => setInterval(() => {
    if (GAME.isGameStarted) {
        for (i = 0; i < BONUSES.timeLeft.length; i++) {
            if (BONUSES.timeLeft[i] > 0) {
                BONUSES.timeLeft[i] -= interval;
                updateBonusInfo(i);
                if (BONUSES.timeLeft[i] == 0) {
                    removeBonus(i);
                }
            }
        }
        if (BONUSES.timeLeft[8] == 0 && BONUSES.timeLeft[9] == 0 && BONUSES.time.default != 10000 && BONUSES.time.isChanged == true) {
            BONUSES.time.reset = setInterval(resetNextTimeFunc, 2000);
            BONUSES.time.isChanged = false;
        }
    } else {
        if (GAME.isGameOver) {
            blocksGameOverAnimation();
        }
    }
}, interval)

function addBonus(type, bonusId = 0) {
    addInfo(3000, `a bonus ${type} added for ${BONUSES.time.default / 1000}s`, INFO.default, bonusId);
    if (BONUSES.timeLeft[BONUSES.types.indexOf(type)] == 0) {
        BONUSES.active[BONUSES.types.indexOf(type)] = createBonusInfo(type, BONUSES.time.default, GAME.points);
    } else {
        updateBonusInfo(BONUSES.types.indexOf(type))
    }
    BONUSES.timeLeft[BONUSES.types.indexOf(type)] += BONUSES.time.default;
    if (type == BONUSES.types[0]) {//'sticky'
        BALL.isBallSticky = true;
    }
    if (type == BONUSES.types[1]) {//'cannon'
        BALL.isBallCannon = true;
        if (!BALL.element.classList.contains('ball-cannon')) { BALL.element.classList.add('ball-cannon'); }
    }
    if (type == BONUSES.types[2]) {//'shot'
        bonusShot();
    }
    if (type == BONUSES.types[3]) {//'speedBall'
        BALL.speed *= 1.2;
        setTimeout(() => {
            BALL.speed /= 1.2;
        }, BONUSES.time.default)
    }
    if (type == BONUSES.types[4]) {//'slowBall'
        BALL.speed *= 0.7;
        setTimeout(() => {
            BALL.speed /= 0.7;
        }, BONUSES.time.default)
    }
    if (type == BONUSES.types[5]) {//'speedPad'
        PAD.speed *= 1.5;
        setTimeout(() => {
            PAD.speed /= 1.5;
        }, BONUSES.time.default)
    }
    if (type == BONUSES.types[6]) {//'slowPad'
        PAD.speed *= 0.7;
        setTimeout(() => {
            PAD.speed /= 0.7;
        }, BONUSES.time.default)
    }
    if (type == BONUSES.types[7]) {//'slipperyPad'
        PAD.isPadSlippery = true;
    }
    if (type == BONUSES.types[8]) {//'bonusTime+'   
        nextBonusTime(BONUSES.time.default, 0.5);
    }
    if (type == BONUSES.types[9]) {//'bonusTime-'
        nextBonusTime(BONUSES.time.default, 0.5, -1);
    }
    if (type == BONUSES.types[10]) {//'crazyBall'
        BALL.isBallCrazy = true;
    }
    if (type == BONUSES.types[11]) {//'randomAngles'
        BLOCKS.COR = 1;
    }
    INFO.bonus.duration.innerHTML = `${BONUSES.time.default / 1000}s`;
}

function createBonusInfo(type, time, id = 0) {
    const bonusInfoType = document.createElement('p')
    bonusInfoType.innerHTML = `${type}`;
    bonusInfoType.setAttribute('id', id);
    bonusInfoType.setAttribute('type', type);
    INFO.bonus.infoList.bonus.appendChild(bonusInfoType);
    const bonusInfoTime = document.createElement('p')
    bonusInfoTime.innerHTML = `${time / 1000}s`;
    INFO.bonus.infoList.time.appendChild(bonusInfoTime);
    return [bonusInfoType, bonusInfoTime]
}

function updateBonusInfo(i) {
    if (BONUSES.active[i]) {
        BONUSES.active[i][1].innerHTML = `${BONUSES.timeLeft[i] / 1000}s`;
        if (BONUSES.timeLeft[i] / 1000 < 3 && BONUSES.timeLeft[i] / 1000 != 0) {
            if (!BONUSES.active[i][1].classList.contains('bonus-time-animation')) {
                BONUSES.active[i][1].classList.add('bonus-time-animation');
            }
        } else {
            if (BONUSES.active[i][1].classList.contains('bonus-time-animation')) {
                BONUSES.active[i][1].classList.remove('bonus-time-animation');
            }
        }
        if (BONUSES.timeLeft[i] == 0 && BONUSES.active[i][0].innerHTML != '' || BONUSES.timeLeft.map(b => b > 0).indexOf(true) == -1) {
            BONUSES.active[i][0].innerHTML = 'none';
            BONUSES.active[i][1].innerHTML = '0s';
            BONUSES.active[i][0].remove();
            BONUSES.active[i][1].remove();
        }
    }
}

function bonusShot() {
    if (!PAD.isPadShots) {
        PAD.isPadShots = true;
        if (GAME.isGameStarted) { sendShot() }
        const shotInterval = setInterval(() => {
            if (!PAD.isPadShots) {
                clearInterval(shotInterval)
            }
            if (BONUSES.timeLeft[2] != 0 && GAME.isGameStarted) {
                sendShot()
            }
        }, 1000)
    }
}


function sendShot() {
    if (BONUSES.shots.elements.length < 9) {
        const shot = document.createElement('div');
        shot.setAttribute('id', 'shot');
        shot.classList.add('shot');
        GAME.element.appendChild(shot);
        shot.classList.add('shot-animation');
        shot.style.top = `${(PAD.top - GAME.top) / scale}px`;
        shot.style.left = `${GAME.width / scale / 2 - parseInt(getComputedStyle(shot).width) / 2 + PAD.x}px`;
        BONUSES.shots.elements.push(shot);
        BONUSES.shots.isAlive.push(1);
        BONUSES.shots.timeOutHandles.push(setTimeout(() => {
            BONUSES.shots.elements.shift()
            BONUSES.shots.timeOutHandles.shift()
            shot.remove()
            BONUSES.shots.isAlive.shift();
        }, BONUSES.shots.animation.duration))
    }
}


function nextBonusTime(time, coeffictient, addOrSubstract = 1) {
    stopBonusDuration();
    BONUSES.time.change = coeffictient * time - coeffictient * time % 1000;
    if (time - BONUSES.time.change <= 0 && addOrSubstract < 0) {
        BONUSES.time.default = 1000;
        BONUSES.time.change = 1000;
    } else {
        BONUSES.time.default += BONUSES.time.change * addOrSubstract;
    }
}

const action = {
    space: 'space',
}

const directions = {
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right',
}

const keys = {
    32: action,
    37: directions.left,
    38: directions.up,
    39: directions.right,
    40: directions.down,
}




function blocksShotCollision(shot) {
    //shot - block collision
    for (i = BLOCKS.elements.length - 1; i >= 0; i--) {
        ballBlockCollision(shot, BLOCKS.elements[i], 0, 'shot')
    }
}
function crazyBallAngle() {
    if (Math.abs(BALL.angle - 1) <= 0.5) {
        BALL.angle += (Math.random() * 2 - 0.9) / 20;
    } else {
        BALL.angle += (Math.random() * 2 - 1.1) / 20;
    }
}


function monitorShots() {
    if (BONUSES.shots.elements[0]) {
        for (j = 0; j < BONUSES.shots.elements.length; j++) {
            if (BONUSES.shots.isAlive[j] == 1) {
                blocksShotCollision(BONUSES.shots.elements[j])
            }
        }
    }
}

function addInfo(timeOut, infoStart, infoStop = false, id = 0) {
    let fadeInAndOutDuration = 400;
    addAndRemoveClass(INFO.element, 'info-fade-in-out', fadeInAndOutDuration)
    setTimeout(() => {
        INFO.element.innerText = infoStart;
        INFO.element.setAttribute('infoId', id);
        if (timeOut != false) {
            setTimeout(() => {
                if (INFO.element.getAttribute('infoId') == id && infoStop != false) {
                    addAndRemoveClass(INFO.element, 'info-fade-in-out', fadeInAndOutDuration)
                    setTimeout(() => {
                        if (INFO.element.getAttribute('infoId') == id) {
                            INFO.element.innerText = infoStop;
                        }
                    }, fadeInAndOutDuration / 1.5)
                }
            }, timeOut - fadeInAndOutDuration / 2)
        }
    }, fadeInAndOutDuration / 1.5)
}

document.addEventListener('keydown', (e) => {
    let dir = keys[e.which];

    if (GAME.cheats && BALL.isBallMoving) {
        if (e.which == 49) {
            BALL.speed = 0;
        }
        if (e.which == 50) {
            BALL.speed = 0.5;
        }
        if (e.which == 51) {
            BALL.speed = 3;
        }
        if (e.which == 52) {
            BALL.speed = 10;
        }
        if (e.which == 53) {
            BALL.x = -210;
            BALL.y = -340;
        }
        if (e.which == 32) {
            sendShot();
        }
    }

    if (e.which == 32 && GAME.isGameStarted == false && GAME.isGameOver == false) {
        GAME.isGameStarted = true;
        BALL.isBallSticky = false;
        if (BONUSES.timeLeft[BONUSES.types.indexOf('sticky')] != 0) {
            setTimeout(() => { BALL.isBallSticky = true; }, 150)
        }
        BALL.isBallMoving = true;
        if (BONUSES.awaited) {
            addBonus(BONUSES.awaited);
            BONUSES.awaited = undefined;
        }
        BALL.element.style.transition = `${BALL.transition.start} `;
        BLOCKS.container.animation.rowX();
        addInfo(3000, 'Game Started!', INFO.default, -1);
    }
    if (e.which == 32 && BALL.isBallSticky && !BALL.isBallMoving) {
        BALL.isBallMoving = true;
        console.log('hey')
        BALL.element.style.transition = `${BALL.transition.start} `;
        if (BALL.isBallCrazy) {
            BALL.isBallCrazy = false;
            setTimeout(() => {
                if (BONUSES.timeLeft[BONUSES.types.indexOf('crazyBall')]) { BALL.isBallCrazy = true; }
            }, 500)
        }
    }
    if (dir && GAME.held_directions.indexOf(dir) === -1) {
        GAME.held_directions.unshift(dir);
    }
})

document.addEventListener('keyup', (e) => {
    let dir = keys[e.which];
    let index = GAME.held_directions.indexOf(dir);
    if (index > -1) {
        GAME.held_directions.splice(index, 1);
    }
})

INFO.btnReset.addEventListener('click', () => {
    goToMenu();
});

function goToMenu() {
    GAME.isGameOver = true;
    if (INFO.element.classList.contains('bonus-time-animation')) {
        INFO.element.classList.remove('bonus-time-animation');
    }
    MENU.SHOW();
}


function place_pad() {
    padMovement();
    bonusPadCollisions();
}
function padMovement() {
    const held_direction = GAME.held_directions[0];
    if (held_direction && !GAME.isGameOver) {
        if (held_direction === directions.right && PAD.x < GAME.border.x - PAD.width / scale / 2 - PAD.speed) { PAD.x += PAD.speed; }
        if (held_direction === directions.left && -PAD.x < GAME.border.x - PAD.width / scale / 2 - PAD.speed) { PAD.x -= PAD.speed; }
    }
    PAD.element.style.transform = `translate3d(${PAD.x}px,${PAD.y}px,0)`;
    saveSize(PAD);
}
function bonusPadCollisions() {
    if (BONUSES.elements[0] != []) {
        BONUSES.elements.forEach(b => {
            if (Math.abs(xy.yAvg(b) - PAD.yAvg) < BONUSES.height / 2 + PAD.height / 2 && xy.right(b) > PAD.left && xy.left(b) < PAD.right) {
                if (!b.getAttribute('isAdded')) {
                    b.setAttribute('isAdded', true);
                    let bonusId = b.getAttribute('id');
                    addBonus(b.getAttribute('type'), bonusId);
                    b.style.top = `${xy.top(b) / scale - GAME.top / scale}px`;
                    b.classList.remove('bonus-animation');
                    addAndRemoveClass(b, 'bonus-dead', BLOCKS.animation.duration.hitted);
                    setTimeout(() => {
                        b.style.display = 'none';
                        if (BONUSES.elements != []) {
                            BONUSES.elements = BONUSES.elements.filter(b => b.getAttribute('id') != bonusId);
                        }
                    }, BLOCKS.animation.duration.hitted)
                }
            }
        })
    }
}


function place_ball() {
    ballMovement();
    if (GAME.isGameStarted) {
        ballBorderCollision();
        ballPadCollisions();
        ballBlocksCollision();
    }
}
function ballMovement() {
    if (BALL.isBallMoving == true) {
        angleToMovement();
        if (BALL.isBallCrazy) {
            crazyBallAngle()
        }
    } else {
        if (BALL.isBallSticky == true) {//&& BALL.isBallMoving == false
            BALL.element.style.transition = `${BALL.transition.sticky} `;
            BALL.x = PAD.x;
            BALL.y = PAD.y;
        }
    }
    if (GAME.isGameOver) {
        BALL.angle += (Math.random() * 2 - 1) / 10;
    }
    BALL.element.style.transform = `translate3d(${BALL.x}px, ${BALL.y}px, 0)`;
    saveSize(BALL);
}
function ballBorderCollision() {
    if (Math.abs(BALL.x) > GAME.border.x) {
        BALL.x -= BALL.speedX;
        BALL.angle = (3 - BALL.angle) % 2;
        BALL.hittedLast = 'wall';
    }
    if (BALL.y < GAME.border.top) {
        BALL.angle = 2 - BALL.angle;
        BALL.y += Math.abs(BALL.speedY);
        BALL.hittedLast = 'topWall';
    }
    if (BALL.y > GAME.border.bottom) {
        if (!GAME.isGameOver) {
            gameOver('lost');
        }
    }
}
function ballPadCollisions() {
    //ball - pad collisions
    if (BALL.bottom > PAD.top && BALL.yAvg <= PAD.yAvg && BALL.left <= PAD.right && BALL.right >= PAD.left && BALL.angle >= 1) {
        BALL.hittedLast = 'pad';
        if (BALL.isBallSticky == true && BALL.isBallMoving == true) {
            BALL.isBallMoving = false;
        }
        if (BALL.isBallCrazy) { BALL.isBallCrazy = false }
        if (PAD.isPadSlippery == true) {
            BALL.angle = 2 - BALL.angle;
        } else {
            BALL.angle = (((PAD.xAvg - BALL.xAvg) / ((BALL.width + PAD.width / 2))) + 1) / 2;
        }
        addAndRemoveClass(BALL.element, 'ball-hitted', BLOCKS.animation.duration.hitted / 2);
        addAndRemoveClass(PAD.element, 'pad-hitted', 100);
        setTimeout(() => {
            if (BONUSES.timeLeft[BONUSES.types.indexOf('crazyBall')]) { BALL.isBallCrazy = true; }
        }, 500)
    }
}
function ballBlocksCollision() {
    //ball - block collision
    // Array.from(BLOCKS.elements).forEach(b => ballBlockCollision(BALL.element, b, BLOCKS.COR, 'ball'));
    for (i = BLOCKS.elements.length - 1; i >= 0; i--) {
        ballBlockCollision(BALL.element, BLOCKS.elements[i], BLOCKS.COR, 'ball')
    }
}


let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
    aniId = requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        place_pad();
        place_ball();
        monitorShots();
    }
}
MENU.LISTEN();
