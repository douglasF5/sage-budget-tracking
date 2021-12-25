// MODAL ELEMENTS
const transactionsModalOverlay = document.querySelector('.modal-transactions__overlay');
const closeModalButton = document.querySelector('.modal-transactions__close-button');
const modalTypeField = document.querySelector('.modal-transactions__type-field');
const modalCurrencyPrefix = document.querySelector('#currencyPrefix');
const modalAmountField = document.getElementById('amount-field');
const modalTransactionTitleFieldProxy = document.querySelector('.modal-transactions__title-field ');
const modalTransactionTitleField = document.getElementById('modalTransactionTitle');
const modalForm = document.querySelector('.modal-transactions__content');

const modal = {
    overlay: transactionsModalOverlay,
    closeButton: closeModalButton,
    typeField: modalTypeField,
    currencyPrefix: modalCurrencyPrefix,
    amountField: modalAmountField,
};

// MODAL FUNCTIONS
// TOGGLE MODAL VISIBILITY
function showModal() {
    transactionsModalOverlay.toggleAttribute('data-hidden');
}

function hideModal(event, checkTarget) {
    switch(event.type) {
        case 'click':
            if(checkTarget === undefined){
                transactionsModalOverlay.toggleAttribute('data-hidden');
            } else {
                if(event.target === transactionsModalOverlay) transactionsModalOverlay.toggleAttribute('data-hidden');
            }
            break
        case 'keydown':
            if(event.key === "Escape") transactionsModalOverlay.toggleAttribute('data-hidden');
            break
        default:
            return
    }
}

// SET UP AMOUNT FIELD
function changeAmountFieldColor() {
    if(modalAmountField.value !== '') {
        modalCurrencyPrefix.classList.add('lit');
    } else {
        modalCurrencyPrefix.classList.remove('lit');
    }
}

function changeAmountFieldPrefix() {
    if(modalTypeField.value == "Expense") {
        if(modalCurrencyPrefix.classList.contains('modal-transactions__currency-prefix')) {
            modalCurrencyPrefix.classList.replace('modal-transactions__currency-prefix', 'modal-transactions__currency-prefix-negative');
        }
    } else {
        if(modalCurrencyPrefix.classList.contains('modal-transactions__currency-prefix-negative')) {
            modalCurrencyPrefix.classList.replace('modal-transactions__currency-prefix-negative', 'modal-transactions__currency-prefix');
        }
    }
}

// SET UP TITLE FIELD
modalTransactionTitleFieldProxy.oninput = getTransationTitle;

function getTransationTitle() {
    modalTransactionTitleField.value = modalTransactionTitleFieldProxy.innerText;
}

// GET FORM DATA
modalForm.onsubmit = (event) => getFormData(event);

function getFormData(event) {
    console.log(event);
}

export { modal, showModal, hideModal, changeAmountFieldColor, changeAmountFieldPrefix };