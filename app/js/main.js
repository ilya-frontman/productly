'use strict';

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

// footer input mask
const tel = document.querySelector('.footer__menu__user-input');

const phone_mask = Maska.create(tel, {
  tokens: { '#': { pattern: /[0-9]/ }},
  mask: '+# (###) ### ## ##',
});