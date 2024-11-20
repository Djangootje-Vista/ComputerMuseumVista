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

// Overlay functionality
const overlay = document.createElement('div');
overlay.className = 'overlay';
overlay.innerHTML = `
    <div class="overlay-content">
        <h2>Explore the Museum</h2>
        <p>Discover iconic artifacts and delve into the fascinating history of computing. The Vista Computer Museum brings the past alive with detailed exhibits, interactive displays, and engaging stories.</p>
        <button id="close-overlay" class="overlay-button">Close</button>
    </div>
`;
document.body.appendChild(overlay);

const showOverlayButton = document.createElement('button');
showOverlayButton.className = 'show-overlay-button';
showOverlayButton.textContent = 'Learn More About the Museum';
document.querySelector('.intro').appendChild(showOverlayButton);

showOverlayButton.addEventListener('click', () => {
    overlay.style.display = 'flex';
});

document.getElementById('close-overlay').addEventListener('click', () => {
    overlay.style.display = 'none';
});
