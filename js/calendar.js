import { showEvent } from './cal-shared.js';
import { atcb_action } from './add-to-calendar.js';

document.addEventListener('DOMContentLoaded', async function() {
  let eventInfo = await fetch('https://script.google.com/macros/s/AKfycbwgJlfDVGs_8gIzpW6Qy0umvs3xe42jazp2uASmbM1cvYmeG1et69Ak3pulqAb4zf7u/exec').then(r => r.json());

  document.getElementsByClassName('div-loading')[0].style.display = 'none';
  var calendarEl = document.getElementById('div-calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'listMonth',
    events: eventInfo,
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'listMonth,dayGridMonth'
    },
    eventClick: function(info) {
      console.log(info);
      let {title, start, end, allDay} = info.event;
      let {desc, loc} = info.event.extendedProps;
      showEvent({
        title, 
        start,
        end,
        desc,
        loc,
        allDay
      });
    }  
  });

  
  const config = {
    name: 'oSTEM Event Calendar',
    startDate: '2023-01-01',
    startTime: '00:00',
    endTime: '23:30',
    options: ['Google|Google Calendar', 'Microsoft365|Outlook Calendar', 'Apple|Apple Calendar', 'iCal|Download WebCal Link'],
    icsFile: 'https://calendar.google.com/calendar/ical/4a934d37b3d3056af90cfa22794034b454fc4dc26d2a9ce6214ab15579b81a19%40group.calendar.google.com/public/basic.ics',
    subscribe: true,
    timeZone: 'America/Denver'
  };
  const button = document.getElementById('btn-calendar-sub');
  if (button) {
    button.addEventListener('click', () => atcb_action(config, button));
  }

  calendar.render();
});