// TRANSACTIONS DATA
const allTransactionsData = getData();

function getData() {
    return JSON.parse(localStorage.getItem('dev.finances-transactions-data')) || [];
}

function setData(transactionsData) {
    localStorage.setItem('dev.finances-transactions-data', JSON.stringify(transactionsData));
}

// MOCK DATA
let mockDataPreference = getMockDataPreference();

function getMockDataPreference() {
    return localStorage.getItem('mock-data-preference');
}

function setMockDataPreference(preference) {
    localStorage.setItem('mock-data-preference', preference);
}

// USER PREFERENCES
let colorScheme = getColorScheme();

function getColorScheme() {
    return localStorage.getItem('color-scheme');
}

function setColorScheme(colorScheme) {
    localStorage.setItem('color-scheme', colorScheme);
}

export { allTransactionsData, setData, colorScheme, setColorScheme, mockDataPreference, setMockDataPreference };