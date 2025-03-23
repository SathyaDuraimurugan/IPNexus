document.addEventListener('DOMContentLoaded', function() {
    // Password visibility toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle password visibility
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // User type selection (for signup page)
    const userTypeOptions = document.querySelectorAll('.user-type-option');
    const userTypeInput = document.getElementById('user-type');
    
    if (userTypeOptions.length > 0 && userTypeInput) {
        userTypeOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                userTypeOptions.forEach(opt => {
                    opt.classList.remove('active');
                });
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Update hidden input value
                userTypeInput.value = this.dataset.type;
            });
        });
    }
    
    // Login form submission (mock functionality for demo)
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // In a real application, you would send this data to a server
            console.log('Login attempt:', { email, password, remember });
            
            // Mock successful login (redirect to dashboard)
            // In a real app, this would happen after server validation
            simulateSuccessfulLogin();
        });
    }
    
    // Sign-up form submission (mock functionality for demo)
    const signupForm = document.getElementById('signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const userType = document.getElementById('user-type').value;
            const termsAccepted = document.getElementById('terms').checked;
            
            // Validate passwords match
            if (password !== confirmPassword) {
                showError('confirm-password', 'Passwords do not match');
                return;
            }
            
            // Validate terms acceptance
            if (!termsAccepted) {
                showError('terms', 'You must accept the terms and conditions');
                return;
            }
            
            // In a real application, you would send this data to a server
            console.log('Signup attempt:', { 
                firstName, 
                lastName, 
                email, 
                password, 
                userType, 
                termsAccepted 
            });
            
            // Mock successful signup (redirect to dashboard)
            simulateSuccessfulSignup();
        });
    }
    
    // Helper function to show error message
    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        let errorMessage = input.nextElementSibling;
        
        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
            errorMessage = document.createElement('p');
            errorMessage.classList.add('error-message');
            errorMessage.style.color = 'red';
            errorMessage.style.fontSize = '0.8rem';
            errorMessage.style.marginTop = '5px';
            input.insertAdjacentElement('afterend', errorMessage);
        }
        
        errorMessage.textContent = message;
        input.style.borderColor = 'red';
    }
    
    // Mock functions for demo purposes
    function simulateSuccessfulLogin() {
        // Show success message
        const formContainer = document.querySelector('.auth-form-container');
        
        if (formContainer) {
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.style.backgroundColor = '#d1fae5';
            successMessage.style.color = '#065f46';
            successMessage.style.padding = '15px';
            successMessage.style.borderRadius = '5px';
            successMessage.style.marginTop = '20px';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Login successful! Redirecting to your dashboard...';
            
            // Append message
            formContainer.appendChild(successMessage);
            
            // Simulate redirect after delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        }
    }
    
    function simulateSuccessfulSignup() {
        // Show success message
        const formContainer = document.querySelector('.auth-form-container');
        
        if (formContainer) {
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.style.backgroundColor = '#d1fae5';
            successMessage.style.color = '#065f46';
            successMessage.style.padding = '15px';
            successMessage.style.borderRadius = '5px';
            successMessage.style.marginTop = '20px';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Account created successfully! Redirecting to your dashboard...';
            
            // Append message
            formContainer.appendChild(successMessage);
            
            // Simulate redirect after delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        }
    }
});