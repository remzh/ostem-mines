export function formatDate(start, end, allDay, shortForm=false) {
  console.log(start, end);
  if (allDay) {
    return new Intl.DateTimeFormat(!1, {weekday: 'short', month: shortForm ? 'short':'long', day: 'numeric'}).formatRange(start, end - 1);
  } else {
    let time = new Intl.DateTimeFormat(false, {timeStyle: 'short'});
    return `${new Intl.DateTimeFormat(false, {dateStyle: shortForm ? 'medium' : 'full'}).format(start)} \u2022 ${time.format(start)} - ${time.format(end)}`;
  }
}

export function showEvent(event) {
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