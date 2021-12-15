
// TOGGLE THE TRANSACTIONS MODAL VISIBILITY
const transactionsModal = document.querySelector('.modal-transactions__content');

const transactionsModalOverlay = document.querySelector('.modal-transactions__overlay');

const closeModalButton = document.querySelector('.modal-transactions__close-button');

newTransactionButton.onclick = () => {
    transactionsModalOverlay.toggleAttribute('data-hidden');
};

closeModalButton.onclick = () => {
    transactionsModalOverlay.toggleAttribute('data-hidden');
};

window.onclick = (event) => {
    if(event.target === transactionsModalOverlay) {
        transactionsModalOverlay.toggleAttribute('data-hidden');
    }
}

window.addEventListener('keydown', (event) => {
    if(event.key === "Escape") {
        transactionsModalOverlay.toggleAttribute('data-hidden');
    }
})

// TOGGLE CURRENCY PREFIX IN THE TRANSACTION MODAL
const modalTypeField = document.querySelector('.modal-transactions__type-field');

const modalCurrencyPrefix = document.querySelector('#amountFieldLabel');

modalTypeField.onchange = () => {
    if(modalTypeField.value == "Expense") {
        if(modalCurrencyPrefix.classList.contains('modal-transactions__currency-prefix')) {
            modalCurrencyPrefix.classList.replace('modal-transactions__currency-prefix', 'modal-transactions__currency-prefix-negative');
        }
    } else {
        if(modalCurrencyPrefix.classList.contains('modal-transactions__currency-prefix-negative')) {
            modalCurrencyPrefix.classList.replace('modal-transactions__currency-prefix-negative', 'modal-transactions__currency-prefix');
        }
    }
};

// SETTING UP TRANSACTIONS
const transactions = [
    {
        id: 1,
        title: 'Site development',
        date: '04/13/2021',
        amount: 1200000,
    },
    {
        id: 2,
        title: 'Rent',
        date: '04/13/2021',
        amount: -150000,
    },
    {
        id: 3,
        title: 'Netflix subscription',
        date: '06/01/2021',
        amount: -5590,
    },
];

const stats = {
    income() {
        //code goes here...
    },
    expenses(){
        //code goes here...
    },
    balance(){
        //code goes here...
    }
};

// ADD TRANSACTIONS
const transactionsRowsWrapper = document.querySelector('.transactions__table-rows-wrapper');

transactions.forEach(transaction => addTransaction(transaction));

function addTransaction(transaction, index) {
    const transactionsRow = document.createElement('div');
    transactionsRow.classList.add('transactions__table-row');
    transactionsRow.innerHTML = transactionInnerHTML(transaction);
    transactionsRowsWrapper.appendChild(transactionsRow);
}

function transactionInnerHTML(transaction) {

    const signStyle = transaction.amount < 0 ? 'minus-prefix' : 'plus-prefix';

    const transactionRowTemplate = `
        <p class="f-body-M f-one-liner transactions__title">${transaction.title}</p>
        <p class="f-body-M f-medium f-one-liner transactions__date">${formatDate(transaction.date)}</p>
        <p class="f-body-M f-medium f-one-liner transactions__amount ${signStyle}">${formatCurrency(transaction.amount)}</p>
    `;

    return transactionRowTemplate;
}

// FORMAT CURRENCY
function formatCurrency(amount) {
    const sign = Number(amount) < 0 ? '-' : '';

    amount = String(amount).replace(/\D/g, '');
    amount = Number(amount) / 100;
    amount = amount.toLocaleString("en-US", {
        style: "currency",
        currency: "BRL",
    });

    return `${sign} ${amount}`;
}

// FORMAT DATE
function formatDate(date) {
    const dateArray = date.split('/');
    const formattedDate = `${numberToMonth(dateArray[0])} ${dateArray[1]}, ${dateArray[2]}`;

    return formattedDate;
}

function numberToMonth(monthNum) {
    const monthsMMM = {
        '01': "Jan",
        '02': "Feb",
        '03': "Mar",
        '04': "Apr",
        '05': "May",
        '06': "Jun",
        '07': "Jul",
        '08': "Aug",
        '09': "Sep",
        '10': "Oct",
        '11': "Nov",
        '12': "Dec",
    }

    return monthsMMM[monthNum];
}