"use strict";

//?-------------  Déclaration des Imports  -----------------//



//*-------------  Déclaration des Variables  ---------------//



//!-------------  Déclaration des Events  ------------------//



//!-------------  Instructions  ----------------------------//

const deviceType = detectDeviceType();
document.getElementById('deviceType').textContent = deviceType;

//?-------------  Déclaration des Fonctions  ---------------//

function detectDeviceType() {
  const userAgent = navigator.userAgent;

  if (userAgent.match(/Android/i)) {
    return 'Android';
  } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
    return 'iOS';
  } else if (userAgent.match(/Windows Phone/i)) {
    return 'Windows Phone';
  } else if (userAgent.match(/Macintosh/i)) {
    return 'Mac';
  } else if (userAgent.match(/Windows/i)) {
    return 'Windows';
  } else if (userAgent.match(/Linux/i)) {
    return 'Linux';
  } else {
    return 'Autre';
  }
}



//todo----------  TODO  ------------------------------------//



//*-------------  Zone Test  -------------------------------//



//*-------------  Fin  -------------------------------------//


