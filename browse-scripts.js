// Browse Marketplace Scripts
document.addEventListener('DOMContentLoaded', function() {
    // View Toggle (Grid/List)
    const viewButtons = document.querySelectorAll('.view-btn');
    const listingsContainer = document.querySelector('.listings-container');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            viewButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Toggle view mode
            const viewMode = this.getAttribute('data-view');
            if (viewMode === 'list') {
                listingsContainer.classList.add('list-view');
            } else {
                listingsContainer.classList.remove('list-view');
            }
        });
    });
    
    // Save/Favorite functionality
    const saveButtons = document.querySelectorAll('.save-button');
    
    saveButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('saved');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (this.classList.contains('saved')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });
    
    // Price Range Slider
    const priceRange = document.getElementById('price-range');
    const minPrice = document.getElementById('min-price');
    const maxPrice = document.getElementById('max-price');
    
    if (priceRange && minPrice && maxPrice) {
        // Update inputs when slider changes
        priceRange.addEventListener('input', function() {
            maxPrice.value = this.value;
        });
        
        // Update slider when min/max inputs change
        minPrice.addEventListener('change', function() {
            if (parseInt(this.value) > parseInt(maxPrice.value)) {
                maxPrice.value = this.value;
            }
        });
        
        maxPrice.addEventListener('change', function() {
            priceRange.value = this.value;
        });
        
        // Price preset buttons
        const pricePresets = document.querySelectorAll('.price-presets button');
        
        pricePresets.forEach(button => {
            button.addEventListener('click', function() {
                const min = this.getAttribute('data-min');
                const max = this.getAttribute('data-max');
                
                minPrice.value = min;
                maxPrice.value = max;
                priceRange.value = max;
            });
        });
    }
    
    // Filter Application
    const applyFiltersBtn = document.getElementById('apply-filters');
    const clearFiltersBtn = document.getElementById('clear-filters');
    
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            // In a real application, this would update the listings
            // based on the selected filters
            
            // Simulate loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Applying...';
            this.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                this.innerHTML = 'Apply Filters';
                this.disabled = false;
                
                // Show notification
                showNotification('Filters applied successfully!');
            }, 1000);
        });
    }
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            // Clear all checkboxes
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // Reset radio buttons to "Any time"
            document.querySelector('input[name="date"][value="any"]').checked = true;
            
            // Clear price range
            if (minPrice && maxPrice && priceRange) {
                minPrice.value = '';
                maxPrice.value = '';
                priceRange.value = 50000;
            }
            
            // Show notification
            showNotification('Filters cleared!');
        });
    }
    
    // Sorting functionality
    const sortSelect = document.getElementById('sort-by');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            
            // Simulate loading state
            const resultsCount = document.querySelector('.results-count');
            if (resultsCount) {
                resultsCount.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sorting...';
            }
            
            // Simulate API call delay
            setTimeout(() => {
                if (resultsCount) {
                    resultsCount.innerHTML = '<p>Showing <strong>24</strong> of <strong>156</strong> listings</p>';
                }
                
                // Show notification
                showNotification(`Sorted by ${sortValue}!`);
            }, 800);
        });
    }
    
    // Mobile filter toggle
    const createMobileFilterToggle = () => {
        // Create mobile filter button if it doesn't exist
        if (!document.querySelector('.mobile-filter-toggle')) {
            const mobileToggle = document.createElement('button');
            mobileToggle.className = 'btn btn-primary mobile-filter-toggle';
            mobileToggle.innerHTML = '<i class="fas fa-filter"></i> Filters';
            
            // Insert before the listings container
            const advancedSearch = document.querySelector('.advanced-search .container');
            if (advancedSearch) {
                advancedSearch.prepend(mobileToggle);
            }
            
            // Add event listener
            mobileToggle.addEventListener('click', function() {
                const filterPanel = document.querySelector('.filter-panel');
                if (filterPanel) {
                    filterPanel.classList.toggle('show-mobile');
                    
                    // Toggle button text
                    if (filterPanel.classList.contains('show-mobile')) {
                        this.innerHTML = '<i class="fas fa-times"></i> Close Filters';
                    } else {
                        this.innerHTML = '<i class="fas fa-filter"></i> Filters';
                    }
                }
            });
        }
    };
    
    // Handle window resize
    const handleResize = () => {
        if (window.innerWidth <= 992) {
            createMobileFilterToggle();
            // Add class to filter panel
            const filterPanel = document.querySelector('.filter-panel');
            if (filterPanel) {
                filterPanel.classList.add('mobile-ready');
            }
        } else {
            // Remove mobile specific classes
            const filterPanel = document.querySelector('.filter-panel');
            if (filterPanel) {
                filterPanel.classList.remove('show-mobile', 'mobile-ready');
            }
        }
    };
    
    // Initial check
    handleResize();
    
    // Listen for window resize
    window.addEventListener('resize', handleResize);
    
    // Helper for notifications
    function showNotification(message) {
        // Create notification element if it doesn't exist
        if (!document.querySelector('.notification')) {
            const notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
        }
        
        const notification = document.querySelector('.notification');
        notification.textContent = message;
        notification.classList.add('show');
        
        // Hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Add additional CSS for mobile toggle and notifications
    const addAdditionalStyles = () => {
        if (!document.querySelector('style#dynamic-styles')) {
            const style = document.createElement('style');
            style.id = 'dynamic-styles';
            style.textContent = `
                .mobile-filter-toggle {
                    display: none;
                    margin-bottom: 15px;
                    width: 100%;
                }
                
                @media (max-width: 992px) {
                    .mobile-filter-toggle {
                        display: block;
                    }
                    
                    .filter-panel.mobile-ready {
                        display: none;
                    }
                    
                    .filter-panel.show-mobile {
                        display: block;
                    }
                }
                
                .notification {
                    position: fixed;
                    bottom: -60px;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: var(--primary-color);
                    color: white;
                    padding: 12px 25px;
                    border-radius: 4px;
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
                    z-index: 1000;
                    transition: bottom 0.3s ease;
                }
                
                .notification.show {
                    bottom: 20px;
                }
            `;
            document.head.appendChild(style);
        }
    };
    
    // Add the styles
    addAdditionalStyles();
    
    // Initialize pagination
    const paginationLinks = document.querySelectorAll('.pagination a');
    
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all pagination links
            paginationLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link (except for Next)
            if (!this.classList.contains('next-page')) {
                this.classList.add('active');
            }
            
            // Simulate page loading
            const resultsCount = document.querySelector('.results-count');
            if (resultsCount) {
                resultsCount.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            }
            
            // Scroll to top of listings
            window.scrollTo({
                top: document.querySelector('.listings-container').offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Simulate API call delay
            setTimeout(() => {
                if (resultsCount) {
                    resultsCount.innerHTML = '<p>Showing <strong>24</strong> of <strong>156</strong> listings</p>';
                }
                
                // Show notification
                const pageNum = this.textContent.trim();
                showNotification(`Page ${pageNum === 'Next' ? '2' : pageNum} loaded!`);
            }, 1000);
        });
    });
});