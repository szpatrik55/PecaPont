const kepek = document.querySelectorAll('.kep');
kepek.forEach(kep => {
    kep.addEventListener('click', () => {
        kep.classList.toggle('nagyitott');  // Váltogatja a nagyítást és kicsinyítést
    });
});