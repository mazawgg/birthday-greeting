const accessCode = '2005';
const lockScreen = document.getElementById('lockScreen');
const pageContent = document.getElementById('pageContent');
const pinDisplay = document.getElementById('pinDisplay');
const errorMsg = document.getElementById('errorMsg');
let pinValue = '';

function updateDisplay() {
    const digits = Array.from({ length: 4 }, (_, index) => {
        const value = pinValue[index] || '_';
        const isEmpty = !pinValue[index];
        return `<span class="pin-digit ${isEmpty ? 'empty' : ''}">${value}</span>`;
    }).join('');

    pinDisplay.innerHTML = digits;
}

function clearPin() {
    pinValue = '';
    errorMsg.textContent = '';
    updateDisplay();
}

function submitPin() {
    if (pinValue === accessCode) {
        lockScreen.classList.add('hidden');
        pageContent.classList.remove('hidden');
        errorMsg.textContent = '';
        setTimeout(() => {
            buatBalon();
            buatConfetti(30);
        }, 200);
    } else {
        errorMsg.textContent = 'Kode salah! Coba lagi.';
        pinValue = '';
        updateDisplay();
    }
}

document.querySelectorAll('.num-btn[data-value]').forEach(button => {
    button.addEventListener('click', () => {
        if (pinValue.length < 4) {
            pinValue += button.dataset.value;
            updateDisplay();
            errorMsg.textContent = '';
        }
    });
});

document.getElementById('clearBtn').addEventListener('click', clearPin);
document.getElementById('submitBtn').addEventListener('click', submitPin);

document.addEventListener('keydown', (event) => {
    if (/^[0-9]$/.test(event.key)) {
        if (pinValue.length < 4) {
            pinValue += event.key;
            updateDisplay();
            errorMsg.textContent = '';
        }
    } else if (event.key === 'Backspace') {
        pinValue = pinValue.slice(0, -1);
        updateDisplay();
        errorMsg.textContent = '';
    } else if (event.key === 'Enter') {
        submitPin();
    }
});

// FUNGSI UNTUK MEMBUKA KADO
function bukaKado() {
    const kado = document.getElementById('kadoBtn');
    const kejutan = document.getElementById('surpriseBox');

    // Ubah emoji kado jadi terbuka
    kado.innerHTML = '🎊';
    kado.style.animation = 'none'; // Matikan efek getar
    kado.style.cursor = 'default';

    // Tampilkan isi kejutan
    kejutan.classList.add('show');

    // Ledakan Confetti saat kado diklik!
    buatConfetti(50);
}

// FUNGSI UNTUK MEMBUAT EFEK CONFETTI (KERTAS WARNA-WARNI)
function buatConfetti(jumlah) {
    const colors = ['#ff6b81', '#ffdf85', '#a5ffd6', '#b5d8ff', '#ffb5e8'];
    for (let i = 0; i < jumlah; i++) {
        let confetti = document.createElement('div');
        confetti.classList.add('confetti');

        // Random posisi, warna, dan kecepatan
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's'; // 2s - 5s
        confetti.style.opacity = Math.random();
        confetti.style.transform = 'scale(' + (Math.random() * 0.8 + 0.5) + ')';

        document.body.appendChild(confetti);

        // Hapus confetti dari DOM setelah animasi selesai agar tidak berat
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// FUNGSI UNTUK MEMUNCULKAN BALON BACKGROUND OTOMATIS
function buatBalon() {
    const colors = ['#ff8eaa', '#ffdf85', '#b2d9ff', '#ffb8c6', '#d4c4fb'];
    const container = document.getElementById('balloonsContainer');

    // Bikin 15 balon
    for (let i = 0; i < 15; i++) {
        let balon = document.createElement('div');
        balon.classList.add('balloon');

        // Set warna acak ke background & color (untuk ekor balon)
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        balon.style.backgroundColor = randomColor;
        balon.style.color = randomColor;

        // Posisi dan kecepatan acak
        balon.style.left = (Math.random() * 90 + 5) + 'vw';
        balon.style.animationDuration = (Math.random() * 10 + 8) + 's'; // 8s - 18s
        balon.style.animationDelay = (Math.random() * 10) + 's';

        container.appendChild(balon);
    }
}

// tampilkan dulu layar kunci
updateDisplay();