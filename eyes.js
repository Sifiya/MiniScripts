let eyes = document.querySelectorAll('.eye');

Rx.Observable.fromEvent(document, 'mousemove').subscribe(moveSheen);

function moveSheen(event) {
  let x = event.pageX;
  let y = event.pageY;

  eyes.forEach(function(eye) {
    let pupil = eye.querySelector('.sheen');
    let offsets = pupil.getBoundingClientRect();

    if (eye.offsetLeft <= x &&
        (eye.offsetLeft + eye.offsetWidth) >= x &&
        eye.offsetTop <= y &&
        (eye.offsetTop + eye.offsetHeight) >= y) {

    let pupilX = x - eye.offsetLeft - (pupil.clientWidth / 2);
    let pupilY = y - eye.offsetTop - (pupil.clientHeight / 2);

    pupilX = Math.max(0, pupilX);
    pupilY = Math.max(0, pupilY);

    pupilX = Math.min(eye.clientWidth - pupil.clientWidth, pupilX);
    pupilY = Math.min(eye.clientHeight - pupil.clientHeight, pupilY);

    pupil.style.top = pupilY + "px";
    pupil.style.left = pupilX + "px";
    eye.style.webkitTransform = "rotate(0deg)";

    } else {
      pupil.style.top = 7 + "px";
      pupil.style.left = 16 + "px";

      let a = x - (offsets.left + (pupil.clientWidth / 2));
      let c = y - (offsets.top + (pupil.clientHeight / 2));
      let b = Math.sqrt((a * a) + (c * c));

      let rad = Math.acos(((a * a) + (b * b) - (c * c))/(2 * a * b));
      let deg = rad * 180 / Math.PI;
      //console.log(`Deg: ${deg}`);

      if (c < 0) {
        deg = -deg;
      }

      eye.style.webkitTransform = "rotate(" + deg + "deg)";
    }
  });
}
