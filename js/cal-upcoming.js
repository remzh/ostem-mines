import { formatDate, colorMap, showEvent } from './cal-shared.js';

let _eventArray;

function getIcons(event) {
  let out = '';
  let desc = event.desc.toLowerCase().replaceAll(' ', '');
  if (desc.indexOf('freefood') !== -1) {
    out += `<span title='Free food (RSVP may be required)' class='icon-event material-symbols-rounded right'>restaurant</span>`;
  }

  return out;
}

function handleEleClick(ind) {
  console.log(_eventArray[ind]);
  showEvent(_eventArray[ind]);
}

export async function loadCal () {
  let eventInfo = await fetch('https://script.google.com/macros/s/AKfycbwgJlfDVGs_8gIzpW6Qy0umvs3xe42jazp2uASmbM1cvYmeG1et69Ak3pulqAb4zf7u/exec').then(r => r.json()).catch(r => {
    document.getElementById('div-events-inner').html = `<p><span class='icon-spin material-symbols-rounded'>cached</span> Loading upcoming events...</p>`;
    return;
  });

  console.log(eventInfo);

  eventInfo = eventInfo.slice(0, 3);
  _eventArray = eventInfo;

  document.getElementById('div-events-inner').innerHTML = `
    ${eventInfo.map((r, i) => {
      let cm = colorMap(r.color);
      return `<div class='landing-event' tabindex='0' data-eventind='${i}'>
      <div class='landing-event-bg' style='background: ${cm.css}'></div>
      <p class='p2'>${r.title} ${cm.icon?`<span class='icon-event material-symbols-rounded right'>${cm.icon}</span>`:''}${getIcons(r)}</p>
      <p><span>${formatDate(new Date(r.start), new Date(r.end), r.allDay, 1)}</span> <span class='right'>${r.loc}</span></p>
    </div>`;
    }).join('')}`;
  let eventItems = document.getElementsByClassName('landing-event');
  for (let i = 0; i < eventItems.length; i++) {
    let ele = eventItems[i];
    ele.addEventListener('click', () => handleEleClick(i));
  }
}