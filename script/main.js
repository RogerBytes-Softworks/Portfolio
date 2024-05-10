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

var label_menu = document.getElementById('labelMenu');


//!-------------  Déclaration des Events  ------------------//

const style = document.createElement('style');
document.head.appendChild(style);
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

    scrollToPercentage(main_box, scroll_bean_position())
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

main_box.addEventListener('scroll', function() {
  const scrollPercentage = calculateScrollPercentage(); // Utilisez votre fonction existante
  const movable_height = bean_box.clientHeight - scroll_bean.offsetHeight;
  scroll_bean.style.top = (movable_height * scrollPercentage / 100) + 'px';
});

window.addEventListener('resize', adjustBeanBoxVisibility);

// Exécutez immédiatement la fonction pour mettre en place l'état initial correct
window.dispatchEvent(new Event('resize'));

scroll_bean.addEventListener('touchstart', function(event) {
  event.preventDefault();
  const rect = bean_box.getBoundingClientRect();
  
  // Utilisez le premier contact pour l'offset initial
  const touch = event.touches[0];
  let offsetY = touch.clientY - scroll_bean.getBoundingClientRect().top;
  
  function onTouchMove(event) {
    // Utilisez le premier contact pour la nouvelle position Y
    const touch = event.touches[0];
    let new_top = touch.clientY - rect.top - offsetY;
  
    // Restreindre le mouvement de scroll_bean verticalement à l'intérieur de bean_box
    new_top = Math.max(0, Math.min(new_top, rect.height - scroll_bean.offsetHeight - 4));
  
    // Appliquer la nouvelle position Y sans changer la position X
    scroll_bean.style.top = new_top + 'px';
  
    scrollToPercentage(main_box, scroll_bean_position())
  }
  
  // Ajouter les événements pour le mouvement et le relâchement du doigt
  document.addEventListener('touchmove', onTouchMove);
  document.addEventListener('touchend', function() {
    document.removeEventListener('touchmove', onTouchMove);
  });
}, { passive: false });

// Empêchez le navigateur de réagir à des gestes de défilement/drag sur #scrollBean
scroll_bean.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, { passive: false });

//!-------------  Instructions  ----------------------------//

document.body.classList.add(device_type.toLowerCase().replace(" ", "-"));
scroll_bean.style.height = `${100 / overflow_quotient}%`;
document.addEventListener('DOMContentLoaded', adjustBeanBoxVisibility);

const scrollPercentage = calculateScrollPercentage(); // Calculez le pourcentage de défilement actuel
const movable_height = bean_box.clientHeight - scroll_bean.offsetHeight;
scroll_bean.style.top = (movable_height * scrollPercentage / 100) + 'px';

if (main_box.scrollHeight <= main_box.clientHeight) {
  // S'il n'y a pas d'overflow, cachez bean_box
  bean_box.style.display = 'none';
} else {
  // S'il y a de l'overflow, assurez-vous que bean_box est visible
  bean_box.style.display = 'block';
}

label_menu.textContent = 'Acceuil';



style.sheet.insertRule(`
  #mainBox::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
`, style.sheet.cssRules.length);

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
  // Obtenir la position 'top' de scroll_bean relative à bean_box
  const bean_top = scroll_bean.offsetTop;
  // Calculer la hauteur disponible pour le déplacement de scroll_bean
  // Hauteur totale de bean_box moins la hauteur de scroll_bean
  const movable_height = bean_box.clientHeight - scroll_bean.offsetHeight;
  // Calculer la position en pourcentage
  const position_percentage = (bean_top / movable_height) * 100;
  // Clamper la valeur entre 0 et 100 pour éviter de dépasser les limites
  return Math.min(Math.max(position_percentage, 0), 100);
}

function calculateScrollPercentage() {
  const scrollTop = main_box.scrollTop;
  const scrollHeight = main_box.scrollHeight;
  const clientHeight = main_box.clientHeight;
  
  // Le pourcentage de défilement est le rapport entre ce qui a déjà défilé et ce qui est défilable
  const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

  return scrollPercentage.toFixed(2); // Arrondi à deux décimales pour la propreté
}

function scrollToPercentage(mainBox, percentage) {
  const maxScrollTop = mainBox.scrollHeight - mainBox.clientHeight; // Max scrollTop value
  const scrollTop = (percentage / 100) * maxScrollTop; // Calcul de la position de défilement en pixels
  mainBox.scrollTop = scrollTop; // Fait défiler mainBox à la position calculée
}

function adjustBeanBoxVisibility() {
  const has_overflow = main_box.scrollHeight > main_box.clientHeight;
  const is_portrait = window.innerHeight > window.innerWidth;

  // Mettre à jour l'affichage de bean_box
  if (has_overflow && !is_portrait) {
    bean_box.style.display = 'block';
  } else {
    bean_box.style.display = 'none';
  }

  // Mettre à jour la visibilité de la barre de défilement native de mainBox
  if (is_portrait) {
    // En mode portrait, affichez la barre de défilement native
    style.sheet.insertRule(`
      #mainBox::-webkit-scrollbar {
        width: 5px;
        height: 5px;
      }
    `, style.sheet.cssRules.length);
  } else {
    // En mode paysage, cachez la barre de défilement native
    style.sheet.insertRule(`
      #mainBox::-webkit-scrollbar {
        width: 0px;
        height: 0px;
      }
    `, style.sheet.cssRules.length);
  }
}

//todo----------  TODO  ------------------------------------//

//*-------------  Zone Test  -------------------------------//

//*-------------  Fin  -------------------------------------//