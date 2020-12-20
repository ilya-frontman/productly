'use strict';

//FOOTER Input mask
const slider = tns({
    "container": '.blog__slider',
    "items": 3,
    "slideBy": 1,
    "startIndex": 0,
    "mouseDrag": true,
    "swipeAngle": false,
    "speed": 400,
    "controls": false,
    "navPosition": 'bottom',
    "navAsThumbnails": true,
    "mouseDrag": true,
    "edgePadding": 0
});

const tel = document.querySelector('.footer__menu__user-input');

const phone_mask = Maska.create(tel, {
  tokens: { '#': { pattern: /[0-9]/ }},
  mask: '+# (###) ### ## ##',
});


// VIDEO PLAYER
const player = new Plyr(document.querySelector('#player'));


//MODAL Video
const open = document.querySelector('.cta__link-video');
const close = document.querySelector('.modal__box__inner-closer');
const modal = document.querySelector('.modal__box');

open.addEventListener('click', (e) => {
  e.preventDefault();
  modal.style.display = 'block';
});

close.addEventListener('click', () => {
  player.pause();
  modal.style.display = 'none';
});

