// Attendre que le document soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    const topButton = document.getElementById("backToTop");

    // 1. Afficher le bouton quand on descend de 300px
    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            topButton.style.display = "block";
        } else {
            topButton.style.display = "none";
        }
    };

    // 2. Action au clic : remonter en douceur (Smooth Scroll)
    topButton.onclick = function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // BONUS : Animation simple pour l'apparition des cartes de l'équipe
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    document.querySelectorAll('.team-card').forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "all 0.6s ease-out";
        observer.observe(card);
    });
});