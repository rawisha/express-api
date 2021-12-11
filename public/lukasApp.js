// Stämmer denna rootURL'en ?
const rootURL = "http://localhost:5000/api/" ;

let posts = [] ;


// get posts
/* Jag gör en fetch 
*/
// Gets the data from the DB and displays it on the screen
// While it is doing that, the loading screen shows until the data is fully recivied
const getPosts = async () => {
  openLoadScreen()
    const res = await fetch(`${rootURL}getposts`); 
    const data = await res.json();
    posts = data.posts
    document.querySelector("tbody").innerHTML = posts
    
    .map((post, index) => `
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

//Delete function that handles the id has been passed through and asking the user to delete or not 
// With the if statement and confirm.
//if the user is deleted then getPosts function runs again to display the new data
const deleteUser = async (id) => {
  openLoadScreen()
  if(confirm("Do you really want to delete this user?")){
  const ressponce = await fetch(`${rootURL}deletepost/${id}`, {
        method: "delete"
    })
    
    getPosts()
    
  }else{
    closeLoadScreen()
  }
} 

//------------------------- LOAD SCREEN START --------------------------------//

const openLoadScreen = () => {
  document.querySelector(".load-section").style.display="flex"
}

const closeLoadScreen = () => {
  document.querySelector(".load-section").style.display="none"
}

//------------------------- LOAD SCREEN END --------------------------------//

//When the window is finished loading, the getPosts fucntion triggers and displays the data.
window.addEventListener("load", getPosts())