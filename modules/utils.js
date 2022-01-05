//FORMAT DATE
function formatDate(date) {
    const dateArray = date.split('-');
    const formattedDate = `${numberToMonth(dateArray[1])} ${dateArray[2]}, ${dateArray[0]}`;

    return formattedDate;
}

function numberToMonth(monthNum) {
    const monthsMMM = {
        '01': "Jan",
        '02': "Feb",
        '03': "Mar",
        '04': "Apr",
        '05': "May",
        '06': "Jun",
        '07': "Jul",
        '08': "Aug",
        '09': "Sep",
        '10': "Oct",
        '11': "Nov",
        '12': "Dec",
    }
    return monthsMMM[monthNum];
}

// FORMAT CURRENCY
function formatCurrency(amount) {
    const sign = Number(amount) < 0 ? '-' : '';

    amount = String(amount).replace(/\D/g, '');
    amount = Number(amount) / 100;
    amount = amount.toLocaleString("en-US", {
        style: "currency",
        currency: "BRL",
    });

    return `${sign} ${amount.replace('R$', 'R$ ')}`;
}

//CHECK WHAT ELEMENT IS BEING CLICKED
function showClickedElement() {
    window.addEventListener('click', e => console.log(e.target));
}

export { formatDate, formatCurrency, showClickedElement };