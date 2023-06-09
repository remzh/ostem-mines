import { atcb_action } from './add-to-calendar.js';

function formatDesc(input) {
  return input.replace(/<a.*?>/g, '[url]').replace(/<\/a>/g, '[/url]').replace(/<.+?>/g, s => `{${s.slice(1, s.length-1)}}`) + `[br][br][i](This event does not sync with the official oSTEM@Mines calendar. Visit the [url]https://go.itsrem.org/ostem/hub|oSTEM Hub[/url] for the latest information.)[/i]`;
}

export function colorMap(n) {
  switch (parseInt(n)) {
    case 7: 
      return {
        name: 'Recurring Meeting',
        icon: 'event_repeat',
        css: 'var(--color-meeting)'
      }
    case 4: 
      return {
        name: 'Booth',
        icon: 'storefront',
        css: 'var(--color-booth)'
      }
    case 2: 
      return {
        name: 'Big Event',
        icon: 'award_star',
        css: 'var(--color-event)'
      }
    default: 
      return {
        name: 'Significant Dates',
        css: 'var(--color-misc)'
      }
  }
}

export function formatDate(start, end, allDay, shortForm=false) {
  if (allDay) {
    return new Intl.DateTimeFormat(!1, {weekday: 'short', month: shortForm ? 'short':'long', day: 'numeric'}).formatRange(start, end - 1);
  } else {
    let time = new Intl.DateTimeFormat(false, {timeStyle: 'short'});
    return `${new Intl.DateTimeFormat(false, {dateStyle: shortForm ? 'medium' : 'full'}).format(start)} \u2022 ${time.format(start)} - ${time.format(end)}`;
  }
}

export function showEvent(event) {
  if (typeof event.start === 'string') event.start = new Date(event.start);
  if (typeof event.end === 'string') event.end = new Date(event.end);
  import('/js/popup.js')
    .then((module) => {
      let cm = colorMap(event.color);
      let tags = `<div class='_popup-cal-tag' style='background: ${cm.css}'>${cm.icon ? `<span class='material-symbols-rounded'>${cm.icon}</span>`:''}${cm.name}</div>`;
      if (event.loc) tags += `<div class='_popup-cal-tag' style='background: var(--var-accent-color)'><span class='material-symbols-rounded'>pin_drop</span> ${event.loc}</div>`;
      module.create(`<h1>${event.title}</h1><p><span class='p2'>${formatDate(event.start, event.end, event.allDay)}</span></p>${tags}<hr/><p id='_tmp_cal_eventDesc'></p><div><button id='_rem-popup-dismiss' class='right'>Done</button><button id='_rem-popup-addToCal' class='_rem-popup-action'><span class='material-symbols-rounded' style='vertical-align: text-top'>calendar_add_on</span> Add Event to Calendar</button></div>`);

      let calConfig = {
        timeZone: 'America/Denver',
        name: event.title,
        description: formatDesc(event.desc),
        startDate: event.start.toISOString().substring(0, 10),
        options: ['Google|Google Calendar', 'Microsoft365|Outlook Calendar', 'Apple|Apple Calendar', 'iCal|iCal File']
      };

      if (event.allDay) {
        calConfig.endDate = new Date(event.end - 1).toISOString().substring(0, 10);
      } else {
        calConfig.startTime = `${event.start.getHours().toString().padStart(2, '0')}:${event.start.getMinutes().toString().padStart(2, '0')}`;
        calConfig.endTime = `${event.end.getHours().toString().padStart(2, '0')}:${event.end.getMinutes().toString().padStart(2, '0')}`;
      }

      let calBtn = document.getElementById('_rem-popup-addToCal');
      calBtn.addEventListener('click', () => atcb_action(calConfig, calBtn));

      // document.getElementById('_rem-popup-dismiss').insertAdjacentElement('beforebegin', calEle);
      document.getElementById('_tmp_cal_eventDesc').innerHTML = event.desc ? event.desc : `<i>No description provided.</i>`;
      document.getElementById('_tmp_cal_eventDesc').removeAttribute('id');
    })
    .catch((err) => {
      throw err;
    });
}