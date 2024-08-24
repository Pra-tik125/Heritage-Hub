
function toggleMenu() {
    const nav = document.querySelector('.navdiv ul.nb1');
    nav.classList.toggle('active');
}

window.addEventListener('scroll', function () {
    const nav = document.querySelector('.navdiv');
    if (window.scrollY > 0) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

