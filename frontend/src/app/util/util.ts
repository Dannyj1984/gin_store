export function getCookie(key: string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
}

export function currencyFormat(amount: number) {
    return '£' + (amount / 100).toFixed(2)
}

export function dateFormat(date: string) {
    var parts = date.split('-');
    var mydate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    return mydate.toDateString()
}