// creates nessesary constants

const form = document.getElementById("updateUser");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const age = document.getElementById("age");
const adress = document.getElementById("adress");
const password = document.getElementById("password");
const baseurl = "http://localhost:5000/api"



// Reseves all the data from the database and puts it in index.html
// every user gets a delete btn and an update btn, these btn's gets an onclick event 
// with an id of the spesific user. 
function getdata() {
  fetch("/api/getposts")
    .then(response => response.json())
    .then(data => {
      const infos = data.posts
        .map(
          // for every user in the databace, this is renderd in to the html. 
          // the index + 1 is to give an easy overvew of how many users the databace contanes. 
          // the inf.name, inf.lastname etc is getting the spesific info of every user.
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

// gets all the values the user wrote in the fields and uses the method post to save
// the data in tehe databace. First the data gets converted into json so the databace can acceppt it. 
function addUser() {
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
        // if the data is sucsessfully saved in the databace and alert triggers, sending the message
        // that the post was sucsessfull, then makes all the feilds empty. 
        if (data.message.msgError === false) {
          alert("User Succesfully Added");
          fname.value = ""
          lname.value = ""
          age.value = ""
          email.value = ""
          password.value = ""
          adress.value = ""
        } else {
          // If the post was not successfull, this alert is sent:
          alert("Something went wrong, Try again...");
        }
      });
}




// DELETE POST WITH ID
// gets the id from the spesific user you want to delete and uses the method delete to delete the 
// object from the databace. Before deleting an conformation message will open and ask you if
// you want to delete
const deletePost = async (id) =>{
  if(confirm("Are you sure you want to delete this user?")){
    const res = await fetch(`/api/deletepost/${id}`,{
      method:"delete",
    })
    // After the delete was successfull, the function getdata will run again to get an update on all the users.
    getdata()
  }else{
    
  }
  
}

// the function getdata is only supposed to run when on index.html.
if(window.location.pathname === "/" || "/index.html"){
  getdata()
}else{

}