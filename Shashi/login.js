// Handle login form submission
document.getElementById('login-form')?.addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent the form from refreshing the page

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('Login Attempt:', email, password);  // For debugging

    // Check credentials and set admin if shashi@gmail.com
    if (email === 'shashi@gmail.com' && password === '12345') {
        // Store user in localStorage
        localStorage.setItem('currentUser', email);
        window.location.href = 'feeds.html';  // Redirect to feeds page
    } else if (password === '12345') {
        // Regular user login
        localStorage.setItem('currentUser', email);
        window.location.href = 'feeds.html';  // Redirect to feeds page
    } else {
        alert('Invalid credentials, please try again.');
    }
});
