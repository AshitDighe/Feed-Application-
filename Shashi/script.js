// Get stored posts and user credentials from localStorage
let posts = JSON.parse(localStorage.getItem('posts')) || [];  // Get posts from localStorage or initialize as empty array
let currentUser = localStorage.getItem('currentUser') || null; // Get logged-in user from localStorage

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
        currentUser = email;
        window.location.href = 'feeds.html';  // Redirect to feeds page
    } else if (email !== 'shashi@gmail.com' && password === '12345') {
        // Regular user login
        localStorage.setItem('currentUser', email);
        currentUser = email;
        window.location.href = 'feeds.html';  // Redirect to feeds page
    } else {
        alert('Invalid credentials, please try again.');
    }
});

// Show Create Post Form
function showCreatePostForm() {
    document.getElementById('create-post-form').style.display = 'block';
    document.getElementById('my-posts-section').style.display = 'none';
    document.getElementById('other-posts-section').style.display = 'none';
}

// Hide Create Post Form
function hideCreatePostForm() {
    document.getElementById('create-post-form').style.display = 'none';
}

// Create a Post
function createPost() {
    const postContent = document.getElementById('new-post').value;

    if (postContent.trim() === '') {
        alert('Please enter some content for your post.');
        return;
    }

    // Get the current date and time
    const postDate = new Date();
    const formattedDate = postDate.toLocaleString();  // Format the date to a readable format

    // Create the post object
    const newPost = {
        id: posts.length + 1, // Assign a new ID based on the current posts array length
        user: currentUser,
        content: postContent,
        approved: false, // Default approval status to false
        createdDate: formattedDate
    };

    // Add the new post to the posts array
    posts.push(newPost);

    // Save the updated posts array to localStorage
    localStorage.setItem('posts', JSON.stringify(posts));

    alert('Your post has been created.');

    // Clear the form and hide the create post form
    document.getElementById('new-post').value = ''; // Clear textarea
    hideCreatePostForm();

    // Refresh the "My Posts" section to show the new post
    viewMyPosts();
}

// View My Posts
function viewMyPosts() {
    document.getElementById('my-posts-section').style.display = 'block';
    document.getElementById('other-posts-section').style.display = 'none';
    document.getElementById('create-post-form').style.display = 'none';

    const myPosts = posts.filter(post => post.user === currentUser);
    const postsList = document.getElementById('my-posts-list');
    postsList.innerHTML = '';

    if (myPosts.length === 0) {
        postsList.innerHTML = '<p>You have no posts yet.</p>';
    } else {
        myPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `
                <p><strong>Post ${post.id} by ${post.user}</strong></p>
                <p>${post.content}</p>
                <p><em>Created on: ${post.createdDate}</em></p>
                <p><em>Status: ${post.approved ? 'Approved' : 'Pending Approval'}</em></p>
                ${
                    currentUser === 'shashi@gmail.com' ? `
                        <button onclick="approvePost(${post.id})">Approve</button>
                        <button onclick="deletePost(${post.id})">Delete</button>
                    ` : `
                        <button onclick="updatePost(${post.id})">Update</button>
                        <button onclick="deletePost(${post.id})">Delete</button>
                    `
                }
            `;
            postsList.appendChild(postElement);
        });
    }
}

// View Other Users' Posts (Show all posts)
function viewOtherPosts() {
    document.getElementById('my-posts-section').style.display = 'none';
    document.getElementById('other-posts-section').style.display = 'block';
    document.getElementById('create-post-form').style.display = 'none';

    const postsList = document.getElementById('other-posts-list');
    postsList.innerHTML = '';

    if (posts.length === 0) {
        postsList.innerHTML = '<p>No posts available.</p>';
    } else {
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `
                <p><strong>Post ${post.id} by ${post.user}</strong></p>
                <p>${post.content}</p>
                <p><em>Created on: ${post.createdDate}</em></p>
                <p><em>Status: ${post.approved ? 'Approved' : 'Pending Approval'}</em></p>
                ${
                    currentUser === 'shashi@gmail.com' ? `
                        <button onclick="approvePost(${post.id})">Approve</button>
                        <button onclick="deletePost(${post.id})">Delete</button>
                    ` : `
                        <button onclick="updatePost(${post.id})">Update</button>
                        <button onclick="deletePost(${post.id})">Delete</button>
                    `
                }
            `;
            postsList.appendChild(postElement);
        });
    }
}

// Approve a Post (Admin functionality)
function approvePost(postId) {
    const post = posts.find(post => post.id === postId);
    if (post && post.user !== 'Admin') {
        post.approved = true;
        localStorage.setItem('posts', JSON.stringify(posts)); // Store updated posts in localStorage
        alert('Post approved.');
        viewOtherPosts();  // Refresh posts to show updated status
    }
}

// Delete a Post (Admin and normal users functionality)
function deletePost(postId) {
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        localStorage.setItem('posts', JSON.stringify(posts)); // Store updated posts in localStorage
        alert('Post deleted.');
        viewOtherPosts();  // Refresh posts after deletion
    }
}

// Update a Post (Admin and normal users functionality)
function updatePost(postId) {
    const post = posts.find(post => post.id === postId);
    if (post) {
        const updatedContent = prompt('Update your post content:', post.content);
        if (updatedContent !== null && updatedContent.trim() !== '') {
            post.content = updatedContent;
            localStorage.setItem('posts', JSON.stringify(posts)); // Store updated posts in localStorage
            alert('Post updated.');
            viewOtherPosts();  // Refresh posts after update
        }
    }
}
