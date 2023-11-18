let percent = 60;
let counter = 0;
let intervalID = null;
$(document).ready(()=>{
  intervalID = setInterval(updateNumber, 100);
});
// Update the number
function updateNumber() {
  let step = 4;
  if (counter + step >= percent) {
    counter = percent;
     $('#percentage').html(counter + '%');
    clearInterval(intervalID);
    return;
  }
  counter += step;
  $('#percentage').html(counter + '%');
}


