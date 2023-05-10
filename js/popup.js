document.addEventListener('DOMContentLoaded', () => {
  document.head.insertAdjacentHTML('beforeend', `<link rel='stylesheet' href='css/_rem-popup.css'/>`);
  document.body.insertAdjacentHTML('beforeend', `<div id='_rem-popup-ov' class='hidden'><div id='_rem-popup-ov-inner'></div><div id='_rem-popup-content'></div></div>`);
  document.getElementById('_rem-popup-ov-inner').addEventListener('click', dismiss);
});

export function create(html) {
  document.getElementById('_rem-popup-ov').classList.remove('hidden');
  document.getElementById('_rem-popup-content').classList.remove('hidden');
  document.getElementById('_rem-popup-content').innerHTML = html;
}

export function dismiss() {
  document.getElementById('_rem-popup-ov').classList.add('hidden');
  document.getElementById('_rem-popup-content').classList.add('hidden');
}