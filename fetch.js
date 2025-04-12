document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("adminForm");
    const postContainer = document.getElementById("postContainer");
  
    // Load existing posts
    fetch("get_posts.php")
      .then((res) => res.json())
      .then((posts) => {
        posts.forEach((post) => {
          const postDiv = document.createElement("div");
          postDiv.className = "post";
          postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <small>${new Date(post.created_at).toLocaleString()}</small>
          `;
          postContainer.appendChild(postDiv);
        });
      });
  
    // Handle new post submission
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;
  
      fetch("add_posts.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      })
        .then((res) => res.json())
        .then((data) => {
          Swal.fire("Success!", "Your post was published 💖", "success");
          form.reset();
  
          // Reload posts
          postContainer.innerHTML = "";
          fetch("get_posts.php")
            .then((res) => res.json())
            .then((posts) => {
              posts.forEach((post) => {
                const postDiv = document.createElement("div");
                postDiv.className = "post";
                postDiv.innerHTML = `
                  <h3>${post.title}</h3>
                  <p>${post.content}</p>
                  <small>${new Date(post.created_at).toLocaleString()}</small>
                `;
                postContainer.appendChild(postDiv);
              });
            });
        })
        .catch((err) => {
          Swal.fire("Error", "Something went wrong 😢", "error");
        });
    });
  });
  


  
  
  