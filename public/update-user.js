//load form data
const form = document.getElementById("updateUser");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const age = document.getElementById("age");
const adress = document.getElementById("adress");
const password = document.getElementById("password");

// GET URL PARAM
const urlString = window.location.search
const urlParam = new URLSearchParams(urlString);
const UserID = urlParam.get("id")

//Gets the user with id gotten from above .. (UserID) and puts information into each value of the form
const getUser = async () => {
    const res = await fetch(`api/getposts/${UserID}`);
    const data = await res.json();
    fname.value = data.posts.name 
    lname.value = data.posts.lastname
    email.value = data.posts.email
    age.value = data.posts.age
    adress.value = data.posts.adress
    password.value = data.posts.password
};

// update user based on ID gotten from (UserID)
function updateUser() {
      //Updates the user information with userid using PUT method, more on how the actual fetch works can be found in the api.js file
      fetch(`api/updateuser/${UserID}`, {
        method: "put",
        body: JSON.stringify({
          name: fname.value,
          lastname: lname.value,
          age: age.value,
          email: email.value,
          password: password.value,
          adress: adress.value,
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (data.message.msgError === false) {
            alert("User Succesfully Updated");
          } else {
            alert("Something went wrong, Try again...")
          }
        });
    };
  

// Once window has finished loading, it runs the getUser function
  window.addEventListener("load", getUser());