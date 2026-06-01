const festivalSlider = document.getElementById("festivalSlider");
const festivalCards = document.querySelectorAll(".festival-card");

let festivalIndex = 1;
const festivalGap = 25;
const festivalCardWidth = festivalCards[0].offsetWidth + festivalGap;

/* Clone first & last */
const festivalFirstClone = festivalCards[0].cloneNode(true);
const festivalLastClone = festivalCards[festivalCards.length - 1].cloneNode(true);

festivalSlider.appendChild(festivalFirstClone);
festivalSlider.insertBefore(festivalLastClone, festivalCards[0]);

festivalSlider.style.transform =
  `translateX(-${festivalCardWidth * festivalIndex}px)`;

/* Navigation */
function festivalSlideRight() {
  festivalIndex++;
  festivalSlider.style.transition = "transform 0.6s ease";
  festivalSlider.style.transform =
    `translateX(-${festivalCardWidth * festivalIndex}px)`;
}

function festivalSlideLeft() {
  festivalIndex--;
  festivalSlider.style.transition = "transform 0.6s ease";
  festivalSlider.style.transform =
    `translateX(-${festivalCardWidth * festivalIndex}px)`;
}

/* Loop fix */
festivalSlider.addEventListener("transitionend", () => {
  const allFestivalCards = document.querySelectorAll(".festival-card");

  if (allFestivalCards[festivalIndex].isEqualNode(festivalFirstClone)) {
    festivalSlider.style.transition = "none";
    festivalIndex = 1;
    festivalSlider.style.transform =
      `translateX(-${festivalCardWidth * festivalIndex}px)`;
  }

  if (allFestivalCards[festivalIndex].isEqualNode(festivalLastClone)) {
    festivalSlider.style.transition = "none";
    festivalIndex = festivalCards.length;
    festivalSlider.style.transform =
      `translateX(-${festivalCardWidth * festivalIndex}px)`;
  }
});

/* Auto loop */
setInterval(festivalSlideRight, 3500);
