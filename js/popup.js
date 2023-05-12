document.addEventListener('DOMContentLoaded', () => {
  document.head.insertAdjacentHTML('beforeend', `<link rel='stylesheet' href='css/_rem-popup.css'/>`);
  document.body.insertAdjacentHTML('beforeend', `<div id='_rem-popup-ov' class='hidden'><div id='_rem-popup-ov-inner'></div><div id='_rem-popup-content'></div></div>`);
  document.getElementById('_rem-popup-ov-inner').addEventListener('click', dismiss);
});

export function create(html) {
  document.getElementById('_rem-popup-ov').style.display = 'block';
  document.getElementById('_rem-popup-content').innerHTML = html;
  setTimeout(() => {
    document.getElementById('_rem-popup-ov').classList.remove('hidden');
    document.getElementById('_rem-popup-content').classList.remove('hidden');
  }, 10);
}

export function dismiss() {
  document.getElementById('_rem-popup-ov').classList.add('hidden');
  document.getElementById('_rem-popup-content').classList.add('hidden');
  setTimeout(() => {
    document.getElementById('_rem-popup-ov').style.display = 'none';
  }, 321);
}