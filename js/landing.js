import { create, dismiss } from '../js/popup.js';
import { loadCal } from './cal-upcoming.js';

function loaded() {
  loadCal();
}

if (document.readyState !== 'loading') {
  loaded(); 
} else {
  document.addEventListener('DOMContentLoaded', loaded);
}

// console.log(create);