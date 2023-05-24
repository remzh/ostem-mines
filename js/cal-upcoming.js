import { formatDate, colorMap, showEvent } from './cal-shared.js';

let _eventArray;

function getIcons(event) {
  let out = '';
  let desc = event.desc.toLowerCase().replaceAll(' ', '');
  if (desc.indexOf('freefood') !== -1) {
    out += `<span title='Free Food (RSVP may be required)' class='icon-event material-symbols-rounded right'>restaurant</span>`;
  } if (desc.indexOf('rsvponly') !== -1 || desc.indexOf('applicationrequired') !== -1) {
    out += `<span title='RSVP / Application Required' class='icon-event material-symbols-rounded right'>confirmation_number</span>`;
  }

  return out;
}

function handleEleClick(ind) {
  showEvent(_eventArray[ind]);
}

function buildEventHTML(eventInfo) {
  return `
  ${eventInfo.map((r, i) => {
    let cm = colorMap(r.color);
    return `<div class='landing-event' tabindex='0' data-eventind='${i}'>
    <div class='landing-event-bg' style='background: ${cm.css}'></div>
    <p class='p2'>${r.title} ${cm.icon?`<span class='icon-event material-symbols-rounded right' title='${cm.name}'>${cm.icon}</span>`:''}${getIcons(r)}</p>
    <p><span>${formatDate(new Date(r.start), new Date(r.end), r.allDay, 1)}</span> <span class='right'>${r.loc}</span></p>
  </div>`;
  }).join('')}`;
}

export async function loadCal () {
  let allEventInfo = await fetch('https://script.google.com/macros/s/AKfycbwgJlfDVGs_8gIzpW6Qy0umvs3xe42jazp2uASmbM1cvYmeG1et69Ak3pulqAb4zf7u/exec').then(r => r.json()).catch(r => {
    document.getElementById('div-events-inner').html = `<p><span class='icon-spin material-symbols-rounded'>cached</span> Loading upcoming events...</p>`;
    return;
  });

  let eventInfo = allEventInfo.filter(r => colorMap(r.color).name !== 'Recurring Meeting').slice(0, 3);
  let meetingInfo = allEventInfo.filter(r => colorMap(r.color).name === 'Recurring Meeting').slice(0, 2);

  _eventArray = [...eventInfo, ...meetingInfo];

  document.getElementById('div-events-inner').innerHTML = buildEventHTML(eventInfo);
  document.getElementById('div-events-recur-inner').innerHTML = buildEventHTML(meetingInfo);
  let eventItems = document.getElementsByClassName('landing-event');
  for (let i = 0; i < eventItems.length; i++) {
    let ele = eventItems[i];
    ele.addEventListener('click', () => handleEleClick(i));
  }
}