let currentIndex = 0;

const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

/* Move slider */
function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

/* Next button */
function nextSlide() {
  currentIndex++;
  if (currentIndex >= totalSlides) {
    currentIndex = 0; // loop back
  }
  updateSlider();
}

/* Previous button */
function prevSlide() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = totalSlides - 1; // loop to last
  }
  updateSlider();
}

/* Auto slide (optional – remove if not needed) */
let autoSlide = setInterval(nextSlide, 4000);

/* Pause auto slide on hover */
const sliderContainer = document.querySelector(".slider-container");

sliderContainer.addEventListener("mouseenter", () => {
  clearInterval(autoSlide);
});

sliderContainer.addEventListener("mouseleave", () => {
  autoSlide = setInterval(nextSlide, 4000);
});
