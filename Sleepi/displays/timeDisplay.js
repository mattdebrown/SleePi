let timeDisplay = document.getElementById('time-display');

let hour = document.getElementById('hour');
let minute = document.getElementById('minute');
let ampm = document.getElementById('ampm');

let day = document.getElementById('day');
let month = document.getElementById('month');
let date = document.getElementById('date');

const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dateSuffix = ["--", "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th", "st", "nd"]

window.electronAPI.onUpdateTime((event, value) => {
    let hourValue = value.getHours();
    let minuteValue = value.getMinutes();
    let ampmValue = hourValue >= 12 ? 'PM' : 'AM';

    if(hourValue > 12)
        hourValue -= 12;
    hourValue = 0 ? 12 : hourValue;
    minuteValue = minuteValue < 10 ? '0' + minuteValue : minuteValue;

    hour.textContent = hourValue;
    minute.textContent = minuteValue;
    ampm.textContent = ampmValue;

    let dayValue = dayNames[value.getDay()];
    day.textContent = dayValue;

    let monthValue = monthNames[value.getMonth()];
    month.textContent = monthValue;

    let dateValue = value.getDate();
    date.textContent = dateValue;
})