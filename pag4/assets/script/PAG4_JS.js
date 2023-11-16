document.addEventListener("DOMContentLoaded", function () {
    var stars = document.querySelectorAll(".star");

    stars.forEach(function (star, index) {
        star.addEventListener("click", function () {
            resetStars();
            highlightStars(index);
        });
    });

    function resetStars() {
        stars.forEach(function (star) {
            star.classList.remove("checked");
        });
    }

    function highlightStars(index) {
        for (var i = 0; i <= index; i++) {
            stars[i].classList.add("checked");
        }
    }
});