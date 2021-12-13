
// TOGGLE THE TRANSACTIONS MODAL
const transactionsModal = document.querySelector('.modal-transactions__overlay');

const closeModalButton = document.querySelector('.modal-transactions__close-button');

newTransactionButton.onclick = () => {
    transactionsModal.toggleAttribute('data-hidden');
};

closeModalButton.onclick = () => {
    transactionsModal.toggleAttribute('data-hidden');
};

// TOGGLE CURRENCY PREFIX IN THE TRANSACTION MODAL
const modalTypeField = document.querySelector('.modal-transactions__type-field');

const modalCurrencyPrefix = document.querySelector('.modal-transactions__currency-prefix');

modalTypeField.onchange = () => {
    if(modalTypeField.value == "Expense") {
        if(modalCurrencyPrefix.classList.contains('currency-prefix')) {
            modalCurrencyPrefix.classList.replace('currency-prefix', 'currency-prefix-negative');
        }
    } else {
        if(modalCurrencyPrefix.classList.contains('currency-prefix-negative')) {
            modalCurrencyPrefix.classList.replace('currency-prefix-negative', 'currency-prefix');
        }
    }
};

// SETTING UP TRANSACTIONS
const transactions = [
    {
        id: 1,
        title: 'Site development',
        date: '04/13/2021',
        amount: 1200000
    },
    {
        id: 2,
        title: 'Rent',
        date: '04/13/2021',
        amount: 150000
    },
    {
        id: 3,
        title: 'Netflix subscription',
        date: '04/13/2021',
        amount: 5590
    }
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
addTransactions();

function addTransactions() {
    const transactionsTable = document.querySelector('#transactionsTable');
    transactionsTable.append(transactionInnerHTML("text", "today", 50));
}

function transactionInnerHTML(title, date, amount) {
    const transactionRowTemplate = `
        <div class="transactions__table-row">
            <p class="f-body-M f-one-liner transactions__title">${title}</p>
            <p class="f-body-M f-medium f-one-liner transactions__date">${date}</p>
            <p class="f-body-M f-medium f-one-liner transactions__amount currency-prefix-positive">${amount}</p>
        </div>
    `;

    return transactionRowTemplate;
}