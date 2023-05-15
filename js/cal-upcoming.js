import { formatDate } from './cal-shared.js';

export async function loadCal () {
  let eventInfo = await fetch('https://script.google.com/macros/s/AKfycbwgJlfDVGs_8gIzpW6Qy0umvs3xe42jazp2uASmbM1cvYmeG1et69Ak3pulqAb4zf7u/exec').then(r => r.json()).catch(r => {
    document.getElementById('div-events-inner').html = `<p><span class='icon-spin material-symbols-rounded'>cached</span> Loading upcoming events...</p>`;
    return;
  });

  console.log(eventInfo);

  eventInfo = eventInfo.slice(0, 3);

  /*
  <p>Next Event</p>
    <div>
      <p class='p2'>Community Check-In <span class='icon-event material-symbols-rounded right'>calendar_add_on</span><span class='icon-event material-symbols-rounded right'>restaurant</span></p>
      <p><span>Wed 9/6, 7:00 - 9:15 pm</span> <span class='right'>BB W250</span></p>
    </div>
    <p>Next Recurring Meeting</p>
    <div>
      <p class='p2'>General Meeting <span class='icon-event material-symbols-rounded right'>calendar_add_on</span></p>
      <p><span>Wed 9/6, 5:00 - 6:15 pm</span> <span class='right'>BB W250</span></p>
    </div>
    */

  document.getElementById('div-events-inner').innerHTML = `
    ${eventInfo.map(r => `<div>
      <p class='p2'>${r.title} <span class='icon-event material-symbols-rounded right'>calendar_add_on</span><span class='icon-event material-symbols-rounded right'>restaurant</span></p>
      <p><span>${formatDate(new Date(r.start), new Date(r.end), r.allDay, 1)}</span> <span class='right'>${r.loc}</span></p>
    </div>`).join('')}
    `;
  // render(html`<${App} name="World" />`, document.getElementById('div-events-inner'));
}

// document.addEventListener('DOMContentLoaded', () => {
// });