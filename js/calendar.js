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

function formatDate(start, end, allDay) {
  console.log(start, end);
  if (allDay) {
    return new Intl.DateTimeFormat(!1, {weekday: 'short', month: 'long', day: 'numeric'}).formatRange(start, end - 1);
  } else {
    let time = new Intl.DateTimeFormat(false, {timeStyle: 'short'});
    return `${new Intl.DateTimeFormat(false, {dateStyle: 'full'}).format(start)} \u2022 ${time.format(start)} - ${time.format(end)}`;
  }
}

function showEvent(event) {
  import('/js/popup.js')
    .then((module) => {
      module.create(`<h1>${event.title}</h1><p><span class='p2'>${formatDate(event.start, event.end, event.allDay)}</span></p><hr/><p id='_tmp_cal_eventDesc'></p>`);
      document.getElementById('_tmp_cal_eventDesc').innerHTML = event.extendedProps.desc ? event.extendedProps.desc : `<i>No description provided.</i>`;
      document.getElementById('_tmp_cal_eventDesc').removeAttribute('id');
    })
    .catch((err) => {
      alert(err.message);
    });
}