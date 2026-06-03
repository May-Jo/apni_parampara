function createLoopingSlider(sliderSelector, containerSelector, cardSelector) {
  const slider = document.querySelector(sliderSelector);
  const container = document.querySelector(containerSelector);
  const cards = Array.from(slider.querySelectorAll(cardSelector));
  const cardCount = cards.length;
  let index = cardCount;
  let isMoving = false;
  let autoSlide;

  cards.forEach((card) => slider.appendChild(card.cloneNode(true)));
  cards
    .slice()
    .reverse()
    .forEach((card) => slider.insertBefore(card.cloneNode(true), slider.firstChild));

  function getStep() {
    const styles = getComputedStyle(slider);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;

    return cards[0].offsetWidth + gap;
  }

  function update(animate = true) {
    slider.style.transition = animate ? "transform 0.6s ease" : "none";
    slider.style.transform = `translateX(-${index * getStep()}px)`;
  }

  function move(direction) {
    if (isMoving) return;

    isMoving = true;
    index += direction;
    update();
  }

  function startAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => move(1), 3500);
  }

  slider.addEventListener("transitionend", () => {
    if (index >= cardCount * 2) index -= cardCount;
    if (index <= 0) index += cardCount;
    update(false);
    isMoving = false;
  });

  container.addEventListener("mouseenter", () => clearInterval(autoSlide));
  container.addEventListener("mouseleave", startAutoSlide);
  window.addEventListener("resize", () => update(false));

  update(false);
  startAutoSlide();

  return {
    left: () => move(-1),
    right: () => move(1),
  };
}

let craftsCarousel, foodCarousel, festivalCarousel;

if (document.querySelector("#craftsSlider")) {
  craftsCarousel = createLoopingSlider(
    "#craftsSlider",
    ".crafts-slider-container",
    ".craft-card"
  );
}

if (document.querySelector("#foodSlider") && !document.querySelector(".state-food-card")) {
  // Only init home food slider if state-food-card is not there (to avoid conflict)
  foodCarousel = createLoopingSlider(
    "#foodSlider",
    ".food-slider-wrapper",
    ".food-card"
  );
}

if (document.querySelector("#festivalSlider")) {
  festivalCarousel = createLoopingSlider(
    "#festivalSlider",
    ".festival-slider-wrapper",
    ".festival-card"
  );
}

function slideRight() {
  if (craftsCarousel) craftsCarousel.right();
}

function slideLeft() {
  if (craftsCarousel) craftsCarousel.left();
}

function foodSlideRight() {
  if (foodCarousel) foodCarousel.right();
}

function foodSlideLeft() {
  if (foodCarousel) foodCarousel.left();
}

function festivalSlideRight() {
  if (festivalCarousel) festivalCarousel.right();
}

function festivalSlideLeft() {
  if (festivalCarousel) festivalCarousel.left();
}
