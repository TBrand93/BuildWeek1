document.addEventListener("DOMContentLoaded", function () {
  const stars = document.querySelectorAll(".star");

  stars.forEach((star, starIndex) => {
    star.addEventListener("mouseover", function () {
      highlightStars(starIndex);
    });

    star.addEventListener("click", function () {
      markStars(starIndex);
    });
  });

  function highlightStars(starIndex) {
    stars.forEach((star, j) => {
      if (j <= starIndex) {
        star.classList.add("hovered");
      } else {
        star.classList.remove("hovered");
      }
    });
  }

  function markStars(starIndex) {
    stars.forEach((star, j) => {
      if (j <= starIndex) {
        star.classList.add("clicked");
      } else {
        star.classList.remove("clicked");
      }
    });
  }
});
