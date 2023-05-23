let popupSourceEle, popupOpen = false;

function loaded() {
  document.head.insertAdjacentHTML('beforeend', `<link rel='stylesheet' href='css/_rem-popup.css'/>`);
  document.body.insertAdjacentHTML('beforeend', `<div id='_rem-popup-ov' class='hidden'><div id='_rem-popup-ov-inner'></div><div id='_rem-popup-content-outer'><div id='_rem-popup-content'></div><div id='_rem-popup-footer'><button id='_rem-popup-dismiss-int'>Done</button></div></div></div>`);

  document.getElementById('_rem-popup-ov-inner').addEventListener('click', dismiss);
  document.getElementById('_rem-popup-dismiss-int').addEventListener('click', dismiss);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (popupOpen) {
        dismiss();
      }
    }
  });

  let triggers = document.getElementsByClassName('popup-trigger');
  for(let ele of triggers) {
    initTrigger(ele, ele.dataset.target);
  }
}

if (document.readyState !== 'loading') {
  loaded(); 
} else {
  document.addEventListener('DOMContentLoaded', loaded);
}

function initTrigger(ele, target) {
  ele.addEventListener('click', () => {
    let source = document.getElementById(`_popup-${target}`);
    popupSourceEle = source;
    create(source.innerHTML, true);
    source.innerHTML = '';
  });
}

export function create(html, includeDismiss) {
  if (popupOpen) return;
  popupOpen = true;
  document.getElementById('_rem-popup-ov').style.display = 'block';
  document.getElementById('_rem-popup-content').innerHTML = html;
  document.getElementById('_rem-popup-footer').style.display = includeDismiss ? 'flex' : 'none';
  if (document.getElementById('_rem-popup-dismiss')) {
    document.getElementById('_rem-popup-dismiss').addEventListener('click', dismiss);
  }
  setTimeout(() => {
    document.getElementById('_rem-popup-ov').classList.remove('hidden');
    document.getElementById('_rem-popup-content').classList.remove('hidden');
  }, 10);
}

export function dismiss() {
  popupOpen = false;
  document.getElementById('_rem-popup-ov').classList.add('hidden');
  document.getElementById('_rem-popup-content').classList.add('hidden');
  setTimeout(() => {
    document.getElementById('_rem-popup-ov').style.display = 'none';
    if (popupSourceEle) {
      popupSourceEle.innerHTML = document.getElementById('_rem-popup-content').innerHTML;
      popupSourceEle = null;
    }
    document.getElementById('_rem-popup-content').innerHTML = '';
  }, 321);
}