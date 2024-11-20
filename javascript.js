<script>
    // Select all "Meer info" buttons
    const infoButtons = document.querySelectorAll('.info-button');

    infoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dropdown = button.nextElementSibling;
            const parent = button.closest('.info-dropdown');
            parent.classList.toggle('active');
        });
    });
</script>
