const ipConfig = "10.20.183.221"
const startUrl = (`http://${ipConfig}:8080/`)

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
        const response = await fetch(`${startUrl}command?Command=findProducts&ID=nil&Text=${query}`); // Pass query to the API
        if (response.ok) {
            const products = await response.json();
            return products;
        } else {
            console.error("Failed to fetch products: ", response.statusText); 
            return []; // Return an empty array in case of error
        }
    } catch (error) {
        console.error("Error fetching products: ", error);
        return [];
    }
}

async function fetchImage(FotoID) {
    try {
        const response = await fetch(`${startUrl}command?Command=getImage&ID=${FotoID}&Text=nil`); // Pass query to the API
        if (response.ok) {
            const blob = await response.blob(); // Convert response to a Blob
            const imageUrl = URL.createObjectURL(blob); // Create a URL for the Blob
            console.log("Image URL: ", imageUrl);
            return imageUrl; // Return the image URL
        } else {
            console.error("Failed to fetch image: ", response.statusText); 
            return null; // Return null in case of error
        }
    } catch (error) {
        console.error("Error fetching image: ", error);
        return null;
    }
}


document.addEventListener('DOMContentLoaded', () => {

    const loadingScreen = document.getElementById("loading-screen");

    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add("hidden");
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
                img.src = "http://10.20.185.212:8080/command?Command=getImage&ID=1&Text=nil";
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