import { addTransaction, listAllTransactions, clearAllTransactions } from "./transactions.js";
import { updateStats } from "./stats.js";

// TOGGLE THE TRANSACTIONS MODAL VISIBILITY
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

// SET UP TRANSACTIONS
const allTransactions = [
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
    {
        id: 4,
        title: 'Groceries',
        date: '06/01/2021',
        amount: -12000,
    },
    {
        id: 5,
        title: 'Netflix subscription',
        date: '06/01/2021',
        amount: 23000,
    },
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
    {
        id: 4,
        title: 'Groceries',
        date: '06/01/2021',
        amount: -12000,
    },
    {
        id: 5,
        title: 'Garage sales',
        date: '06/01/2021',
        amount: 23000,
    },
];

listAllTransactions(allTransactions);
updateStats(allTransactions);

function createTransaction(transactionData) {
    addTransaction(transactionData, allTransactions);
    clearAllTransactions();
    listAllTransactions(allTransactions);
    updateStats(allTransactions);
}

createTransaction({
    id: 6,
    title: 'Test',
    date: '12/18/2021',
    amount: 15080,
});

createTransaction({
    id: 7,
    title: 'Test 2',
    date: '12/20/2021',
    amount: 550,
});

const editButton = document.getElementById('sortButton');
const cellWrappers = document.querySelectorAll('.transactions__cell-wrapper');

editButton.onclick = () => {
    for(let element of cellWrappers) {
        element.toggleAttribute('data-visible');
    }
}

