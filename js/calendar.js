function createCalendar(id, date) {
    var calendarElement = document.getElementById(id);

    if (typeof(date) !== 'undefined') {
        date = date.split('-');
        date[1] = date[1] - 1;
        date = new Date(date[0], date[1], date[2]);
    } else {
        date = new Date();
    }

    var currentYear = date.getFullYear();
    var currentMonth = date.getMonth() + 1;
    var currentDate = date.getDate();

    date.setDate(1);
    var currentDay = date.getDay();

    var lastDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0)
        lastDate[1] = 29;

    var currentLastDate = lastDate[currentMonth - 1];
    var week = Math.ceil((currentDay + currentLastDate) / 7);

    var calendarHTML = '';
    calendarHTML += '<div id="header">';
    calendarHTML += '<span id="date" class="lang lang-ko">' + currentMonth + '<font>월</font></span>';
    calendarHTML += '<span id="date" class="lang lang-th">ตุลาคม</span>';
    calendarHTML += '<span id="date" class="lang lang-en">October</span>';
    calendarHTML += '</div>';
    calendarHTML += '<table border="0" cellspacing="0" cellpadding="0">';
    calendarHTML += '<tbody>';

    var dateNum = 1 - currentDay;

    for (var i = 0; i < week; i++) {
        calendarHTML += '<tr>';
        for (var j = 0; j < 7; j++, dateNum++) {
            if (dateNum < 1 || dateNum > currentLastDate) {
                calendarHTML += '<td> </td>';
                continue;
            }
            var cellClass = '';
            if (j === 0) cellClass = 'sunday'; // 일요일
            if (dateNum === currentDate) cellClass += ' today'; // 오늘 날짜 강조

            calendarHTML += `<td class="${cellClass}">${dateNum}</td>`;
        }
        calendarHTML += '</tr>';
    }
    calendarHTML += '</tbody>';
    calendarHTML += '</table>';

    calendarElement.innerHTML = calendarHTML;
}

document.addEventListener("DOMContentLoaded", function() {
    createCalendar('calendar', '2024-10-06');
});
