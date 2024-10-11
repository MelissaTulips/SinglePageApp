//log in stufff



window.onload = function() {
    let userToken = '';






    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        let formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');



        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                userToken = data.token; 
                fetchAllPosts(userToken); 
            }

        } catch (error) {
            console.log(error);
        }
    });




    
    //existing code --------------

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
                    'Content-Type': 'application/html'
                }
            });

            const data = await response.json();

            if (response.ok) {
                document.getElementById('user-data').innerHTML = `<p>User Email: ${data.email}<br>
                                                                    User Name: ${data.name}</p>`;
                userToken = token; 
                await fetchAllPosts(userToken); 
            }



        } catch (error) {
           console.log(error);
        }
    });








    const postForm = document.getElementById('create-post-form');
    postForm.addEventListener('submit', async function(event) {
        event.preventDefault();


        let formData = new FormData(event.target);
        let token = formData.get('token');

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
                document.getElementById('user-data').innerHTML = `<p>User Email: ${data.email}<br>
                                                                    User Name: ${data.name}</p>`;
                userToken = token;
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
                    'Authorization': `Bearer ${token}}`,
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

    const token = document.getElementById('token').value;
    if (token) {
        fetchAllPosts(token);
    }
};










