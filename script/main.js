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

scroll_bean.onmousedown = function(event) {
  event.preventDefault(); // Prévenir le comportement par défaut de la sélection
  const rect = bean_box.getBoundingClientRect();

  // Calculer l'offset initial
  let offsetY = event.clientY - scroll_bean.getBoundingClientRect().top;

  // Fonction pour le mouvement de glissement
  function onMouseMove(event) {
    // Calculer la nouvelle coordonnée Y
    let new_top = event.clientY - rect.top - offsetY;

    // Restreindre le mouvement de scrollBean verticalement à l'intérieur de beanBox
    new_top = Math.max(0, Math.min(new_top, rect.height - scroll_bean.offsetHeight - 4));

    // Appliquer la nouvelle position Y sans changer la position X
    scroll_bean.style.top = new_top + 'px';
  }

  // Ajouter les événements pour le mouvement et le relâchement de la souris
  document.addEventListener('mousemove', onMouseMove);
  document.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    scroll_bean.onmouseup = null;
  };
};

scroll_bean.ondragstart = function() {
  return false;
};

//!-------------  Instructions  ----------------------------//

document.body.classList.add(device_type.toLowerCase().replace(" ", "-"));
scroll_bean.style.height = `${100 / overflow_quotient}%`;

setInterval(() => {
  show(scroll_bean_position());
}, 1000 / 3);

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

function show(param) {
  console.log(param);
}

function scroll_bean_position() {
  const bean_box_rect = bean_box.getBoundingClientRect();
  const scroll_bean_rect = scroll_bean.getBoundingClientRect();
  // La position du scrollBean est relative au haut de beanBox
  // Ajustez pour tenir compte de la marge interne ou de l'espace supplémentaire
  const scroll_bean_top = scroll_bean_rect.top - bean_box_rect.top;
  // La hauteur disponible pour le déplacement du scrollBean, ajustée pour les paddings/bordures
  const max_scroll_bean_top = bean_box_rect.height - scroll_bean_rect.height;
  // Ajuster si le scroll_bean_top est négatif
  const normalized_scroll_bean_top = Math.max(0, scroll_bean_top);
  // Calculer la position en pourcentage
  const position_percentage = (normalized_scroll_bean_top / max_scroll_bean_top) * 100;
  // Clamper la valeur entre 0 et 100 pour éviter les dépassements
  return Math.min(Math.max(position_percentage, 0), 100);
}

//todo----------  TODO  ------------------------------------//

//*-------------  Zone Test  -------------------------------//

//*-------------  Fin  -------------------------------------//