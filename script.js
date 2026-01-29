// 1️⃣ Stato principale
let count = 0;

// 2️⃣ Suono
const popSound = new Audio('pop.mp3');

// 3️⃣ Controllo localStorage
const savedCount = localStorage.getItem('counter');
if (savedCount !== null) {
    count = parseInt(savedCount);
}

// 4️⃣ Creazione elementi DOM
const app = document.getElementById('app');
const counterValue = document.createElement('h1');
const incrementBtn = document.createElement('button');
const decrementBtn = document.createElement('button');
const resetBtn = document.createElement('button');

// Setta testo dei bottomni e valore iniziale
counterValue.textContent = count;

const plusSpan = document.createElement('span');
plusSpan.textContent = '＋';
incrementBtn.appendChild(plusSpan);

const minusSpan = document.createElement('span');
minusSpan.textContent = '−';
decrementBtn.appendChild(minusSpan);

resetBtn.textContent = 'RESET';

// 5️⃣ Append al DOM
app.appendChild(counterValue);
app.appendChild(incrementBtn);
app.appendChild(decrementBtn);
app.appendChild(resetBtn);

// 6️⃣ Funzioni di aggiornamento UI
function updateCounterColor() {
    counterValue.classList.remove(
        'counter-positive',
        'counter-negative',
        'counter-zero'
    );

    if (count > 0) {
        counterValue.classList.add('counter-positive');
    } else if (count < 0) {
        counterValue.classList.add('counter-negative');
    } else {
        counterValue.classList.add('counter-zero');
    }
}

function updateBackground() {
    if (count > 0) {
        app.style.background = 'linear-gradient(135deg, #e0f8e9, #c0f0d9)'; // verde chiaro
    } else if (count < 0) {
        app.style.background = 'linear-gradient(135deg, #ffe0e0, #f0c0c0)'; // rosso chiaro
    } else {
        app.style.background = 'linear-gradient(135deg, #ffffff, #f0f0f0)'; // neutro
    }

    // piccolo effetto pulsazione
    app.style.transition = 'background 0.2s ease';
}

// Funzione animazione numero
function animateCounter() {

    // Riproduci suono
    popSound.currentTime = 0; // riavvia se clicchi veloce
    popSound.play();
    // Aggiungiamo scale + glow
    counterValue.style.transform = 'scale(1.3)';

    if (count > 0) {
        counterValue.style.textShadow = '0 0 20px #38a169';
    } else if (count < 0) {
        counterValue.style.textShadow = '0 0 20px #e53e3e';
    } else {
        counterValue.style.textShadow = '0 0 20px #333';
    }

    setTimeout(() => {
        counterValue.style.transform = 'scale(1)';
        counterValue.style.textShadow = 'none'; // reset glow
    }, 150);
}

// 7️⃣ Colore e background iniziale
updateCounterColor();
updateBackground();

// 8️⃣ Event listener
incrementBtn.addEventListener('click', () => {
    count++;
    counterValue.textContent = count;
    updateCounterColor();
    animateCounter();
    updateBackground();
    localStorage.setItem('counter', count);
});

decrementBtn.addEventListener('click', () => {
    count--;
    counterValue.textContent = count;
    updateCounterColor();
    animateCounter();
    updateBackground();
    localStorage.setItem('counter', count);
});

resetBtn.addEventListener('click', () => {
    count = 0;
    counterValue.textContent = count;
    updateCounterColor();
    animateCounter();
    updateBackground();
    localStorage.setItem('counter', count);
});
