// Stämmer denna rootURL'en ?
const rootURL = "http://localhost:5000/api/" ;

let posts = [] ;


// get posts
const getPosts = async () => {
    let userId = -1 ;
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
                <td>${post.userId}</td>
                <td>${post.name}</td>
                <td>${post.lastname}</td>
                <td>${post.age}</td>
                <td>${post.email}</td>
                <td>${post.adress}</td>
                <td>
                  <a id="update-user-btn" href="/public/update-user.html" class="btn border update">
                    <span class="color"><i class="fas fa-pencil-alt"></i></span>
                  </a>
                  <a onclick="deleteUser(id)" id="${userId += 1}" href="#" class="btn border delete">
                    <span class="color"><i class="fas fa-trash-alt"></i></span>
                  </a>
                </td>
              </tr>
            </tbody>
        `
    ).join("")
}


const deleteUser = async (id) => {
  const res = await fetch(`${rootURL}getposts`); 
  const data = await res.json();
  posts = data.posts

  let userIndex = posts[id]._id

  console.log(userIndex)
  
  const ressponce = await fetch(`${rootURL}deletepost/${userIndex}`, {
        method: "delete"
    })

    getPosts()
    
} 



window.addEventListener("load", getPosts())