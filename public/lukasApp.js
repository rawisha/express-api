// Stämmer denna rootURL'en ?
const rootURL = "http://localhost:5000/api/" ;

let posts = [] ;


// get posts
/* Jag gör en fetch 
*/
const getPosts = async () => {
    let userId = -1 ;
    const res = await fetch(`${rootURL}getposts`); 
    const data = await res.json();
    posts = data.posts
    document.querySelector("tbody").innerHTML = posts
    .map((post, index) => 
        // Vet inte hur man gör ett eget id så jag tar de som finns. 
        `
        <tbody>
              <tr>
                <td>${index += 1}</td>
                <td>${post.name}</td>
                <td>${post.lastname}</td>
                <td>${post.age}</td>
                <td>${post.email}</td>
                <td>${post.adress}</td>
                <td>
                  <a id="update-user-btn" href="/update-user.html" class="btn border update">
                    <span class="color"><i class="fas fa-pencil-alt"></i></span>
                  </a>
                  <a onclick="deleteUser(id)" id="${index}" href="#" class="btn border delete">
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

  console.log(posts[id]._id)
  
  let userIndex = posts[id-1]._id
  
  const ressponce = await fetch(`${rootURL}deletepost/${userIndex}`, {
        method: "delete"
      
    })

    getPosts()
      
} 



window.addEventListener("load", getPosts())