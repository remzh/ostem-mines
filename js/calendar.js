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
    }
  });
  calendar.render();
});