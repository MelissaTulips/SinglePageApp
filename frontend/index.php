<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Front</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <h1>Laravel API frontend</h1>

    <!-- Buttons for login and register -->
    <div class="container">
        <button id="show-login">Login</button>
        <button id="show-register">Register</button>
    </div>

    <!-- Login section -->
    <div class="container" id="login-container" style="display: none;">
        <h2>Login</h2>
        <form action="/api/user" method="get" id="login-form">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" required>

            <label for="password">Password</label>
            <input type="password" name="password" id="password" required>

            <input type="submit" value="Login">
        </form>
        <div id="login-message"></div>
        <div id="token-display"></div>
    </div>

    <!-- Register section -->
    <div class="container" id="register-container" style="display: none;">
        <h2>Register</h2>
        <form action="/api/register" method="post" id="register-form">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" required>

            <label for="register-email">Email</label>
            <input type="email" name="email" id="register-email" required>

            <label for="register-password">Password</label>
            <input type="password" name="password" id="register-password" required>

            <label for="password_confirmation">Confirm Password</label>
            <input type="password" name="password_confirmation" id="password_confirmation" required>

            <input type="submit" value="Register">
        </form>
        <div id="register-message"></div>
    </div>

    <!-- Logout section -->
    <div class="container token-required" id="logout-container" style="display: none;">
        <h2>Logout</h2>
        <button id="logout-btn">Logout</button>
        <div id="logout-message"></div>
    </div>

    <!-- Get user info -->
    <div class="container token-required" id="get-user-section" style="display: none;">
        <h2>Get User Info</h2>
        <form action="/api/user" method="get" id="get-user-form">
            <label for="token">Token</label>
            <input type="text" name="token" id="token">

            <input type="submit" value="Get">
        </form>
        <div id="user-data"></div>
    </div>

    <!-- Create Post -->
    <div class="container token-required" id="create-post-section" style="display: none;">
        <h2>Create Post</h2>
        <form action="/api/posts" method="post" id="create-post-form">
            <label for="title">Title</label>
            <input type="text" name="title" id="title">

            <label for="body">Body</label>
            <textarea name="body" id="body"></textarea>

            <input type="submit" value="Create">
        </form>
        <div id="post-data"></div>
    </div>

    <div class="container token-required" id="posts-section" style="display: none;">
        <h2>Posts</h2>
        <div id="user-posts"></div> 
    </div>

    <script src="js/app.js"></script> 
</body>
</html>
