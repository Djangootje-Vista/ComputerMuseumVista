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

document.addEventListener('DOMContentLoaded', () => {
    // Dummy productenlijst met afbeeldingen
    const products = [
        { 
            name: 'Floppy Disk Drive', 
            image: 'https://cdn.arstechnica.net/wp-content/uploads/2024/10/GettyImages-182661978-scaled.jpg' 
        },
        { 
            name: 'Emre is bol', 
            image: 'https://via.placeholder.com/50x50.png?text=KB' 
        },
        { 
            name: 'CRT Monitor', 
            image: 'https://via.placeholder.com/50x50.png?text=CRT' 
        },
        { 
            name: 'Mouse Ball', 
            image: 'https://via.placeholder.com/50x50.png?text=MB' 
        },
        { 
            name: 'Pentium Processor', 
            image: 'https://via.placeholder.com/50x50.png?text=CPU' 
        }
    ];

    const productInput = document.getElementById('productInput');
    const productList = document.getElementById('productList');

    productInput.addEventListener('input', () => {
        const query = productInput.value.toLowerCase().trim();
        productList.innerHTML = ''; // Wis vorige resultaten

        if (query === '') {
            productList.classList.remove('visible'); // Verberg de lijst als er geen input is
            return;
        }

        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().startsWith(query) // Alleen starten met query
        );

        if (filteredProducts.length > 0) {
            filteredProducts.forEach(product => {
                const li = document.createElement('li');
                li.classList.add('product-item'); // Voor styling
                const img = document.createElement('img');
                img.src = product.image;
                img.alt = product.name;
                img.classList.add('product-image'); // Voor styling

                const span = document.createElement('span');
                span.textContent = product.name;

                li.appendChild(img); // Voeg de afbeelding toe
                li.appendChild(span); // Voeg de productnaam toe
                li.addEventListener('click', () => {
                    alert(`Je hebt '${product.name}' geselecteerd.`);
                });
                productList.appendChild(li);
            });
        } else {
            const noResult = document.createElement('li');
            noResult.textContent = 'Geen resultaten gevonden';
            productList.appendChild(noResult);
        }

        productList.classList.add('visible'); // Toon de lijst als er resultaten zijn
    });
});
