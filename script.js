// JavaScript for animations and overlay functionality

// Add fade-in animation to all products on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
});

document.querySelectorAll('.product').forEach((product) => {
    observer.observe(product);
});


document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loading-screen");
    const mainContent = document.getElementById("main-content");

    // Houd het laadscherm 1 seconde zichtbaar
    setTimeout(() => {
        // Voeg de "hidden" klasse toe om het laadscherm te verbergen
        loadingScreen.classList.add("hidden");

        // Toon de inhoud na een korte vertraging (gelijk aan de overgangsduur van 1s)
        setTimeout(() => {
            mainContent.classList.add("visible");
        }, 200); // Wacht tot de overgang van het laadscherm is voltooid
    }, 1000); // Laadscherm blijft 1 seconde zichtbaar
});
