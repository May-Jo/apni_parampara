const craftsSlider = document.getElementById("craftsSlider");
let scrollAmount = 0;

function slideRight() {
  scrollAmount += 325;
  craftsSlider.style.transform = `translateX(-${scrollAmount}px)`;
}

function slideLeft() {
  scrollAmount -= 325;
  if (scrollAmount < 0) scrollAmount = 0;
  craftsSlider.style.transform = `translateX(-${scrollAmount}px)`;
}


const foodSlider = document.getElementById("foodSlider");
const cards = document.querySelectorAll(".food-card");

let index = 1;
const cardWidth = cards[0].offsetWidth + 25;

/* Clone first & last cards */
const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);

foodSlider.appendChild(firstClone);
foodSlider.insertBefore(lastClone, cards[0]);

foodSlider.style.transform = `translateX(-${cardWidth * index}px)`;

/* Buttons */
function foodSlideRight() {
  if (index >= cards.length + 1) return;
  index++;
  foodSlider.style.transition = "transform 0.6s ease";
  foodSlider.style.transform = `translateX(-${cardWidth * index}px)`;
}

function foodSlideLeft() {
  if (index <= 0) return;
  index--;
  foodSlider.style.transition = "transform 0.6s ease";
  foodSlider.style.transform = `translateX(-${cardWidth * index}px)`;
}

/* Loop fix */
foodSlider.addEventListener("transitionend", () => {
  const allCards = document.querySelectorAll(".food-card");

  if (allCards[index].isEqualNode(firstClone)) {
    foodSlider.style.transition = "none";
    index = 1;
    foodSlider.style.transform = `translateX(-${cardWidth * index}px)`;
  }

  if (allCards[index].isEqualNode(lastClone)) {
    foodSlider.style.transition = "none";
    index = cards.length;
    foodSlider.style.transform = `translateX(-${cardWidth * index}px)`;
  }
});

/* Auto slide (looping) */
setInterval(foodSlideRight, 3500);
