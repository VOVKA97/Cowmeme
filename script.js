function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.right = sidebar.style.right === '0px' ? '-50%' : '0px';
}

function generateRefCode() {
    const code = 'COW' + Math.random().toString(36).substring(2, 8).toUpperCase();
    document.getElementById('ref-code').textContent = code;
}

function useReferral() {
    const code = document.getElementById('enter-ref-code').value;
    if (code) {
        alert('Код активирован! Вам начислено 50 монет.');
        updateBalance(50);
        addReferral(code);
    }
}

function addReferral(code) {
    const list = document.getElementById('referral-list');
    const li = document.createElement('li');
    li.textContent = `Реферал с кодом: ${code}`;
    list.appendChild(li);
}

function updateBalance(amount) {
    let balance = parseInt(document.getElementById('coin-balance').textContent);
    balance += amount;
    document.getElementById('coin-balance').textContent = balance;
}

window.onload = generateRefCode;
function connectWallet() {
    const wallets = ['MetaMask', 'Trust Wallet', 'Coinbase Wallet'];
    let choice = prompt('Выберите кошелек: ' + wallets.join(', '));
    if (wallets.includes(choice)) {
        alert(`${choice} подключен!`);
    } else {
        alert('Кошелек не поддерживается.');
    }
}
let lastNicknameChange = null;

function changeAvatar() {
    const file = document.getElementById('avatar-upload').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('avatar').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function changeNickname() {
    const newNick = document.getElementById('new-nickname').value;
    const now = new Date();
    if (lastNicknameChange && (now - lastNicknameChange) < 3 * 24 * 60 * 60 * 1000) {
        alert('Ник можно менять раз в 3 дня!');
    } else if (newNick) {
        document.getElementById('nickname').textContent = newNick;
        lastNicknameChange = now;
        alert('Ник успешно изменен!');
    }
}
function sendCoins() {
    const address = prompt('Введите адрес кошелька:');
    if (address) {
        alert('Монеты отправлены на ' + address);
    }
}
// Существующие функции
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.right = sidebar.style.right === '0px' ? '-50%' : '0px';
}

// Инициализация TON Connect
const tonConnect = new TonConnect.SDK.TonConnect({
    manifestUrl: 'https://your-website.com/tonconnect-manifest.json' // Укажи URL манифеста (см. ниже)
});

// Подключение Tonkeeper
async function connectTonkeeper() {
    try {
        // Показываем QR-код или deeplink для подключения
        const walletConnectionSource = {
            universalLink: 'https://app.tonkeeper.com/ton-connect', // Deeplink для Tonkeeper
            bridgeUrl: 'https://bridge.tonapi.io/bridge' // TON Bridge
        };
        const qrCodeUrl = await tonConnect.connect(walletConnectionSource);
        
        // Показываем QR-код пользователю (можно использовать библиотеку qrcode.js для отображения)
        alert('Отсканируйте QR-код в Tonkeeper: ' + qrCodeUrl);
        console.log('QR-код для подключения:', qrCodeUrl);

        // Ждем подключения
        tonConnect.onStatusChange((walletInfo) => {
            if (walletInfo) {
                alert('Tonkeeper подключен! Адрес: ' + walletInfo.account.address);
            }
        });
    } catch (error) {
        console.error('Ошибка подключения:', error);
        alert('Ошибка при подключении Tonkeeper');
    }
}

// Отправка TON
async function sendTonCoins() {
    const walletAddress = document.getElementById('wallet-address').value;
    const amount = document.getElementById('amount').value;

    if (!walletAddress || !amount) {
        alert('Введите адрес кошелька и сумму!');
        return;
    }

    if (!tonConnect.connected) {
        alert('Сначала подключите Tonkeeper!');
        return;
    }

    try {
        // Создаем транзакцию
        const transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 60, // Действительна 1 минуту
            messages: [
                {
                    address: walletAddress,
                    amount: (amount * 1e9).toString(), // Переводим TON в нанотоны (1 TON = 1e9 нанотоны)
                }
            ]
        };

        // Отправляем транзакцию через Tonkeeper
        const result = await tonConnect.sendTransaction(transaction);
        alert('Транзакция отправлена! Хэш: ' + result.boc);
    } catch (error) {
        console.error('Ошибка отправки:', error);
        alert('Ошибка при отправке: ' + error.message);
    }
}
// Инициализация TON Connect с встроенным манифестом
const manifest = {
    url: "https://cowmeme.local", // Временный URL для теста
    name: "CowMeme",
    iconUrl: "https://cowmeme.local/icon.png" // Временная иконка
};
