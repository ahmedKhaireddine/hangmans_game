const score = document.getElementById('score');
const answer = document.getElementById('answer');
const choice = document.getElementById('choices');
const replay = document.getElementById('replay');
const aside = document.getElementById('aside');

let word = '';
let hiddenWord = '';
let letters = [];
let scoreCount = 0;
let maxScore = 10;

const init = () => {

    word = chooseWord();

    hiddenWord = word.replace(/[A-Z]/g, "*");

    letters = generateAllAlphabetLetters();

    displayAnswer(hiddenWord);

    displayChoice(letters);

    displayScore();

    choice.addEventListener('click', ({ target }) => {
        if (target.matches('li')) {
            const letter = target.innerHTML
            checkLetter(letter);
        }
    });

    document.addEventListener('keydown', ({ keyCode }) => {
        if (keyCode >= 65 && keyCode <= 90) {
            const letter = String.fromCharCode(keyCode);
            checkLetter(letter);
        }
    });

};

const checkLetter = (letter) => {

    const lettreTest = new RegExp('[' + letter + ']', "g");

    if (lettreTest.test(word)) {
        hiddenWord = editWord(letter, word, hiddenWord);
        displayAnswer(hiddenWord);
    } else {
        scoreCount += 1;
        displayScore();
        displayAside(scoreCount);
    }

    letters.forEach((el) => {
        if (el.label === letter) {
            el.isChosen = true;
        }
    });

    displayChoice(letters);

    if (scoreCount === maxScore) {
        document.getElementById('container').className = "endgame";
        aside.querySelector('img').style.margin = "0px";
        score.style.display = 'none';
        answer.innerHTML = `<h2>${word}</h2>`;
        choice.innerHTML = '<img src="./img/pendu/09.png" alt=""/><h1>You dead, bro !!!</h1>';
    }

    if (word === hiddenWord) {
        document.getElementById('container').className = "wingame";
        aside.style.display = 'none';
        score.style.display = 'none';
        answer.innerHTML = `<h2>${word}</h2>`;
        choice.innerHTML = '<h1>You live !!!</h1>';
    }
};

const editWord = (lettre, firstWord, secondWord) => {

    const firstWordArr = firstWord.split("");
    const secondWordArr = secondWord.split("");

    for (var i = 0; i < firstWordArr.length; i++) {
        if (lettre === firstWordArr[i]) {
            secondWordArr[i] = secondWordArr[i].replace(secondWordArr[i], lettre);
        }
    }

    return secondWordArr.join("");
}

const displayScore = () => {
    score.querySelector('p').innerHTML = `****  ${scoreCount} / ${maxScore}  ****`
};

const displayAside = (number) => {
    aside.style.display = "inline-block";
    aside.querySelector('img').style.margin = "80px 30px 0 0";
    aside.querySelector('img').src = `./img/pendu/0${number}.png`;
};

const displayAnswer = (word) => {
    const wordArr = word.split('');
    console.log('wordArr', wordArr);
    let html = wordArr.map((letter, index) => {
        return `<li>${letter}</li>`;
    });

    html.unshift('</ul>');
    html.push('</ul>');
    answer.innerHTML = html.join('');
};

const displayChoice = (letters) => {
    let html = letters.map((letter) => {
        if (!letter.isChosen) {
            return `<li>${letter.label}</li>`;
        } else {
            return `<li class="disabled">${letter.label}</li>`;
        }
    });

    html.unshift('</ul>');
    html.push('</ul>');
    choice.innerHTML = html.join('');
};

const generateAllAlphabetLetters = () => {
    const letters = [];

    let index = 64;

    while (++index <= 90) {
        letters.push({
            label: String.fromCharCode(index),
            isChosen: false
        });
    }

    return letters;
};

const chooseWord = () => {
    const randomIndex = getRandomInt(0, words.length -1);

    const word = words[randomIndex].label;

    if (word.length > 6 && word.length < 15) {
        return replaceAccentLettre(word).toUpperCase();
    } else {
        return chooseWord();
    }
}

/// Function qui donne un nombre alèatoire
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/// Function qui change les lettre avec accent en lettre normal
const replaceAccentLettre = (str) => {
    return str.replace(new RegExp(/[àáâãäå]/g), "a").replace(/[ç]/g, "c").replace(/[èéêë]/g, "e").replace(/[ìíîï]/g, "i").replace(/[ðòóôõö]/g, "o").replace(/[ùúûü]/g, "u").replace(/[ýÿ]/g, "y");
}

replay.addEventListener('click', () => {
    scoreCount = 0;
    score.style.display = 'block';
    document.getElementById('container').classList.remove("wingame", "endgame");

    word = chooseWord();

    hiddenWord = word.replace(/[A-Z]/g, "*");

    letters = generateAllAlphabetLetters();

    displayAnswer(hiddenWord);

    displayChoice(letters);

    displayScore();
});

window.onload = () => {
    init();
};