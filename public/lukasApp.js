// Stämmer denna rootURL'en ?
const rootURL = "http://localhost:5000/api/" ;

let posts = [] ;


// get posts
/* Jag gör en fetch 
*/
const getPosts = async () => {
  openLoadScreen()
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
                  <a onclick="deleteUser('${post._id}')" href="#" class="btn border delete">
                    <span class="color"><i class="fas fa-trash-alt"></i></span>
                  </a>
                </td>
              </tr>
            </tbody>
        `
    ).join("")
    closeLoadScreen()
}


const deleteUser = async (id) => {

  openLoadScreen()

  const ressponce = await fetch(`${rootURL}deletepost/${id}`, {
        method: "delete"
      
    })

    getPosts()
    closeLoadScreen()
      
} 


//------------------------- LOAD SCREEN START --------------------------------//

const openLoadScreen = () => {
  document.querySelector(".load-section").style.display="flex"
}

const closeLoadScreen = () => {
  document.querySelector(".load-section").style.display="none"
}

//------------------------- LOAD SCREEN END --------------------------------//



window.addEventListener("load", getPosts())