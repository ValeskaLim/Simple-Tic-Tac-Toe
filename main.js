const container = document.querySelector('.center');
const eventDisplay = document.getElementById('event');
let myScore = 0;
let enemyScore = 0;
let turns = 0;
let count = 0;
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

showScore = () => {
    if(count == 0){
        const p = document.createElement('p');
        const pTextContent = document.createTextNode(`Your score is: ${myScore} Enemy score is: ${enemyScore}`);
        p.appendChild(pTextContent);
        container.appendChild(p);
        count++;
    }
    document.getElementsByTagName('p')[1].innerHTML = `Your score is: ${myScore} Enemy score is: ${enemyScore}`;
}

selectBox = (val) => {
    const checkValid = isValid(val);
    const checkAvailable = isAvailable(val);

    if (checkValid && checkAvailable) {
        const row = Math.floor((val - 1) / 3);
        const col = (val - 1) % 3;
        console.log(`Row: ${row} Column: ${col}`);
        if (turns == 0) {
            document.getElementsByTagName('input')[`${val - 1}`].value = 'X';
            board[row][col] = 'X';
            turns = 1;
            eventDisplay.innerHTML = "Box selected!";
        } else {
            document.getElementsByTagName('input')[`${val - 1}`].value = 'O';
            board[row][col] = 'O';
            turns = 0;
            eventDisplay.innerHTML = "Box selected!";
        }

        if (checkWin('X')) {
            myScore++;
            resetBoard();
            eventDisplay.innerHTML = 'You wins!';
        } else if (checkWin('O')) {
            enemyScore++;
            resetBoard();
            eventDisplay.innerHTML = 'Enemy wins!';
        } else if (isBoardFull()) {
            resetBoard();
            eventDisplay.innerHTML = 'It\'s a tie!';
        }
    } else if (!checkAvailable) {
        eventDisplay.innerHTML = "Box already FULL!";
    }
}

isValid = (val) => {
    const input = document.getElementsByTagName('input')[`${val - 1}`];
    if (input.value == 'X' || input.value == 'O') {
        eventDisplay.innerHTML = 'Box already selected!';
        return false;
    }
    return true;
}

isAvailable = (val) => {
    const input = document.getElementsByTagName('input')[`${val - 1}`];
    return input.value !== 'X' && input.value !== 'O';
}

checkWin = (player) => {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
            return true;
        }
    }

    // Check columns
    for (let j = 0; j < 3; j++) {
        if (board[0][j] === player && board[1][j] === player && board[2][j] === player) {
            return true;
        }
    }

    // Check diagonal
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
        return true;
    }
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
        return true;
    }

    return false;
}

isBoardFull = () => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}

resetBoard = () => {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    for(let i = 0; i < 9; i++)
        document.getElementsByTagName('input')[i].value = i + 1;
    eventDisplay.innerHTML = 'Board has been reset!';
}
