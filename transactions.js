import { formatDate, formatCurrency } from "./utils.js";
import { updateStatsOnUI } from "./stats.js";
import { allTransactions } from "./main.js";

// TRANSACTION ELEMENTS
const newTransactionButton = document.querySelector('#newTransactionButton');
const newTransactionButtonWrapper = document.querySelector('#newTransactionButtonWrapper');
const editButton = document.getElementById('editTransactionButton');
const editButtonWrapper = document.getElementById('editTransactionButtonWrapper');
const transactionsRowsWrapper = document.querySelector('.transactions__table-rows-wrapper');
let deleteButtons = document.getElementsByClassName('transactions__delete-button');

const transactionElements = {
    newTransactionButtonWrapper,
    editButtonWrapper,
};

// RENDER TRANSACTION ON UI
function renderTransaction(transactionData) {
    const transactionRow = document.createElement('div');
    transactionRow.classList.add('transactions__table-row');
    transactionRow.innerHTML = transactionInnerHTML(transactionData);
    transactionsRowsWrapper.appendChild(transactionRow);
}

function transactionInnerHTML(transaction) {
    const signStyle = transaction.amount < 0 ? 'minus-prefix' : 'plus-prefix';
    const transactionRowTemplate = `
        <div class="transactions__cell-wrapper">
            <button class="icon-button transactions__delete-button" data-hidden><svg class="transactions__delete-button-icon"><use xlink:href="assets/icons.svg#x-icon" /></svg></button>
            <p class="f-body-M f-one-liner transactions__title">${transaction.title}</p>
        </div>
        <p class="f-body-M f-medium f-one-liner transactions__date">${formatDate(transaction.date)}</p>
        <p class="f-body-M f-medium f-one-liner transactions__amount ${signStyle}">${formatCurrency(transaction.amount)}</p>
    `;
    return transactionRowTemplate;
}

// RENDER ALL TRANSACTIONS ON UI
function renderAllTransactions(transactionsData) {
    transactionsData.forEach(transaction => renderTransaction(transaction));
}

// CREATE TRANSACTION
function createTransaction(transactionData, transactionsData) {
    transactionsData.push(transactionData);
    renderTransaction(transactionData);
    updateStatsOnUI(transactionsData);
}

// TOGGLE DELETE MODE
function toggleDeleteMode() {
    if(editButton.innerText === 'Edit') {
        editButton.innerText = 'Done';
        newTransactionButton.disabled = true;
    } else {
        editButton.innerText = 'Edit';
        newTransactionButton.disabled = false;
    }

    const cellWrappers = document.querySelectorAll('.transactions__cell-wrapper');

    for(let element of cellWrappers) {
        element.toggleAttribute('data-visible');
    }

    deleteButtons = document.getElementsByClassName('transactions__delete-button');
    
    Object.values(deleteButtons).forEach(button => {
        button.addEventListener('click', () => {clearTransaction(button, allTransactions)});
    });
}

// CLEAR TRANSACTION
function clearTransaction(trigger, transactionsData) {
    const row = trigger.closest('div.transactions__table-row');
    const rowIndex = getElementKey(transactionsRowsWrapper.children, row);
    transactionsData.splice(rowIndex, 1);
    row.remove();
    updateStatsOnUI(transactionsData);
}

function getElementKey(object, value) {
    const key = Object.keys(object).find(key => object[key] === value);
    return key;
}

// CLEAR ALL TRANSACTIONS
function clearAllTransactions() {
    transactionsRowsWrapper.innerHTML = '';
}

export { transactionElements, createTransaction, clearTransaction, renderAllTransactions, clearAllTransactions, toggleDeleteMode };