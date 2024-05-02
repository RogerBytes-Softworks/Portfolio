"use strict";

//?-------------  Déclaration des Imports  -----------------//



//*-------------  Déclaration des Variables  ---------------//



//!-------------  Déclaration des Events  ------------------//



//!-------------  Instructions  ----------------------------//

const device_type = detect_device_type();
document.body.classList.add(device_type.toLowerCase().replace(' ', '-'));
document.getElementById('device_type').textContent = device_type;

//?-------------  Déclaration des Fonctions  ---------------//

function detect_device_type() {
  const userAgent = navigator.userAgent;

  if (userAgent.match(/iPhone|iPad|iPod|Windows Phone|Android|AppleWebKit/i)) {
    return userAgent;
  } else if (userAgent.match(/Macintosh|Windows|Linux|Gecko/i)) {
    return userAgent;
  } else {
    return userAgent;
  }



  /*   if (userAgent.match(/iPhone|iPad|iPod|Windows Phone|Android|AppleWebKit/i)) {
    return `Mobile Device : ${userAgent}`;
  } else if (userAgent.match(/Macintosh|Windows|Linux|Gecko/i)) {
    return `Desktop Device : ${userAgent}`;
  } else {
    return `Unknown Device : ${userAgent}`;
  } */
}



//todo----------  TODO  ------------------------------------//



//*-------------  Zone Test  -------------------------------//



//*-------------  Fin  -------------------------------------//


