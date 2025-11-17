// opens my print window
// as well as that opens a blank page
// i use document.write to then display a very simple page
// the only content shown is the posts ive made with the post function
// by combining the two functions a user can both

// look at a simple list of their updates
// print out those updates if desired

// document.close is called when done writing. as this is all automatic doc will write the updates 
// this is what the user sees
// set timeout is used in order to allow full page to load before print.

const Print = () => {
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
        <html>
            <head><title>Print Posts</title></head>
            <body>
                <h1>My Blog Export</h1>
                ${document.getElementById('postsContainer').innerHTML}
            </body>
        </html>
    `);
    
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 250);
};

// function for my post creation.

function createPost() {
    const titleContent = document.getElementById('titleContent').value;
    const postContent = document.getElementById('postContent').value;
// trim used to remove beginning and end of a string
    if (postContent.trim() === '') {
        alert('Please write something before posting!');
        return;
    }
    if (titleContent.trim() === '') {
        alert('Please write a title posting!');
        return;
    }
     // Check if title is more than 20 characters
    if (titleContent.length > 20) {
        alert('Title must be 20 characters or less!');
        return;
    }

    // Create new post element
    const postElement = document.createElement('div');
    postElement.className = 'post';

    // Adds the current date to the post
    const currentDate = new Date().toLocaleString();

    // Sets inner HTML elements to contain title, post content, and current date
    postElement.innerHTML = `
        <div class="post-date">${currentDate}</div>
        <div class="post-title">${titleContent}</div>
        <div class="post-text">${postContent}</div>
        <button class="delete-button">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                 <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        </button>
        <button onclick="printPost()">print post</button>
        <hr>
    `;

    // Adds to the top of posts container
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.insertBefore(postElement, postsContainer.firstChild);

    // Saves to localStorage
    savePostToStorage(titleContent, postContent, currentDate);

    // Clears the textareas
    document.getElementById('titleContent').value = "";
    document.getElementById('postContent').value = "";
    loadPosts();
}

function savePostToStorage(title, content, date) {
    // Get existing posts from localStorage or create empty array
    let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    
    // Add new post to beginning of array
    posts.unshift({
        title: title,
        content: content,
        date: date
    });

    // Saves back to localStorage again
    localStorage.setItem("blogPosts", JSON.stringify(posts));
}

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    const postsContainer = document.getElementById("postsContainer");

    postsContainer.innerHTML = '';

    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="post-date">${post.date}</div>
            <div class="post-title">${post.title}</div>
            <div class="post-text">${post.content}</div>
            <button class="delete-button" data-index="S${index}">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
            </button>
            <button class="print-button">print post</button>
            <hr>
        `;
        postsContainer.appendChild(postElement);
    });

    // Add click event listeners
    document.querySelectorAll('.delete-button').forEach(button => {
        button.onclick = function() {
            const index = this.getAttribute('data-index');
            deletePost(index);
        };
    });

    document.querySelectorAll('.print-button').forEach(button => {
    button.onclick = function() {
        const postElement = this.closest('.post');
        
        // Create print window
        const printWindow = window.open('', '_blank');
        const postContent = postElement.innerHTML;
        
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Post</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .delete-button, .print-button { display: none; }
                    </style>
                </head>
                <body>
                    <div class="post">${postContent}</div>
                    <script>
                        window.onload = function() {
                            window.print();
                        }
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();
    };
});

}

function changeColor(){
// Generates random color
// important to note
// the 16777215 is a very important number.
// that is the decimal equivelent of white
//in doing this it ensures a random color is generated of all colors.
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);   
    // Changes color of all posts
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        post.style.color = randomColor;
    });
    
    // Also changes the post creator text
    const postCreator = document.querySelector('.post-creator');
    if (postCreator) {
        postCreator.style.color = randomColor;
    }
}

function changebackground(){
    var element = document.body;
    element.classList.toggle("dark-mode");
}

function clearPosts() {
    if (confirm('Are you sure you want to delete all posts?')) {
        localStorage.removeItem('blogPosts');
        // reload the page or update the UI
        location.reload();
    }
}

function deletePost(index) {
    const posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    posts.splice(parseInt(index), 1);
    localStorage.setItem("blogPosts", JSON.stringify(posts));
    loadPosts();
}

function printPost(event) {
    const buttonElement = event.target;
    const postElement = buttonElement.closest('.post');
    
    // Creates a hidden container for printing
    const printContainer = document.createElement('div');
    printContainer.style.position = 'fixed';
    printContainer.style.left = '-9999px';
    printContainer.innerHTML = postElement.innerHTML;
    
    // Remove buttons from print version
    printContainer.querySelectorAll('.delete-button, .print-button').forEach(btn => {
        btn.remove();
    });
    
    // Add to page
    document.body.appendChild(printContainer);
    
    // Print
    window.print();
    
    // Clean up
    document.body.removeChild(printContainer);
}

// Call loadPosts when page loads
document.addEventListener('DOMContentLoaded', loadPosts);

document.addEventListener('DOMContentLoaded', loadPosts);



