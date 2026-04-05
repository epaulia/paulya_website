// Scroll to Top Button & Floating Album Functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const floatingAlbum = document.getElementById('floatingAlbum');
    const heroSection = document.querySelector('.hero-section');
    const albumSection = document.getElementById('album-section');

    // Show floating album after 1.5s on the hero section
    var heroTimer = setTimeout(function() {
        var albumRect = albumSection.getBoundingClientRect();
        var albumInView = albumRect.top < window.innerHeight * 0.8 && albumRect.bottom > window.innerHeight * 0.2;
        if (!albumInView) {
            floatingAlbum.classList.add('visible');
        }
    }, 1500);

    // Show/hide buttons based on scroll position
    window.addEventListener('scroll', function() {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        // Show scroll-to-top after scrolling past the hero section
        if (scrollPosition > heroHeight) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }

        // Show/hide floating album - hidden only when album section is in view
        var albumRect = albumSection.getBoundingClientRect();
        var albumInView = albumRect.top < window.innerHeight * 0.8 && albumRect.bottom > window.innerHeight * 0.2;

        if (!albumInView) {
            floatingAlbum.classList.add('visible');
        } else {
            floatingAlbum.classList.remove('visible');
        }
    });

    // Smooth scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scroll to album section when floating disc is clicked
    floatingAlbum.addEventListener('click', function(e) {
        e.preventDefault();
        albumSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});
