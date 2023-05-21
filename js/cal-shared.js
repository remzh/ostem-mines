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
      module.create(`<h1>${event.title}</h1><p><span class='p2'>${formatDate(event.start, event.end, event.allDay)}</span></p><hr/><p id='_tmp_cal_eventDesc'></p><hr/><div><button id='_rem-popup-dismiss' class='right'>Done</button></div>`);
      let calEle = document.createElement('add-to-calendar-button');
      calEle.setAttribute('inline', true);
      calEle.setAttribute('timeZone', 'America/Denver');
      calEle.setAttribute('location', event.loc ? event.loc : 'Not Specified')
      calEle.setAttribute('name', event.title);
      calEle.setAttribute('label', 'Add Event to Calendar');
      calEle.setAttribute('description', event.desc);
      calEle.setAttribute('trigger', 'click');
      calEle.setAttribute('startDate', event.start.toISOString().substring(0, 10));
      calEle.setAttribute('options', JSON.stringify(['Google|Google Calendar', 'Microsoft365|Outlook Calendar', 'Apple|Apple Calendar', 'iCal|iCal File']));
      if (event.allDay) {
        calEle.setAttribute('endDate', new Date(event.end - 1).toISOString().substring(0, 10));
      } else {
        calEle.setAttribute('startTime', `${event.start.getHours().toString().padStart(2, '0')}:${event.start.getMinutes().toString().padStart(2, '0')}`);
        calEle.setAttribute('endTime', `${event.end.getHours().toString().padStart(2, '0')}:${event.end.getMinutes().toString().padStart(2, '0')}`);
      }
      document.getElementById('_rem-popup-dismiss').insertAdjacentElement('beforebegin', calEle);
      document.getElementById('_tmp_cal_eventDesc').innerHTML = event.desc ? event.desc : `<i>No description provided.</i>`;
      document.getElementById('_tmp_cal_eventDesc').removeAttribute('id');
    })
    .catch((err) => {
      alert(err.message);
    });
}