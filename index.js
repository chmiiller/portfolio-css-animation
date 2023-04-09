const track = document.getElementById('image-track');
const images = track.getElementsByClassName("image");
let nextPercentage = 0;

window.onmousedown = e => {
  track.dataset.mouseDownAt = e.clientX;
  track.style.cursor = 'grabbing';
}

window.onmousemove = e => {
  if (track.dataset.mouseDownAt == '0') return;

  const delta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / 1;
  const percentage = (delta / maxDelta) * 100;
  nextPercentage = parseFloat(track.dataset.mouseUpPercent) + percentage;
  if (nextPercentage >= 110) nextPercentage = 110;
  if (nextPercentage <= -10) nextPercentage = -10;
  track.animate({
    transform: `translate(${-nextPercentage}%, -50%)`
  },{
    duration: 1000,
    fill: "forwards"
  })
  for (const image of images) {
    image.style.objectPosition = `${100 + nextPercentage}% center`;
  }
}

window.onmouseup = e => {
  track.dataset.mouseDownAt = '0';
  track.dataset.mouseUpPercent = nextPercentage;
  track.style.cursor = 'grab';
}