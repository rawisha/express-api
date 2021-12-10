// Stämmer denna rootURL'en ?
const rootURL = "http://localhost:5000/api/" ;

let posts = [] ;

// get posts
const getPosts = async () => {
    const res = await fetch(`${rootURL}getposts`); 
    const data = await res.json();
    posts = data.posts
    document.querySelector("#table-content").innerHTML = posts
    .map(
        post => 
        // Vet inte hur man gör ett eget id så jag tar de som finns. 
        `
        <tbody>
              <tr>
                <td>${post._id}</td>
                <td>${post.name}</td>
                <td>${post.lastname}</td>
                <td>${post.age}</td>
                <td>${post.email}</td>
                <td>${post.adress}</td>
                <td>
                  <a id="update-user-btn" href="/public/update-user.html" class="btn border update">
                    <span class="color"><i class="fas fa-pencil-alt"></i></span>
                  </a>
                  <a href="#" class="btn border delete">
                    <span class="color"><i class="fas fa-trash-alt"></i></span>
                  </a>
                </td>
              </tr>
            </tbody>
        `
    ).join("")
}




window.addEventListener("load", getPosts())