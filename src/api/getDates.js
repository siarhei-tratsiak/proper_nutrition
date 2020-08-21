function forDatePicker(date = 0) {
    return new Date(date).toISOString().substr(0, 10);
}

function getEnd() {
    const msInDay = getMsInDay();
    const today = getToday();
    const end = today + msInDay;
    return end;
}

function getMsInDay() {
    return 24 * 60 * 60 * 1000;
}

function getNow() {
    return new Date();
}

function getToday() {
    const msInDay = getMsInDay();
    const now = getNow();
    const today = now - (now % msInDay);
    return today;
}

function getYear() {
    const msInDay = getMsInDay();
    const year = msInDay * 365.25;
    return year;
}

export { forDatePicker, getEnd, getMsInDay, getNow, getToday, getYear };
