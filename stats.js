import { formatCurrency } from './utils.js';

// CALCULATE STATS
function calculateStats(transactionsData) {
    let stats = {
        balance: 0,
        count: 0,
        income: 0,
        expenses: 0,
    };
    
    stats.balance = transactionsData.reduce((acc, cur) => {
        return acc + cur.amount;
    }, 0);
    
    stats.count = transactionsData.length;
    
    stats.income = transactionsData.reduce((acc, cur) => {
        if(cur.amount > 0) {
            return acc + cur.amount;
        } else {
            return acc + 0;
        }
    }, 0);
    
    stats.expenses = transactionsData.reduce((acc, cur) => {
        if(cur.amount < 0) {
            return acc + cur.amount;
        } else {
            return acc + 0;
        }
    }, 0);

    return stats;
}

// UPDATE STATS ON UI
function updateStats(transactionsData) {

    const stats = calculateStats(transactionsData);

    const balance = document.querySelector('.primary-stats__amount');
    balance.innerText = formatCurrency(stats.balance);

    const transactionsCount = document.querySelector('#transactionsCount');
    if(stats.count > 0) {
        transactionsCount.innerText =  stats.count < 9 ? '0' + stats.count + ' transactions' : stats.count + ' transactions';
    } else {
        transactionsCount.innerText = 'No transactions';
}
    const income = document.querySelector('.secondary-stats__income-amount');
    income.innerText = formatCurrency(stats.income);

    const expenses = document.querySelector('.secondary-stats__expenses-amount');
    expenses.innerText = formatCurrency(stats.expenses);
}

export { updateStats };