import { newTransactionButtonWrapper, newTransactionButton, createTransaction } from './transactions.js';

// MODAL ELEMENTS
const modalCurrencyPrefix = document.querySelector('#currencyPrefix');
const modalTransactionTitleFieldProxy = document.querySelector('.modal-transactions__title-field ');
const modalForm = document.querySelector('.modal-transactions__content');
const modalSubmitButton = document.querySelector('.modal-transactions__main-button');
const modalControls = {
    transactionsModalOverlay: document.querySelector('.modal-transactions__overlay'),
    closeModalButton: document.querySelector('.modal-transactions__close-button'),
}
const formFields = {
    amount: document.getElementById('amount-field'),
    title: document.getElementById('modalTransactionTitle'),
    type: document.querySelector('.modal-transactions__type-field'),
    date: document.querySelector('.modal-transactions__date-field'),
}

// ========== MODAL UI SET UP ==========

function setUpModal() {
    setModalVisibitlyControls();
    setSubmitButton();
    formFields.amount.oninput = changeAmountFieldColor;
    formFields.type.onchange = changeAmountFieldPrefix;
    setTransationTitle();
    modalForm.onsubmit = (event) => handleForm(event);
}

// TOGGLE VISIBILITY
function setModalVisibitlyControls() {
    // SHOW MODAL
    newTransactionButtonWrapper.onclick = () => {
        if(!newTransactionButton.hasAttribute('disabled')) modalControls.transactionsModalOverlay.toggleAttribute('data-hidden');
    }

    // HIDE MODAL
    modalControls.closeModalButton.onclick = (event) => hideModal(event, false, modalControls);
    modalControls.transactionsModalOverlay.addEventListener('mousedown', event => hideModal(event, true, modalControls));
    window.addEventListener('keydown', event => hideModal(event, false, modalControls));
}

function hideModal(event, checkTarget, controls) {
    switch(event.type) {
        case 'click':
            controls.transactionsModalOverlay.toggleAttribute('data-hidden');
            break
        case 'mousedown':
            if(checkTarget){
                if(event.target === controls.transactionsModalOverlay) controls.transactionsModalOverlay.toggleAttribute('data-hidden');
            }
            break
        case 'keydown':
            if(event.key === "Escape") controls.transactionsModalOverlay.toggleAttribute('data-hidden', true);
            break
        default:
            return
    }
}

// DEFINE EVENT-BASED STATES FOR THE AMOUNT FIELD
function changeAmountFieldColor() {
    if(formFields.amount.value !== '') {
        modalCurrencyPrefix.classList.add('lit');
    } else {
        modalCurrencyPrefix.classList.remove('lit');
    }
}

function changeAmountFieldPrefix() {
    if(formFields.type.value === "Expense") {
        if(modalCurrencyPrefix.classList.contains('modal-transactions__currency-prefix')) {
            modalCurrencyPrefix.classList.replace('modal-transactions__currency-prefix', 'modal-transactions__currency-prefix-negative');
        }
    } else {
        if(modalCurrencyPrefix.classList.contains('modal-transactions__currency-prefix-negative')) {
            modalCurrencyPrefix.classList.replace('modal-transactions__currency-prefix-negative', 'modal-transactions__currency-prefix');
        }
    }
}

// DEFINE EVENT-BASED STATES FOR THE SUBMIT BUTTON
function setSubmitButton() {
    modalSubmitButton.disabled = true;
    
    for(let field in formFields) {
        formFields[field].addEventListener('input', () => {
            toggleSubmitButtonState();
        });
    }
}

function toggleSubmitButtonState() {
    if(areAllFieldsFilled()) {
        modalSubmitButton.disabled = false;
    } else {
        modalSubmitButton.disabled = true;
    }
}

// SET UP THE TITLE FIELD
function setTransationTitle() {
    modalTransactionTitleFieldProxy.oninput = () => {
        formFields.title.value = modalTransactionTitleFieldProxy.innerText;
        toggleSubmitButtonState();
    };
}

// ========== ON-SUBMIT FUNCTIONS ==========

// ENABLE SUBMIT BUTTON AND DATA VALIDATION
function getFormValues() {
    return {
        amount: formFields.amount.value,
        title: formFields.title.value,
        type: formFields.type.value,
        date: formFields.date.value,
    };
}

function areAllFieldsFilled() {
    const modalFormFields = getFormValues();
    let valid = 0;

    for(let field in modalFormFields) {
        if(modalFormFields[field] !== "" && modalFormFields[field] !== null && modalFormFields[field] !== undefined) {
            valid++;
        }
    }

    if(valid === 4) {
        toggleWarningMessage(true);
        return true;
    } else {
        return false;
    }
}

function toggleWarningMessage(option) {
    const modalWarningMessage = document.querySelector('.modal-transactions__warning-message');
    modalWarningMessage.classList.toggle('hidden-from-ui', option);
}

function resetModal() {
    clearForm();
    changeAmountFieldColor();
    changeAmountFieldPrefix();
    modalControls.transactionsModalOverlay.toggleAttribute('data-hidden');
    modalSubmitButton.disabled = true;
}

// HANDLE SUBMIT
function handleForm(event) {
    event.preventDefault();

    // DATA VALIDATION
    if(!areAllFieldsFilled()) {
        toggleWarningMessage(false);
        return;
    }

    // GET, FORMAT, AND PASS DATA ON TO THE NEXT FUNCTION
    createTransaction(formatData(getFormValues()));

    // MODAL RESET
    resetModal();
}

function formatData(data) {
    const transactionData = {};

    transactionData.title = data.title;
    transactionData.date = data.date;
    transactionData.amount = data.type === 'Expense' ? parseAmount(data.amount) * -1 : parseAmount(data.amount);
    
    return transactionData;
}

function parseAmount(amount) {
    return parseInt(parseFloat(amount)*100);
}

function clearForm() {
    modalTransactionTitleFieldProxy.innerText = '';

    for(let field in formFields) {
        if(formFields[field].tagName === 'SELECT') {
            formFields[field].value = 'Income';
        } else {
            formFields[field].value = '';
        }
    }
}

export { setUpModal };