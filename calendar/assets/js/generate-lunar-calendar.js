import format from 'date-fns/format';

import {convertLunar2Solar} from 'amlich'; 
/* 
  functions:
  - convertLunar2Solar(lunarDay, lunarMonth, lunarYear, lunarLeap, timeZone)
*/

/*
BEGIN:VCALENDAR
PRODID:-//Google Inc//Google Calendar 70.9054//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Lunar
X-WR-TIMEZONE:Asia/Saigon
X-WR-CALDESC:Lunar Calendar
*/

const TIME_ZONE = 7; // Vietnam

const begin = `BEGIN:VCALENDAR
PRODID:-//Google Inc//Google Calendar 70.9054//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Lunar
X-WR-TIMEZONE:Asia/Saigon
X-WR-CALDESC:Lunar Calendar
`;

const end = `END:VCALENDAR`;

const generateEvent = data => {
  const date = new Date(data.start[2], data.start[1] - 1, data.start[0]);

  return (`BEGIN:VEVENT
DTSTART;VALUE=DATE:${format(date, 'YYYYMMDD')}
DTEND;VALUE=DATE:${format(date, 'YYYYMMDD')}
DTSTAMP:${format(date, 'YYYYMMDDTHHMMSS')}Z
UID:${format(date, 'YYYYMMDDTHHMMSS')}Z@google.com
CREATED:${format(date, 'YYYYMMDDTHHMMSS')}Z
DESCRIPTION:
LAST-MODIFIED:${format(date, 'YYYYMMDDTHHMMSS')}Z
LOCATION:
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:${data.summary}
TRANSP:TRANSPARENT
END:VEVENT
`);
}

const generateMonthlyEvents = () => {
  let startYear = 2017;
  const endYear = 2017;
  const dates = [];

  while (startYear <= endYear) {
    let startMonth = 1;
    const endMonth = 12;

    while (startMonth <= endMonth) {
      dates.push(generateEvent({
        start: convertLunar2Solar(1, startMonth, startYear, 0, TIME_ZONE),
        summary: `New Mooon /${startMonth}`
      }));

      dates.push(generateEvent({
        start: convertLunar2Solar(15, startMonth, startYear, 0, TIME_ZONE),
        summary: `Full moon /${startMonth}`
      }));
      
      startMonth++;
    }

    startYear++;
  }

  return dates;
}

const generate = () => {
  const dates = generateMonthlyEvents();

  return `${begin}${dates.join('')}${end}`;
}

export default generate;