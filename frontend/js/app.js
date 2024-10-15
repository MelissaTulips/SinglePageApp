window.onload = function() {
    let userToken = '';
    let isLoggedIn = false; // Track the login state

    // Show/Hide forms based on button click
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');
    const showLoginBtn = document.getElementById('show-login');
    const showRegisterBtn = document.getElementById('show-register');

    // Token-dependent sections
    const tokenSections = document.querySelectorAll('.token-required');
    const logoutBtn = document.getElementById('logout-btn');
    const logoutMessage = document.getElementById('logout-message');

    // Initially hide all token-related sections
    tokenSections.forEach(section => {
        section.style.display = 'none';
    });

    // Function to hide all forms
    function hideAllForms() {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'none';

        // Hide all token-dependent sections
        tokenSections.forEach(section => {
            section.style.display = 'none';
        });
    }

    // Event listener to show login form and hide register form
    showLoginBtn.addEventListener('click', function() {
        hideAllForms(); // Hide all forms first
        loginContainer.style.display = 'block'; // Show login form
        document.getElementById('token-display').innerText = ''; // Clear token display
    });

    // Event listener to show register form and hide login form
    showRegisterBtn.addEventListener('click', function() {
        if (isLoggedIn) {
            // If the user is logged in, prevent showing the register form
            alert("You are already logged in. Please log out before registering a new account.");
            return;
        }
        hideAllForms(); // Hide all forms first
        registerContainer.style.display = 'block'; // Show register form
    });

    // Login form logic
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                userToken = data.token;
                isLoggedIn = true; // Update login state
                document.getElementById('login-message').innerText = 'Login successful!';
                document.getElementById('token-display').innerText = `Your token: ${userToken}`;

                // Show token-related sections after login
                tokenSections.forEach(section => {
                    section.style.display = 'block';
                });

                // Optionally, fill the token input field automatically
                document.getElementById('token').value = userToken;

                // Fetch posts after login
                fetchAllPosts(userToken);
            } else {
                document.getElementById('login-message').innerText = data.message || 'Login failed.';
                document.getElementById('token-display').innerText = '';
            }
        } catch (error) {
            console.log(error);
            document.getElementById('login-message').innerText = 'An error occurred.';
            document.getElementById('token-display').innerText = '';
        }
    });

    // Register form logic
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        let formData = new FormData(event.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const password_confirmation = formData.get('password_confirmation');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: password_confirmation
                })
            });

            const data = await response.json();

            if (response.ok) {
                document.getElementById('register-message').innerText = 'Registration successful! You can now log in.';
            } else {
                document.getElementById('register-message').innerText = data.message || 'Registration failed.';
            }
        } catch (error) {
            console.log(error);
            document.getElementById('register-message').innerText = 'An error occurred.';
        }
    });


// Logout function
// Logout function
logoutBtn.addEventListener('click', async function() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userToken}`, // Send token in the request
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // Clear the login message and user token
            document.getElementById('login-message').innerText = ''; // Clear "Login successful!" message
            userToken = '';
            isLoggedIn = false; // Update login state



            // Optionally clear token display
            document.getElementById('token-display').innerText = '';

            // Hide all forms
            hideAllForms(); 
            loginContainer.style.display = 'block'; 
        }
    } catch (error) {
        console.log(error);
    }
});


    // Get user info logic
    const getForm = document.getElementById('get-user-form');
    getForm.addEventListener('submit', async function(event) {
        event.preventDefault();
    
        let formData = new FormData(event.target);
        let token = formData.get('token');
    
        try {
            const response = await fetch('http://127.0.0.1:8000/api/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            const data = await response.json();
            console.log(data);
    
            if (response.ok) {
                document.getElementById('user-data').innerHTML = `<p>User Email: ${data.email || 'N/A'}<br>
                                                                   User Name: ${data.name || 'N/A'}</p>`;
                userToken = token; 
                await fetchAllPosts(userToken); 
            } else {
                document.getElementById('user-data').innerHTML = '<p>Error fetching user data.</p>';
            }
        } catch (error) {
           console.log(error);
        }
    });

    // Create post logic
    const postForm = document.getElementById('create-post-form');
    postForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: formData.get('title'),
                    body: formData.get('body')
                })
            });

            const data = await response.json();

            if (response.ok) {
                await fetchAllPosts(userToken);
                document.getElementById('title').value = ''; 
                document.getElementById('body').value = ''; 
            }
        } catch (error) {
            console.log(error);
        }
    });

    async function fetchAllPosts(token) {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/posts', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const posts = await response.json();

            if (response.ok) {
                const postsContainer = document.getElementById('user-posts');
                postsContainer.innerHTML = '';
                posts.forEach(post => {
                    postsContainer.innerHTML += `
                        <div class="post">
                            <p>Title: ${post.title}</p>
                            <p>Body: ${post.body}</p>
                        </div>
                    `;
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
};
