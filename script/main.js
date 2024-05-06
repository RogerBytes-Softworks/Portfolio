"use strict";

//?-------------  Déclaration des Imports  -----------------//


//*-------------  Déclaration des Variables  ---------------//

const device_type = detect_device_type().toString(),
  bean_box = document.getElementById("beanBox"),
  scroll_bean = document.getElementById("scrollBean"),
  main_box = document.getElementById("mainBox"),
  main_box_height = main_box.scrollHeight,
  main_box_visible_height = main_box.clientHeight,
  main_box_overflow = main_box.scrollHeight - main_box.clientHeight,
  overflowQuotient = main_box_overflow / main_box_visible_height;

//!-------------  Déclaration des Events  ------------------//

//!-------------  Instructions  ----------------------------//

document.body.classList.add(device_type.toLowerCase().replace(" ", "-"));
show();

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
  console.log(main_box.scrollHeight);
  console.log(main_box.clientHeight);
  console.log(main_box.scrollHeight - main_box.clientHeight);
}

//todo----------  TODO  ------------------------------------//

//*-------------  Zone Test  -------------------------------//

//*-------------  Fin  -------------------------------------//
