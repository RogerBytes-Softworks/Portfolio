"use strict";

//?-------------  Déclaration des Imports  -----------------//


//*-------------  Déclaration des Variables  ---------------//

const device_type = detect_device_type().toString(),
  scroll_div = document.getElementById('beanBox'),
  scrollB_button = document.getElementById('scrollBean');

//!-------------  Déclaration des Events  ------------------//


//!-------------  Instructions  ----------------------------//

document.body.classList.add(device_type.toLowerCase().replace(' ', '-'));

//?-------------  Déclaration des Fonctions  ---------------//

function detect_device_type() {
  const userAgent = navigator.userAgent;
  if (userAgent.match(/Macintosh|Windows|Linux|Gecko/i) && !userAgent.match(/iPhone|iPad|iPod|Windows Phone|Android/i)) {
    return `desktop`;
  } else if (userAgent.match(/iPhone|iPad|iPod|Windows Phone|Android|AppleWebKit/i)) {
    return `mobile`;
  } else {
    return `unknown-device`;
  }
}


//todo----------  TODO  ------------------------------------//



//*-------------  Zone Test  -------------------------------//



//*-------------  Fin  -------------------------------------//



