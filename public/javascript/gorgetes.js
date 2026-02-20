document.addEventListener("DOMContentLoaded", function() {
    let lastScrollTop = 0;
    const navbar = document.getElementById("navlist");

    window.addEventListener("scroll", function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Görgetés lefelé
            navbar.style.top = "-50px"; // Navbar elrejtése
        } else {
            // Görgetés felfelé
            navbar.style.top = "0"; // Navbar mutatása
        }

        lastScrollTop = scrollTop;
    });
});
