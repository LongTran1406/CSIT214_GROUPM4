// Form handling functions
function flipForm() {
    const form = document.getElementById('authForm');
    form.classList.toggle('flipped');
}

function showSignIn() {
    const form = document.getElementById('authForm');
    if (form.classList.contains('flipped')) {
        form.classList.remove('flipped');
    }
    updateActiveNavLink('showSignIn');
}

function showSignUp() {
    const form = document.getElementById('authForm');
    if (!form.classList.contains('flipped')) {
        form.classList.add('flipped');
    }
    updateActiveNavLink('showSignUp');
}

// Navigation helper function
function updateActiveNavLink(action) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`.nav-link[onclick="${action}()"]`).classList.add('active');
}

// Password visibility toggle
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.parentElement.querySelector('.password-toggle');
    const img = button.querySelector('img');
    
    if (input.type === 'password') {
        input.type = 'text';
        img.src = 'Photo/password_show.png';
    } else {
        input.type = 'password';
        img.src = 'Photo/password_hide.png';
    }
}

// Form validation and submission handlers
function handleSignIn(event) {
    event.preventDefault();
    
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
    
    if (password.length < 8) {
        alert('Password must be at least 8 characters long!');
        return false;
    }
    
    // Here you would typically send the form data to your server
    alert('Sign in successful!');
    // Redirect to dashboard or home page
    // window.location.href = 'dashboard.html';
    return false;
}

function handleSignUp(event) {
    event.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const phone = document.getElementById('signup-phone').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    
    if (password.length < 8) {
        alert('Password must be at least 8 characters long!');
        return false;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return false;
    }
    
    if (!phone || phone.trim() === '') {
        alert('Phone number is required!');
        return false;
    }
    
    // Here you would typically send the form data to your server
    alert('Account created successfully!');
    // Redirect to dashboard or home page
    // window.location.href = 'dashboard.html';
    return false;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.nav-link[onclick="showSignIn()"]').classList.add('active');
}); 