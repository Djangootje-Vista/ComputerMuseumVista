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

async function fetchProducts(query) {
    try {
        const response = await fetch(`http://10.20.193.174:8080/command?Command=findProducts&ID=nil&Text=${query}`); // Pass query to the API
        console.log(response);
        if (response.ok) {
            const products = await response.json(); // Get the products from the API response
            console.log(products); // Log the fetched products
            return products; // Return the products array
        } else {
            console.error("Failed to fetch products: ", response.statusText);
            return []; // Return an empty array if the fetch fails
        }
    } catch (error) {
        console.error("Error fetching products: ", error);
        return []; // Return an empty array in case of error
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loading-screen");
    const mainContent = document.getElementById("main-content");

    // Ensure the element exists before trying to access its classList
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add("hidden");
            setTimeout(() => {
                if (mainContent) {
                    mainContent.classList.add("visible");
                }
            }, 200);
        }, 1000);
    } else {
        console.error('Loading screen element not found.');
    }

    const productInput = document.getElementById('productInput');
    const productList = document.getElementById('productList');

    // Listen for input in the search field
    productInput.addEventListener('input', async () => {
        const query = productInput.value.toLowerCase().trim();
        productList.innerHTML = ''; // Clear the previous list

        if (query === '') {
            productList.classList.remove('visible'); // Hide the product list if no query
            return;
        }

        // Fetch products with the query
        const products = await fetchProducts(query);

        if (products.length === 0) {
            console.error("No products found.");
            const noResult = document.createElement('li');
            noResult.textContent = 'Geen resultaten gevonden';
            productList.appendChild(noResult);
        } else {
            // Loop through the products and create the list items
            products.forEach(product => {
                const li = document.createElement('li');
                li.classList.add('product-item');

                // Placeholder image based on FotoID (you can update this with actual image URLs)
                const img = document.createElement('img');
                img.src = `https://via.placeholder.com/50x50.png?text=${product.FotoID}`; // Use FotoID for the placeholder image
                img.alt = product.Naam;
                img.classList.add('product-image');

                const span = document.createElement('span');
                span.textContent = product.Naam;

                li.appendChild(img);
                li.appendChild(span);
                li.addEventListener('click', () => {
                    alert(`Je hebt '${product.Naam}' geselecteerd.`);
                });
                productList.appendChild(li);
            });
        }

        productList.classList.add('visible');
    });
});
