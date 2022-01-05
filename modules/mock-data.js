import { createTransaction } from "./transactions.js";
import { mockDataPreference, setMockDataPreference } from "./storage.js";

// RENDER MOCK DATA
const mockTransactions = [
    {
        title: 'Electricity bill',
        date: '2021-06-10',
        amount: -11238,
    },
    {
        title: 'Salary',
        date: '2021-06-07',
        amount: 954062,
    },
    {
        title: 'Groceries',
        date: '2021-06-07',
        amount: -12014,
    },
    {
        title: 'Gift to my ❤',
        date: '2021-06-06',
        amount: -28798,
    },
    {
        title: 'Lend some money to my brother',
        date: '2021-06-05',
        amount: -50000,
    },
    {
        title: 'Bonus payment',
        date: '2021-06-05',
        amount: 358000,
    },
    {
        title: 'Rent',
        date: '2021-06-05',
        amount: -144871,
    },
    {
        title: 'Dividend income',
        date: '2021-06-03',
        amount: 10011,
    },
    {
        title: 'Netflix subscription',
        date: '2021-05-31',
        amount: -5590,
    },
    {
        title: 'Uber ride',
        date: '2021-05-30',
        amount: -830,
    },
    {
        title: 'Garage sale',
        date: '2021-05-28',
        amount: 15000,
    },
];

let mockDataEnable = mockDataPreference;

function setMockData() {
    if(mockDataEnable === null || mockDataEnable === true) {
        mockTransactions.forEach(transaction => {
            createTransaction(transaction);
        });
    
        window.addEventListener('beforeunload', () => {
            setMockDataPreference(false);
        });
    }
}

export  { setMockData };