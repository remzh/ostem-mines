import { showEvent } from './cal-shared.js';

document.addEventListener('DOMContentLoaded', async function() {
  let eventInfo = await fetch('https://script.google.com/macros/s/AKfycbwgJlfDVGs_8gIzpW6Qy0umvs3xe42jazp2uASmbM1cvYmeG1et69Ak3pulqAb4zf7u/exec').then(r => r.json());

  document.getElementById('div-loading').style.display = 'none';
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
      // alert('Event: ' + info.event.title);
      // alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
      // alert('View: ' + info.view.type);
      console.log(info);
      showEvent(info.event);
  
      // info.el.style.borderColor = 'red';
    }  
  });
  calendar.render();
});