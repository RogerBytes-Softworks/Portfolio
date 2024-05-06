"use strict";

//?-------------  Déclaration des Imports  -----------------//


//*-------------  Déclaration des Variables  ---------------//

const device_type = detect_device_type().toString(),
  bean_box = document.getElementById("beanBox"),
  scroll_bean = document.querySelector('#scrollBean'),
  main_box = document.getElementById("mainBox"),
  main_box_height = main_box.scrollHeight,
  main_box_visible_height = main_box.clientHeight,
  main_box_overflow = main_box.scrollHeight - main_box.clientHeight,
  overflow_quotient = main_box.scrollHeight / main_box_visible_height;


//!-------------  Déclaration des Events  ------------------//

// Écouteur d'événements pour le défilement
main_box.addEventListener('scroll', function() {
  var scrollPosition = main_box.scrollTop;
  var scrollBeanPosition = (scrollPosition / main_box_overflow) * 100;
  scroll_bean.style.top = scrollBeanPosition + '%';
});

// Écouteurs pour les événements 'mousedown' et 'touchstart' sur 'scroll_bean'
scroll_bean.addEventListener('mousedown', function(e) {
  // Empêcher le comportement par défaut de sélection de texte, etc.
  e.preventDefault();
  document.addEventListener('mousemove', moveScrollBean);
  document.addEventListener('mouseup', function() {
    document.removeEventListener('mousemove', moveScrollBean);
  });
});

scroll_bean.addEventListener('touchstart', function(e) {
  e.preventDefault();
  document.addEventListener('touchmove', function(ev) {
    moveScrollBean(ev.touches[0]);
  });
  document.addEventListener('touchend', function() {
    document.removeEventListener('touchmove', moveScrollBean);
  });
});

//!-------------  Instructions  ----------------------------//

document.body.classList.add(device_type.toLowerCase().replace(" ", "-"));
show();

scroll_bean.style.height = `${100 / overflow_quotient}%`;


//?-------------  Déclaration des Fonctions  ---------------//

function detect_device_type() {
  const userAgent = navigator.userAgent;
  if (
    userAgent.match(/Macintosh|Windows|Linux|Gecko/i) &&
    !userAgent.match(/iPhone|iPad|iPod|Windows Phone|Android/i)
  ) {
    return `desktop`;
  } else if (
    userAgent.match(/iPhone|iPad|iPod|Windows Phone|Android|AppleWebKit/i)
  ) {
    return `mobile`;
  } else {
    return `unknown-device`;
  }
}

function show() {
  console.log(`L'overflow dépasse de ${100 / overflow_quotient}% de quotient`);
}

// Fonction pour déplacer 'scroll_bean' et faire défiler 'main_box'
function moveScrollBean(e) {
  var beanBoxRect = bean_box.getBoundingClientRect();
  var newBeanPosition = (e.clientY - beanBoxRect.top) / beanBoxRect.height;
  scroll_bean.style.top = (newBeanPosition * 100) + '%';
  main_box.scrollTop = newBeanPosition * main_box_overflow;
}


//todo----------  TODO  ------------------------------------//

//*-------------  Zone Test  -------------------------------//

//*-------------  Fin  -------------------------------------//
