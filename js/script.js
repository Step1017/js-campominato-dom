//Creo una funzione per creare una cella e gli assegno una classe
const createCell = () => {
    const cell = document.createElement('div');
    cell.classList.add ('cell');    
    return cell;
}


//Creo una funzione per generare un numero random (senza ripetizioni):
const generateBombs = (maxNumber, totalNumbers) => {
    const bombs = [];    
    
    while (bombs.length < totalNumbers) {
    let random;

    do {
        random = Math.floor(Math.random() * maxNumber) + 1;
    } while (bombs.includes(random));
    bombs.push(random);
    }
    
    return bombs;
}

//Creo una funzione per stabilere se si vince o se si perde:
const gameOver = (score, hitBomb) => {
    const message = hitBomb ? `Hai perso: Hai totalizzato ${score}` : `Hai vinto: Hai totalizzato ${score}`;
    alert(message); 
}

//Prendo gli elementi dal DOM:
const form = document.getElementById('difficulty-form');
const submit = document.getElementById('submit');
const select = document.getElementById('select');
const grid = document.getElementById('grid');
const showScore = document.getElementById('show-score');


//Aggiungo un evento al click del bottone play:
form.addEventListener('submit', function(event){  
    
    // Blocco il riavvio della pagina
    event.preventDefault();
    

    // Svuoto la griglia
    grid.innerHTML = '';
    
    //Numero di celle in base alla difficoltà selezionata
    const mode = select.value;
    console.log(mode);
    let rows = 10;
    let cols = 10;

    if (mode === 'medium') {
        rows = 9;
        cols = 9;
    } else if (mode === 'hard') {
        rows = 7;
        cols = 7;
    }

    const totalCells = rows * cols;

//Creo una flag per stabilire se il gioco è finito:
let gameEnd = false;

//Aggiungo un contatore per stabilire il punteggio
let score = 0;

//Genero il numero di bombe:
const totalBombs = 16;

//Genero un punteggio massimo (numero di elle generate meno il numero di bombe che è 16)
const maxScore = totalCells - totalBombs;

//Creo le bombe grazie alla funzione creata in precedenza:
const bombs = generateBombs (totalCells, totalBombs);
console.log (bombs);

//Creo un ciclo
for (let i = 1; i <= totalCells; i++) {

//Creo una cella sfruttando la funzione che ho creato in precedenza
    let cell = createCell();

//Verifico il numero di celle che devono essere create in griglia in base alla scelta dell'utente (di default c'è la griglia per 'facile')
    cell.classList.add('easy');
        if (mode === 'medium') {
            cell.classList.add('medium');
        } else if (mode === 'hard') {
            cell.classList.add('hard');
        }

//Creo il numero per la cella
    const number = parseInt(i);

//Appendo il numero alla cella in modo da farlo vedere
    cell.append (number);

//Aggiungo un evento al click della cella
    cell.addEventListener('click', function(){
        if((cell.classList.contains('clicked'))  && (gameEnd == false)) {
            return;
        }
        cell.classList.add('clicked');
        

//Infine verifico se si vince o se si perde e il punteggio totalizzato:
    const hitBomb = bombs.includes(parseInt(this.innerText));
    console.log(hitBomb);
        if (hitBomb) {
            cell.setAttribute('style', 'background-color: red', ' color:yellow');
            gameOver(score, hitBomb);
            gameEnd = true;
            grid.innerHTML = '';
            alert ('Riclicca su PLAY per iniziare una nuova partita')

        } else {
            showScore.innerText = 'Il tuo punteggio è' + " " + (++score);
            if (score === maxScore) {
            gameOver (score, hitBomb);
            gameEnd = true;
            grid.innerHTML = '';
            alert ('Riclicca su PLAY per iniziare una nuova partita')
        }
    }
});

//Appendo in pagina
grid.append(cell);
}

});



