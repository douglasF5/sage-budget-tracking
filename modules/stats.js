import { formatCurrency } from './utils.js';
import { allTransactionsData } from "./storage.js";

const statsContainer = document.querySelector('.stats');
const secondaryStats = document.querySelector('.secondary-stats');
const transactionsTable = document.querySelector('.transactions');
const statsArrow = document.querySelector('.primary-stats__arrow');

let stats = {
    balance: 0,
    count: 0,
    income: 0,
    expenses: 0,
};

// CALCULATE STATS
function calculateStats() {    
    if(allTransactionsData.length !== 0) {
        stats.balance = allTransactionsData.reduce((acc, cur) => {
            return acc + cur.amount;
        }, 0);
        
        stats.count = allTransactionsData.length;
        
        stats.income = allTransactionsData.reduce((acc, cur) => {
            if(cur.amount > 0) {
                return acc + cur.amount;
            } else {
                return acc + 0;
            }
        }, 0);
        
        stats.expenses = allTransactionsData.reduce((acc, cur) => {
            if(cur.amount < 0) {
                return acc + cur.amount;
            } else {
                return acc + 0;
            }
        }, 0);

        return stats;
    }
    
    return {
        balance: 0,
        count: 0,
        income: 0,
        expenses: 0,
    };
}

// UPDATE STATS ON UI
function updateStatsOnUI() {

    const stats = calculateStats(allTransactionsData);

    const balance = document.querySelector('.primary-stats__amount');
    stats.balance < 0 ? balance.classList.add('negative') : balance.classList.remove('negative');
    balance.innerText = formatCurrency(stats.balance);

    const transactionsCount = document.querySelector('#transactionsCount');

    if(stats.count === 1) {
        transactionsCount.innerText =  '0' + stats.count + ' transaction';
    } else if(stats.count > 1 && stats.count < 10) {
        transactionsCount.innerText =  '0' + stats.count + ' transactions';
    } else if(stats.count > 9) {
        transactionsCount.innerText =  stats.count + ' transactions';
    } else {
        transactionsCount.innerText = 'No transactions';
    }
    const income = document.querySelector('.secondary-stats__income-amount');
    income.innerText = formatCurrency(stats.income);

    const expenses = document.querySelector('.secondary-stats__expenses-amount');
    expenses.innerText = formatCurrency(stats.expenses);
}

// TOGGLE SECONDARY STATS
function setStatsOnUi() {
    statsContainer.onclick = () => {
        let isControlVisible = window.getComputedStyle(statsArrow).display !== 'none';

        if(isControlVisible) {
            statsContainer.toggleAttribute('data-open');
            transactionsTable.toggleAttribute('data-unfocused');
        }
    }
}

export { updateStatsOnUI, setStatsOnUi };