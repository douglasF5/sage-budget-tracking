
// TOGGLE THE TRANSACTIONS MODAL
let transactionsModal = document.querySelector('.modal-transactions__overlay');

let closeModalButton = document.querySelector('.modal-transactions__close-button');

let modalContent = document.querySelector('.modal-transactions__content');

newTransactionButton.onclick = () => {
    transactionsModal.removeAttribute('data-hidden');
};

closeModalButton.onclick = () => {closeTransactionsModal(transactionsModal);};

modalContent.onblur = () => {closeTransactionsModal(transactionsModal);};

function closeTransactionsModal(element) {

    if(element.hasAttribute('data-hidden')) {
        return;
    } else {
        element.setAttribute('data-hidden', '');
        return;
    }
}

