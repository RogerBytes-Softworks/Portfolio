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
  // Calculez la hauteur maximale que 'scroll_bean' peut atteindre sans sortir du parent.
  var maxBeanTop = 100 - (scroll_bean.offsetHeight / bean_box.offsetHeight * 100);
  // Calculez la position de 'scroll_bean' en fonction du défilement actuel, mais ne dépassez pas 'maxBeanTop'.
  var scrollBeanPosition = (scrollPosition / main_box_overflow) * 100;
  // Appliquez un ajustement pour compenser tout débordement de quelques pixels.
  var pixelAdjustment = 1; // Vous pouvez affiner cette valeur selon vos besoins.
  var adjustedBeanPosition = Math.min(scrollBeanPosition, maxBeanTop) - (pixelAdjustment / bean_box.offsetHeight * 100);
  
  scroll_bean.style.top = adjustedBeanPosition + '%';
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
  var newBeanTop = e.clientY - beanBoxRect.top; // Position Y du clic par rapport au haut de 'bean_box'

  // Limitez la position Y pour qu'elle ne soit pas en dehors de 'bean_box'
  newBeanTop = Math.max(0, Math.min(newBeanTop, beanBoxRect.height - scroll_bean.offsetHeight));

  // Convertissez la position Y en pourcentage de la hauteur totale de 'bean_box'
  var newBeanTopPercent = (newBeanTop / beanBoxRect.height) * 100;

  scroll_bean.style.top = newBeanTopPercent + '%';

  // Mettez à jour 'main_box.scrollTop' en fonction de la position de 'scroll_bean'
  var scrollPosition = (newBeanTop / (beanBoxRect.height - scroll_bean.offsetHeight)) * main_box_overflow;
  main_box.scrollTop = scrollPosition;
}


//todo----------  TODO  ------------------------------------//

//*-------------  Zone Test  -------------------------------//

//*-------------  Fin  -------------------------------------//
