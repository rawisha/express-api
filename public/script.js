// Getting all document queries for the form
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const age = document.getElementById("age");
const adress = document.getElementById("adress");
const password = document.getElementById("password");


// addin user with the post method
// Send reading the values of each input field and sending the data to /newpost in the api.js 
//to handle the Post request

function addUser() {

      fetch("api/newpost", {
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
            //If the user is succesfully added, then we empty each field again.
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