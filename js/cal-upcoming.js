import { formatDate } from './cal-shared.js';

function getIcons(event) {
  let out = '';
  let desc = event.desc.toLowerCase().replaceAll(' ', '');
  if (desc.indexOf('freefood') !== -1) {
    out += `<span title='Free food (RSVP may be required)' class='icon-event material-symbols-rounded right'>restaurant</span>`;
  }

  return out;
}

export async function loadCal () {
  let eventInfo = await fetch('https://script.google.com/macros/s/AKfycbwgJlfDVGs_8gIzpW6Qy0umvs3xe42jazp2uASmbM1cvYmeG1et69Ak3pulqAb4zf7u/exec').then(r => r.json()).catch(r => {
    document.getElementById('div-events-inner').html = `<p><span class='icon-spin material-symbols-rounded'>cached</span> Loading upcoming events...</p>`;
    return;
  });

  console.log(eventInfo);

  eventInfo = eventInfo.slice(0, 3);
  document.getElementById('div-events-inner').innerHTML = `
    ${eventInfo.map(r => `<div>
      <p class='p2'>${r.title} <span class='icon-event material-symbols-rounded right'>calendar_add_on</span>${getIcons(r)}</p>
      <p><span>${formatDate(new Date(r.start), new Date(r.end), r.allDay, 1)}</span> <span class='right'>${r.loc}</span></p>
    </div>`).join('')}
    `;
}