// Scroll to Top Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const heroSection = document.querySelector('.hero-section');

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        // Show button after scrolling past the hero section
        if (scrollPosition > heroHeight) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Smooth scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
