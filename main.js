import { transactionElements, createTransaction, clearTransaction, renderAllTransactions, clearAllTransactions, toggleDeleteMode } from "./transactions.js";
import { updateStatsOnUI } from "./stats.js";
import { modal, showModal, hideModal, changeAmountFieldColor, changeAmountFieldPrefix } from "./modal.js";
import { showClickedElement } from "./utils.js";

// TOGGLE THE TRANSACTIONS MODAL VISIBILITY
transactionElements.newTransactionButtonWrapper.onclick = showModal;
modal.closeButton.onclick = hideModal;
modal.overlay.addEventListener('click', event => hideModal(event, true));
window.addEventListener('keydown', event => hideModal(event, false));

// SET UP AMOUNT FIELD
modal.amountField.oninput = changeAmountFieldColor;
modal.typeField.onchange = changeAmountFieldPrefix;

// TRANSACTIONS DATA
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

// SET UP THE DATA ON THE FIRST PAGE LOAD
renderAllTransactions(allTransactions);
updateStatsOnUI(allTransactions);

// DELETE TRANSACTION
transactionElements.editButtonWrapper.onclick = toggleDeleteMode;

createTransaction({
    id: 6,
    title: 'Test',
    date: '12/18/2021',
    amount: 15080,
}, allTransactions);

createTransaction({
    id: 7,
    title: 'Test 2',
    date: '12/20/2021',
    amount: 550,
}, allTransactions);

export { allTransactions };