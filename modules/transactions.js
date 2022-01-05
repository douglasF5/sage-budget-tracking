import { formatDate, formatCurrency } from "./utils.js";
import { updateStatsOnUI } from "./stats.js";
import { allTransactionsData, setData } from "./storage.js";

// TRANSACTION ELEMENTS
const newTransactionButton = document.querySelector('#newTransactionButton');
const newTransactionButtonWrapper = document.querySelector('#newTransactionButtonWrapper');
const editButtonWrapper = document.getElementById('editTransactionButtonWrapper');
const transactionsRowsWrapper = document.querySelector('.transactions__table-rows-wrapper');
let deleteButtons = document.getElementsByClassName('transactions__delete-button');

// SET UP TRANSACTIONS ON UI
function setUpTransactionsTable() {
    setData(allTransactionsData);
    renderAllTransactions();
    updateStatsOnUI();
    editButtonWrapper.onclick = () => toggleDeleteMode(true);
    newTransactionButtonWrapper.onclick = () => toggleDeleteMode(true);
}

// CREATE TRANSACTION
function createTransaction(transactionData) {
    allTransactionsData.push(transactionData);
    setData(allTransactionsData);
    clearAllTransactions();
    renderAllTransactions();
    updateStatsOnUI();
}

// RENDER TRANSACTION ON UI
function renderTransaction(transactionData) {
    const transactionRow = document.createElement('div');
    transactionRow.classList.add('transactions__table-row');
    transactionRow.dataset.index = allTransactionsData.indexOf(transactionData);
    transactionRow.innerHTML = transactionInnerHTML(transactionData);
    transactionsRowsWrapper.appendChild(transactionRow);
}

function transactionInnerHTML(transactionData) {
    const signStyle = transactionData.amount < 0 ? 'minus-prefix' : 'plus-prefix';

    const transactionRowTemplate = `
        <div class="transactions__cell-wrapper">
            <button class="icon-button transactions__delete-button"><svg class="transactions__delete-button-icon"><use xlink:href="assets/icons.svg#x-icon" /></svg></button>
            <p class="f-body-M transactions__title">${transactionData.title}</p>
        </div>
        <p class="f-body-M f-medium f-one-liner transactions__date">${formatDate(transactionData.date)}</p>
        <p class="f-body-M f-medium f-one-liner transactions__amount ${signStyle}">${formatCurrency(transactionData.amount)}</p>
    `;
    return transactionRowTemplate;
}

// RENDER ALL TRANSACTIONS ON UI
function renderAllTransactions() {
    allTransactionsData.forEach(transaction => renderTransaction(transaction));
}

// TOGGLE DELETE MODE
function toggleDeleteMode(flag) {
    const cellWrappers = document.querySelectorAll('.transactions__cell-wrapper');
    const editButton = document.getElementById('editTransactionButton');

    if(flag) {
        if(editButton.innerText === 'Edit') {
            editButton.innerText = 'Done';
            newTransactionButton.disabled = true;
        
            deleteButtons = document.getElementsByClassName('transactions__delete-button');
    
            Object.values(deleteButtons).forEach(button => {
                button.addEventListener('click', () => {
                    clearTransaction(button)});
            });
    
            for(let element of cellWrappers) {
                element.toggleAttribute('data-visible');
            }
        } else {
            editButton.innerText = 'Edit';
            newTransactionButton.disabled = false;
            for(let element of cellWrappers) {
                element.toggleAttribute('data-visible');
            }
        }
    } else {
        editButton.innerText = 'Done';
        newTransactionButton.disabled = true;
    
        deleteButtons = document.getElementsByClassName('transactions__delete-button');

        Object.values(deleteButtons).forEach(button => {
            button.addEventListener('click', () => {
                clearTransaction(button)});
        });

        for(let element of cellWrappers) {
            element.toggleAttribute('data-visible');
        }
    }
    
}

// DELETE AND CLEAR TRANSACTION FROM UI
function clearTransaction(trigger) {
    const row = trigger.closest('div.transactions__table-row');
    allTransactionsData.splice(row.getAttribute('data-index'), 1);
    setData(allTransactionsData);
    clearAllTransactions();
    renderAllTransactions();
    toggleDeleteMode(false);
    updateStatsOnUI();
}

// CLEAR ALL TRANSACTIONS FROM UI
function clearAllTransactions() {
    transactionsRowsWrapper.innerHTML = '';
}

export { newTransactionButtonWrapper, newTransactionButton, createTransaction, setUpTransactionsTable };