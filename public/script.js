const form = document.getElementById("updateUser");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const age = document.getElementById("age");
const adress = document.getElementById("adress");
const password = document.getElementById("password");
const baseurl = "http://localhost:5000/api"

function getdata() {
  fetch("/api/getposts")
    .then(response => response.json())
    .then(data => {
      const infos = data.posts
        .map(
          (inf, index) => `
              <tr>
              <td>${index + 1}</td>
              <td>${inf.name}</td>
              <td>${inf.lastname}</td>
              <td>${inf.age}</td>
              <td>${inf.email}</td>
              <td>${inf.adress}</td>
              <td>
              <a href="update-user.html?id=${inf._id}" class="btn border update">
              <span class="color"><i class="fas fa-pencil-alt"></i></span>
              </a>
              <a onclick="deletePost('${inf._id}')"href="#"class="btn border delete">
              <span class="color"><i class="fas fa-trash-alt"></i></span>
              </a>
              </td>
              </tr>
                      `
        )
        .join("");
      document.querySelector("tbody").innerHTML = infos;

      document.querySelector("#loader").style.display = "none"
    });
}

function addUser() {
    // add new user
    fetch("api/adduser", {
      method: "post",
      body: JSON.stringify({
        name: fname.value,
        lastname: lname.value,
        age: age.value,
        email: email.value,
        password: password.value,
        adress: adress.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.message.msgError === false) {
          alert("User Succesfully Added");
          fname.value = ""
          lname.value = ""
          age.value = ""
          email.value = ""
          password.value = ""
          adress.value = ""
        } else {
          alert("Something went wrong, Try again...");
        }
      });
}




// DELETE POST WITH ID
const deletePost = async (id) =>{
  if(confirm("Are you sure you want to delete this user?")){
    const res = await fetch(`/api/deletepost/${id}`,{
      method:"delete",
    })
    getdata()
  }else{
    
  }
  
}

if(window.location.pathname === "/" || "/index.html"){
  getdata()
}else{

}