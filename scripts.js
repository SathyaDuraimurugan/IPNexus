// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Simple style for mobile nav when active
            if (nav.classList.contains('active')) {
                nav.style.display = 'block';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.backgroundColor = 'white';
                nav.style.padding = '20px';
                nav.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)';
                
                // Stack nav items vertically
                const navItems = nav.querySelectorAll('ul');
                navItems.forEach(ul => {
                    ul.style.flexDirection = 'column';
                    
                    // Add some spacing between items
                    const items = ul.querySelectorAll('li');
                    items.forEach(item => {
                        item.style.margin = '10px 0';
                    });
                });
            } else {
                nav.style.display = '';
                nav.style.position = '';
                nav.style.top = '';
                nav.style.left = '';
                nav.style.width = '';
                nav.style.backgroundColor = '';
                nav.style.padding = '';
                nav.style.boxShadow = '';
                
                // Reset nav items
                const navItems = nav.querySelectorAll('ul');
                navItems.forEach(ul => {
                    ul.style.flexDirection = '';
                    
                    const items = ul.querySelectorAll('li');
                    items.forEach(item => {
                        item.style.margin = '';
                    });
                });
            }
        });
    }
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonials.length > 0 && dots.length > 0) {
        let currentSlide = 0;
        
        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Show a specific slide
        function showSlide(index) {
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
            });
            
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            testimonials[index].style.display = 'block';
            dots[index].classList.add('active');
            currentSlide = index;
        }
        
        // Next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % testimonials.length;
            showSlide(currentSlide);
        }
        
        // Previous slide
        function prevSlide() {
            currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
            showSlide(currentSlide);
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        // Event listeners for buttons
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);
        }
        
        // Auto-rotate slides every 5 seconds
        setInterval(nextSlide, 5000);
    }
    
    // Form Validation (for login and registration forms)
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            let valid = true;
            
            // Get all required inputs
            const requiredInputs = form.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    
                    // Create error message if it doesn't exist
                    let errorMessage = input.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('p');
                        errorMessage.classList.add('error-message');
                        errorMessage.style.color = 'red';
                        errorMessage.style.fontSize = '0.8rem';
                        errorMessage.style.marginTop = '5px';
                        input.insertAdjacentElement('afterend', errorMessage);
                    }
                    
                    errorMessage.textContent = 'This field is required';
                    
                    // Highlight input
                    input.style.borderColor = 'red';
                    
                    // Remove error when user types
                    input.addEventListener('input', function() {
                        if (input.value.trim()) {
                            errorMessage.textContent = '';
                            input.style.borderColor = '';
                        }
                    });
                }
                
                // Email validation
                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        valid = false;
                        
                        let errorMessage = input.nextElementSibling;
                        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                            errorMessage = document.createElement('p');
                            errorMessage.classList.add('error-message');
                            errorMessage.style.color = 'red';
                            errorMessage.style.fontSize = '0.8rem';
                            errorMessage.style.marginTop = '5px';
                            input.insertAdjacentElement('afterend', errorMessage);
                        }
                        
                        errorMessage.textContent = 'Please enter a valid email address';
                        input.style.borderColor = 'red';
                    }
                }
                
                // Password validation (minimum 8 characters)
                if (input.type === 'password' && input.value.trim()) {
                    if (input.value.length < 8) {
                        valid = false;
                        
                        let errorMessage = input.nextElementSibling;
                        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                            errorMessage = document.createElement('p');
                            errorMessage.classList.add('error-message');
                            errorMessage.style.color = 'red';
                            errorMessage.style.fontSize = '0.8rem';
                            errorMessage.style.marginTop = '5px';
                            input.insertAdjacentElement('afterend', errorMessage);
                        }
                        
                        errorMessage.textContent = 'Password must be at least 8 characters';
                        input.style.borderColor = 'red';
                    }
                }
            });
            
            if (!valid) {
                event.preventDefault();
            }
        });
    });
    
    // Filter functionality for marketplace
    const filterSelects = document.querySelectorAll('.search-filters select');
    const searchInput = document.querySelector('.search-input input');
    const itemCards = document.querySelectorAll('.featured-item');
    
    if (filterSelects.length > 0 && itemCards.length > 0) {
        // Apply filters when selects change
        filterSelects.forEach(select => {
            select.addEventListener('change', applyFilters);
        });
        
        // Apply filters when search input changes
        if (searchInput) {
            searchInput.addEventListener('input', applyFilters);
        }
        
        function applyFilters() {
            const categoryFilter = document.querySelector('select[name="category"]').value;
            const licenseFilter = document.querySelector('select[name="license"]').value;
            const priceFilter = document.querySelector('select[name="price"]').value;
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            
            itemCards.forEach(card => {
                let showCard = true;
                
                // Check category
                if (categoryFilter && !card.querySelector('.category-badge').textContent.toLowerCase().includes(categoryFilter.toLowerCase())) {
                    showCard = false;
                }
                
                // Check license
                if (licenseFilter && !card.querySelector('.license').textContent.toLowerCase().includes(licenseFilter.toLowerCase())) {
                    showCard = false;
                }
                
                // Check price
                if (priceFilter) {
                    const priceText = card.querySelector('.price').textContent;
                    const price = parseInt(priceText.replace(/[^0-9]/g, ''));
                    
                    if (priceFilter === '0-1000' && (price < 0 || price > 1000)) {
                        showCard = false;
                    } else if (priceFilter === '1000-5000' && (price < 1000 || price > 5000)) {
                        showCard = false;
                    } else if (priceFilter === '5000-20000' && (price < 5000 || price > 20000)) {
                        showCard = false;
                    } else if (priceFilter === '20000-plus' && price < 20000) {
                        showCard = false;
                    }
                }
                
                // Check search term
                if (searchTerm) {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    const description = card.querySelector('p').textContent.toLowerCase();
                    
                    if (!title.includes(searchTerm) && !description.includes(searchTerm)) {
                        showCard = false;
                    }
                }
                
                // Show or hide card
                card.style.display = showCard ? 'block' : 'none';
            });
        }
    }
});